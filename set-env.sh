#!/bin/sh

# Replace placeholders in the environment.js (or .ts) with environment variables
sed -i "s|REPLACE_KEYCLOAK_BASE_URL|$KEYCLOAK_API_BASE_URL|g" /usr/share/nginx/html/main.*.js
sed -i "s|REPLACE_KEYCLOAK_REALM|$REALM|g" /usr/share/nginx/html/main.*.js
sed -i "s|REPLACE_KEYCLOAK_CLIENT_ID|$CLIENT_ID|g" /usr/share/nginx/html/main.*.js
sed -i "s|REPLACE_API_BASE_URL|$API_BASE_URL|g" /usr/share/nginx/html/main.*.js
sed -i "s|REPLACE_BPM_API|$BPM_API|g" /usr/share/nginx/html/main.*.js
sed -i "s|REPLACE_COS_BUCKET|$COS_BUCKET|g" /usr/share/nginx/html/main.*.js
sed -i "s|REPLACE_COS_REGION|$COS_REGION|g" /usr/share/nginx/html/main.*.js
sed -i "s|REPLACE_COS_PATH|$COS_PATH|g" /usr/share/nginx/html/main.*.js
sed -i "s|REPLACE_COS_DOMAIN|$COS_DOMAIN|g" /usr/share/nginx/html/main.*.js

# Start Nginx
nginx -g 'daemon off;'
