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

# WORKDIR exigido pela plataforma Upuai
WORKDIR /usr/share/nginx/html

# Remove a config padrão
RUN rm /etc/nginx/conf.d/default.conf 2>/dev/null || true

# Copia sua configuração customizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia os arquivos gerados do build (dist) para a pasta atual (.)
COPY --from=builder /app/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]