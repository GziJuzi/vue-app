#!/bin/sh

API_URL=${API_BASE_URL:-http://localhost:5000}

echo "Generating config.json with API URL: $API_URL"

cat <<EOF > /usr/share/nginx/html/config.json
{
  "apiBaseUrl": "$API_URL"
}
EOF

# Start NGINX in the foreground
nginx -g 'daemon off;'
