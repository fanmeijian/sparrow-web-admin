import {KeycloakOnLoad, KeycloakLoginOptions} from 'keycloak-js'
const API_BASE_URL='REPLACE_API_BASE_URL'
const login:KeycloakOnLoad='login-required'
export const environment = {
  production: true,
  apiBase: `${API_BASE_URL}`,
  bpmApi: `REPLACE_BPM_API`,
  keycloak: {
    authServerUrl: 'REPLACE_KEYCLOAK_BASE_URL',
    realm: 'REPLACE_KEYCLOAK_REALM',
    clientId: 'REPLACE_KEYCLOAK_CLIENT_ID',
    login: login
  },
  cos: {
    bucket: 'REPLACE_COS_BUCKET',
    region: 'REPLACE_COS_REGION',
    path: 'REPLACE_COS_PATH',
    uploadTmpKeyUrl: `${API_BASE_URL}/cos/tx/uploadTmpKeys`,
    downloadTmpKeyUrl:`${API_BASE_URL}/cos/tx/downloadTmpKeys`,
    domain: 'REPLACE_COS_DOMAIN',
    apiBase:`${API_BASE_URL}/page-elements/{id}/hasPermission`
  },
};
