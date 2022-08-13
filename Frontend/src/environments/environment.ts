// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authUrl: "http://localhost:3001/api/users/",
  productsUrl: "http://localhost:3001/api/products",
  productsImagesUrl: "http://localhost:3001/api/products/images",

  ordersUrl: "http://localhost:3001/api/orders",
  cartsUrl: "http://localhost:3001/api/carts",
  productsInCartUrl: "http://localhost:3001/api/carts/products",
  
  citiesUrl: "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1500",
  streetsUrl: "https://data.gov.il/api/3/action/datastore_search?resource_id=a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3&limit=52000"
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
