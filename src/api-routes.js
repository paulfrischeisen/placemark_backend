import { userApi } from "./api/users-api.js";
import { placemarksApi } from "./api/placemark-api.js";
import { apiReachableTest } from "./api/api-reachable-test.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/placemarks", config: placemarksApi.findAll },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarksApi.findByContributor },
  { method: "POST", path: "/api/placemarks", config: placemarksApi.createPlacemark },
  { method: "DELETE", path: "/api/placemarks", config: placemarksApi.deleteAll },

  { method: "GET", path: "/api/apitest", config: apiReachableTest.apiTest },
];
