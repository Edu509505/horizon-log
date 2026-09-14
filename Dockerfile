# Stage 1: Build
FROM node:22-alpine AS builder

# 1. Declara o ARG que você pode passar na hora de buildar
# (Pode deixar um valor padrão ou deixar em branco)
ARG VITE_API_URL=https://www.horizonlog.com.br

# 2. Transforma o ARG em ENV para o Node/Vite enxergarem na hora do build
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# 3. Agora quando o build rodar, o Vite vai pegar o VITE_API_URL correto!
RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=builder /app/dist /app/dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]