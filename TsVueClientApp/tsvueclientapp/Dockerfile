# ---------- STAGE 1: Build Vue app ----------
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# ---------- STAGE 2: Serve with NGINX ----------
FROM nginx:alpine

# Copy built files to NGINX web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy entrypoint script to generate config.json at runtime
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Optional: use custom NGINX config (if needed)
# COPY nginx.conf /etc/nginx/nginx.conf

# Run entrypoint script first, then NGINX
ENTRYPOINT ["/entrypoint.sh"]

##docker build -f tsvueclientapp/Dockerfile -t tsvueclientapp ./tsvueclientapp
#docker build -t my-vue-app .
#docker run -e API_BASE_URL="https://localhost:32769" -p 8080:80 tsvueclientapp --name tsvueclientapp