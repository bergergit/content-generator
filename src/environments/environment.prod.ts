export const environment = {
  production: true,
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
