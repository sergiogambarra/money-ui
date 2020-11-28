export const environment = {
  production: true,
  apiUrl: 'https://sergio-money-api.herokuapp.com',

  tokenAllowedDomains: [ new RegExp('sergio-money-api.herokuapp.com') ],
  tokenDisallowedRoutes: [ new RegExp('\/oauth\/token') ]
};
