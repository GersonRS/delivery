// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_API: 'http://10.0.0.107:8000/api/',
  URL_AUTENTICATION: 'http://10.0.0.107:8000/oauth/token',
  URL_REGISTER: 'http://10.0.0.107:8000/register',
  TOKEN_KEY: 'access_token',
  USER_KEY: 'user',
  GRANT_TYPE: 'password',
  CLIENT_ID: 2,
  CLIENT_SECRET: 'HD2Zui69YujyCLSqTbk35un4ldz2fo0bTks3QRQi',
  TUTORIAL_KEY: 'app_did_tutorial'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
