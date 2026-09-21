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
    echo "DIACHO!!!: '$VITE_API_URL'" && \
    echo "========================================="

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# FIX: Define um WORKDIR válido para a plataforma Upuai não chiar
WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia da pasta dist do builder para o WORKDIR atual (.)
COPY --from=builder /app/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]