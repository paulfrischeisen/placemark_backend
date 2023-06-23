import { userApi } from "./api/users-api.js";
import { placemarksApi } from "./api/placemark-api.js";

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
  { method: "POST", path: "/api/placemarks", config: placemarksApi.addRating },
  { method: "POST", path: "/api/placemarks", config: placemarksApi.addComment },
  { method: "POST", path: "/api/placemarks", config: placemarksApi.addImage },
  { method: "GET", path: "/api/placemarks", config: placemarksApi.getRatingStats },
  { method: "GET", path: "/api/placemarks", config: placemarksApi.getPlacemarkUserStats },
  { method: "GET", path: "/api/placemarks", config: placemarksApi.getPlacemarkCategoryStats },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarksApi.deletePlacemark },
  { method: "GET", path: "/api/placemarks/{category}", config: placemarksApi.findByCategory },
];
