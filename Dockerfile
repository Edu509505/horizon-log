# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# 1. Declara e exporta a variável de ambiente
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# 2. O ECHO ENTRA AQUI!
RUN echo "=========================================" && \
    echo "CHECKPOINT DOCKER BUILD:" && \
    echo "A variavel VITE_API_URL eh: '$VITE_API_URL'" && \
    echo "========================================="

# 3. Executa a compilação do Vite
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /app/dist

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]