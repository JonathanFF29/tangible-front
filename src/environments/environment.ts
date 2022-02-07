// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HttpUrl: [
    "https://backend.tangibledesign.co/",
    "http://localhost:3000/",
  ],
  firebaseConfig : {
    apiKey: "AIzaSyB3ij41o74k3SHEEYZSc1bBy1D8sOJUGVI",
    authDomain: "tangibleweb-3daa9.firebaseapp.com",
    databaseURL: "https://tangibleweb-3daa9.firebaseio.com",
    projectId: "tangibleweb-3daa9",
    storageBucket: "tangibleweb-3daa9.appspot.com",
    messagingSenderId: "130174938304",
    appId: "1:130174938304:web:89a2ae985a60be0dea9125",
    measurementId: "G-GFYS9FFEP3"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
