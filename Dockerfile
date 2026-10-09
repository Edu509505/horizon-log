FROM node:24-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
ARG VITE_API_URL=https://horizonlogbackend-production.apps.upuai.cloud
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Use Nginx para servir arquivos estáticos (para apps front-end)
FROM nginxinc/nginx-unprivileged:alpine3.22 AS runner
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
USER nginx
EXPOSE 8080
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]