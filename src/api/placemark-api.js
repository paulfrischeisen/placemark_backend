import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const placemarksApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const placemarks = db.placemarkStore.getAllPlacemarks();
      return placemarks;
    },
  },
  findByContributor: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const placemarks = await db.placemarkStore.getPlacemarkById(request.params.id);
      return placemarks;
    },
  },

  createPlacemark: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.addPlacemark(request.payload);
      if (!placemark) {
        return Boom.badImplementation("Failed to create Placemark");
      }
      return h.response(placemark).code(201);
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await db.placemarkStore.deleteAllPlacemarks();
      return { success: true };
    },
  },
};
