import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";

import dotenv from "dotenv";
import path from "path";
import Handlebars from "handlebars";

import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
}
async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: { cors: true },
  });

  await server.register(Inert);
  await server.register(Vision);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layout: false,
    isCached: false,
  });

  server.route(webRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
