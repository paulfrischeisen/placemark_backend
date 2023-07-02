import { userApi } from "./api/users-api.js";
import { placemarksApi } from "./api/placemark-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/placemarks", config: placemarksApi.findAll },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarksApi.findOne },
  { method: "POST", path: "/api/placemarks", config: placemarksApi.create },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarksApi.deleteOne },
  { method: "DELETE", path: "/api/placemarks", config: placemarksApi.deleteAll },
  { method: "PUT", path: "/api/placemarks/{id}", config: placemarksApi.update },
  { method: "POST", path: "/api/placemarks/addImage/{id}", config: placemarksApi.addImage },
  { method: "DELETE", path: "/api/placemarks/deleteImage/{id}", config: placemarksApi.deleteImage },
  { method: "GET", path: "/api/placemarks/getByCategory/{category}", config: placemarksApi.getPlacemarksByCategories },
];
