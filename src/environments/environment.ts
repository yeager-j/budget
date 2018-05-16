// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBq_iaeZbL57RIhsA0-Tt9qfsE3SLnIzRo',
    authDomain: 'budget-8ed96.firebaseapp.com',
    databaseURL: 'https://budget-8ed96.firebaseio.com',
    projectId: 'budget-8ed96',
    storageBucket: 'budget-8ed96.appspot.com',
    messagingSenderId: '830128817380'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
