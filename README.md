# 📝 DevBook – Full-Stack Java + React Notes App (FANG-Grade DevOps Setup)

A full-stack **developer diary/notes application** built with a robust, production-grade toolchain:

* ✅ Java Spring Boot (REST API)
* ✅ React + Tailwind (Frontend)
* ✅ PostgreSQL (Dockerized)
* ✅ Kubernetes(Minikube) with GitHub Actions CI/CD
* ✅ Grafana + Prometheus Monitoring
* ✅ k6 Load Testing (Local + Grafana Cloud)

---

## 📦 Features

* 🧾 Create, read, update, and delete notes
* ⚙️ monolith architecture: frontend, backend, DB
* ☸️ Kubernetes-native with Ingress & Autoscaling
* 📈 Monitoring & observability with Prometheus + Grafana
* 🔍 Logs streamed to Grafana via Loki
* 🧪 Load tested using `k6` (local & Grafana Cloud)
* 🔄 CI/CD: Docker builds + deploys via GitHub Actions
* 🛡️ Probes, resource limits, and HPA for resilience

---

## 📁 Project Structure

```bash
devbook/
├── backend/           # Spring Boot app
├── frontend/          # React + Tailwind app
├── k8s/               # Kubernetes manifests
├── k6/                # Load test scripts
├── docker/            # Docker Compose config
├── .github/workflows/ # GitHub Actions pipelines
└── README.md
```

---

## 🧰 Prerequisites

| Tool          | Version       |
| ------------- | ------------- |
| Docker        | 20+           |
| Node.js       | 20+           |
| Java          | 17+           |
| Maven         | (via wrapper) |
| kubectl       | latest        |
| Minikube      | latest        |
| Helm          | latest        |
| k6            | latest        |
| DockerHub     | Free account  |
| GitHub        | For CI/CD     |
| Grafana Cloud | For k6 tests  |

---

## 🧱 Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/devbook.git
cd devbook
```

---

## 🖥️ Step 2: Local Dev with Docker Compose

> Ideal for quick backend/frontend development without K8s.

```bash
cd docker
docker-compose up -d
```

---

## 🐳 Step 3: Dockerize Frontend & Backend

### Backend

```bash
cd backend
docker build -t yourname/devbook-backend:latest .
```

### Frontend

```bash
cd ../frontend
docker build -t yourname/devbook-frontend:latest .
```

Push both images to Docker Hub:

```bash
docker push yourname/devbook-backend:latest
docker push yourname/devbook-frontend:latest
```

---

## ☸️ Step 4: Kubernetes Deployment (Minikube)

### Start Minikube

```bash
minikube start --driver=docker
```

### Enable Add-ons

```bash
minikube addons enable ingress
minikube addons enable metrics-server
```

### Apply Kubernetes Manifests

```bash
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/backend/
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/ingress.yaml
```

### Update `/etc/hosts`

```bash
127.0.0.1 devbook.local
```

Access: [http://devbook.local](http://devbook.local)

---

## 🧪 Step 5: Load Testing with k6

### Local Test

```bash
cd k6
k6 run load-test.js
```

### To Grafana Cloud

1. Create a [Grafana Cloud](https://grafana.com)
2. Get your `k6` token
3. Login: `k6 login cloud`
4. Run: `k6 cloud load-test.js`

---

## 🔁 Step 6: CI/CD via GitHub Actions

GitHub workflow at: `.github/workflows/ci-cd.yml`

It does:

* 🚀 Build & push Docker images
* 🔁 Deploy to Minikube/K8s
* 📊 Run k6 load test
* ☁️ Push results to Grafana Cloud

---

## 📈 Step 7: Monitoring with Prometheus & Grafana

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace
```

### Access Grafana

```bash
kubectl port-forward svc/prometheus-stack-grafana -n monitoring 3001:80
```

Login: `admin / <get-password>`

```bash
kubectl get secret -n monitoring prometheus-stack-grafana -o jsonpath="{.data.admin-password}" | base64 -d
```

Visit: [http://localhost:3001](http://localhost:3001)

---

## 📚 Step 8: Centralized Logging with Loki

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm upgrade --install loki grafana/loki-stack \
  --namespace logging --create-namespace \
  --set promtail.enabled=true \
  --set grafana.enabled=false
```

In Grafana, add Loki data source:

```
URL: http://loki.logging.svc.cluster.local:3100
```

Query logs using:

```logql
{app="devbook-backend"}
```

---

## ⚙️ Step 9: Health Checks & Auto-Scaling

### Add to backend deployment:

```yaml
readinessProbe:
  httpGet:
    path: /actuator/health
    port: 8080
livenessProbe:
  httpGet:
    path: /actuator/health
    port: 8080
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"
```

### Enable Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: devbook-backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: devbook-backend
  minReplicas: 2
  maxReplicas: 5
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
```

Apply it:

```bash
kubectl apply -f k8s/backend/hpa.yaml
```

---

## 🧠 Concepts Implemented

✅ CI/CD pipelines
✅ Microservice Dockerization
✅ Kubernetes orchestration
✅ Blue/Green deploys
✅ HPA with CPU metrics
✅ Observability: Grafana + Prometheus
✅ Logging with Loki
✅ k6 Load Testing with Grafana Cloud

---

## 🛡 Security Best Practices

* Store secrets using Kubernetes Secrets or Vault
* Enable RBAC & Pod Security Policies
* Set PodDisruptionBudgets
* Apply resource limits
* Use cert-manager for TLS



## 🙋 Contributing

1. Fork this repo
2. Create a feature branch
3. Commit & push
4. Open a Pull Request


## 📃 License

This project is licensed under the [MIT License](LICENSE).


## 💬 Final Note

> Built as a DevOps-ready full-stack app inspired by FANG standards and CNCF tooling.


