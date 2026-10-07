# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Declara e exporta a variável de ambiente
ARG VITE_API_URL=https://horizonlogbackend-production.apps.upuai.cloud
ENV VITE_API_URL=$VITE_API_URL

RUN echo "=========================================" && \
    echo "Variável: '$VITE_API_URL'" && \
    echo "========================================="

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copia sua configuração customizada
COPY nginx.conf /etc/nginx/nginx.conf

# Concede permissão nas pastas de cache e runtime do Nginx
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]