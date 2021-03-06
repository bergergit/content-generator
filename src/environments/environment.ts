// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientID: 'lAs4HTaCS64qrBOu6zvTdVB6Du0dZHEJ',
    domain: 'fabioberger.auth0.com',
    responseType: 'token',
    callbackUrl: 'http://localhost:4200/callback',
    scope: 'openid profile email',
    audience: 'http://localhost:8083/api/',
    namespace: 'http://ratieri.contentgenerator.com/roles'
  },

  apiUrl: '/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
