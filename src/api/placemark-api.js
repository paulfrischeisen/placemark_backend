import Boom from "@hapi/boom";
import Joi from "joi";
import { db } from "../models/db.js";
import { CategorySpec, addComment, addRating, POIArray, POICreation, POISpec, UserCreationStats, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

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
    tags: ["api"],
    description: "Create a placemark",
    notes: "Returns details of a single placemark",
    validate: { payload: POICreation, failAction: validationError },
    response: { schema: POISpec, failAction: validationError },
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

  addRating: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const rating = await db.placemarkStore.updateRatingById(request.payload.id, request.payload.rating);
        if (rating) {
          return h.response(rating).code(200);
        }
        return Boom.badImplementation("error adding Rating");
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
    tags: ["api"],
    description: "Add Rating to a Placemark",
    notes: "Returns details of a Rating",
    validate: { payload: addRating, failAction: validationError },
    response: { schema: POISpec, failAction: validationError },
  },

  addComment: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const comment = await db.placemarkStore.addCommentById(request.payload.id, request.payload.username, request.payload.comment);
        if (comment) {
          return h.response(comment).code(200);
        }
        return Boom.badImplementation("error adding comment");
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
    tags: ["api"],
    description: "Add Rating to a Placemark",
    notes: "Returns details of a Comment",
    validate: { payload: addComment, failAction: validationError },
    response: { schema: POISpec, failAction: validationError },
  },

  // addImage: --> need to find a way to store images!
};
