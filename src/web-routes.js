export const webRoutes = [
  {
    method: "GET",
    path: "/",
    handler: function (request, h) {
      return h.view("main", { title: "Climbing Spots Placemarks" });
    },
  },
];
