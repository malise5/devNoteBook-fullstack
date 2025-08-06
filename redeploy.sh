#!/bin/bash
set -e

#Run bash script to redeploy the application on Minikube =  ./redeploy.sh v1.2.3 blue

# Usage: ./redeploy.sh [tag] [backend-color]
# Example: ./redeploy.sh latest blue



TAG=${1:-latest}
BACKEND_COLOR=${2:-blue}

echo "🚀 Starting redeploy with tag: $TAG"

# Check if minikube is running
MINIKUBE_STATUS=$(minikube status --format '{{.Host}}')

if [[ "$MINIKUBE_STATUS" != "Running" ]]; then
  echo "❌ Minikube is not running. Please start Minikube with 'minikube start' first."
  exit 1
fi

# Switch docker client to Minikube's Docker daemon
echo "🔄 Switching Docker to Minikube environment..."
eval $(minikube -p minikube docker-env)

# Build backend image (assumes simple Dockerfile)
echo "📦 Building backend image..."
docker build -t malise/devbook-backend:$TAG ./backend

# Build frontend image (multi-stage Dockerfile)
echo "📦 Building frontend image with multi-stage Dockerfile..."
docker build -t malise/devbook-frontend:$TAG ./frontend

# Apply backend deployment
BACKEND_DEPLOYMENT="k8s/backend/${BACKEND_COLOR}-deployment.yaml"
if [[ ! -f "$BACKEND_DEPLOYMENT" ]]; then
  echo "❌ Deployment file not found: $BACKEND_DEPLOYMENT"
  exit 1
fi


# Apply backend deployment with dynamic tag replacement
echo "📡 Applying backend deployment: $BACKEND_DEPLOYMENT"
sed "s|REPLACE_ME_TAG|$TAG|g" "$BACKEND_DEPLOYMENT" | kubectl apply -f -

# Apply or update backend service
SERVICE_FILE="k8s/backend/service.yaml"
if [[ ! -f "$SERVICE_FILE" ]]; then
  echo "❌ Backend service file not found: $SERVICE_FILE"
  exit 1
fi

echo "🔧 Applying backend service..."
kubectl apply -f "$SERVICE_FILE"


# Apply frontend deployment with dynamic tag replacement
echo "📡 Applying frontend deployment manifest..."
FRONTEND_DEPLOYMENT="k8s/frontend/deployment.yaml"
if [[ ! -f "$FRONTEND_DEPLOYMENT" ]]; then
  echo "❌ Frontend deployment file not found: $FRONTEND_DEPLOYMENT"
  exit 1
fi

# Apply frontend deployment with dynamic tag replacement
echo "📡 Applying backend deployment: $FRONTEND_DEPLOYMENT"
sed "s|REPLACE_ME_TAG|$TAG|g" "$FRONTEND_DEPLOYMENT" | kubectl apply -f -

# Wait for backend rollout to finish
echo "⏳ Waiting for backend rollout status..."
kubectl rollout status deployment/devbook-backend-$BACKEND_COLOR

# Wait for frontend rollout to finish
echo "⏳ Waiting for frontend rollout status..."
kubectl rollout status deployment/devbook-frontend

echo "✅ Redeploy complete!"





