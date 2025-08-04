# ----------- Build Stage ------------
FROM node:24-alpine AS build

WORKDIR /app

# Accept API URL as build-time argument
ARG REACT_APP_API_URL
ENV VITE_REACT_APP_API_URL=$REACT_APP_API_URL

# Install dependencies and build the app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ----------- Runtime Stage (Nginx) ------------
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Remove default nginx config and replace with our own
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost || exit 1
