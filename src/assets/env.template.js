// env.template.js
window.__env = {
    API_BASE_URL: '${API_BASE_URL}',
    BPM_API_URL: '${BPM_API_URL}',
    KEYCLOAK: {
      authServerUrl: '${KEYCLOAK_AUTH_URL}',
      realm: '${KEYCLOAK_REALM}',
      clientId: '${KEYCLOAK_CLIENT_ID}',
      login: '${KEYCLOAK_LOGIN}'
    },
    COS: {
      bucket: '${COS_BUCKET}',
      region: '${COS_REGION}',
      path: '${COS_PATH}',
      domain: '${COS_DOMAIN}'
    }
  };