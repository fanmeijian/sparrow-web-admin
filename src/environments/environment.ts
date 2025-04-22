// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {KeycloakOnLoad, KeycloakLoginOptions} from 'keycloak-js'
const API_BASE_URL='http://localhost:8100/toupiao-service'
const login:KeycloakOnLoad='login-required'
export const environment = {
  production: false,
  apiBase: `${API_BASE_URL}`,
  bpmApi: `http://localhost:8091/dengbo-bpm`,
  keycloak: {
    authServerUrl: 'https://keycloak.linkair-tech.cn',
    realm: 'liyun-prd',
    clientId: 'sparrow-web-admin',
    login: login
  },
  cos: {
    bucket: 'cos-1252583813',
    region: 'ap-guangzhou',
    path: 'upload/',
    uploadTmpKeyUrl: `${API_BASE_URL}/cos/tx/uploadTmpKeys`,
    downloadTmpKeyUrl:`${API_BASE_URL}/cos/tx/downloadTmpKeys`,
    domain: 'web.linkair-tech.cn',
    apiBase:`${API_BASE_URL}/page-elements/{id}/hasPermission`
  },
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
