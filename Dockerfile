# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Instala dependências primeiro (usa cache do Docker se o package.json não mudou)
COPY package*.json ./
RUN npm ci

COPY . .

# Recebe e injeta a variável APENAS na hora de buildar o app
ARG VITE_API_URL=https://www.horizonlog.com.br
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /app/dist

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]