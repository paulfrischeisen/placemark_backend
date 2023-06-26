import Boom from "@hapi/boom";
import Joi from "joi";
import { db } from "../models/db.js";
import { CategorySpec, addComment, addRating, POIArray, POICreation, POISpec, UserCreationStats, IdSpec, POIUpdateSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";

export const placemarksApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return Boom.badRequest(err);
      }
    },
    tags: ["api"],
    description: "Get all Placemarks",
    notes: "Returns all placemarks",
    response: { schema: POIArray, failAction: validationError },
  },

  findByContributor: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (placemark) {
          return placemark;
        }
        return Boom.notFound("Found no Placemark with this ID");
      } catch (err) {
        return Boom.serverUnavailable("Found no Placemark with this ID");
      }
    },
    tags: ["api"],
    description: "Gets Placemarks based on Contributors ID",
    notes: "Returns Placemarks based on Contributors ID",
    response: { schema: POIArray, failAction: validationError },
  },

  createPlacemark: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("In the backend - createPlacemark");
      console.log(request.payload);
      console.log(request.auth.credentials);
      try {
        const recievedPlacemark = request.payload;
        const user = request.auth.credentials;
        recievedPlacemark.user = user;

        const placemark = await db.placemarkStore.addPlacemark(recievedPlacemark);
        if (placemark) {
          return h.response(placemark).code(201);
        }
        return Boom.badImplementation("An Error occured creating a placemark");
      } catch (error) {
        console.log(error);
        return Boom.serverUnavailable("Database Error");
      }
    },
    /*
      const existingPlacemark = await db.placemarkStore.getPlacemarkByName(request.payload.name);
      if (existingPlacemark) {
        return Boom.badRequest("This Placemark already exists");
      }
      const placemark = await db.placemarkStore.addPlacemark(request.payload);
      if (!placemark) {
        return Boom.badImplementation("Failed to create Placemark");
      }
      return h.response(placemark).code(201);
    },

     */
    tags: ["api"],
    description: "Create a Placemark",
    notes: "Returns details of a single placemark",
    validate: { payload: POICreation, failAction: validationError },
    response: { schema: POISpec, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Error");
      }
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

  addImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const poi = await db.placemarkStore.getPlacemarkById(request.params.id);
        const file = request.payload.image;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.image);
          await db.placemarkStore.addImage(request.params.id, url);
        }
        return poi;
      } catch (err) {
        return Boom.badImplementation(err);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
    tags: ["api"],
    description: "Add Image to a Placemark",
    notes: "Returns details of an Image",
    validate: {
      params: Joi.object({
        id: IdSpec.description("Users ID"),
      }),
      payload: Joi.object({ image: Joi.any().meta({ swaggerType: "file" }) }),
      failAction: validationError,
    },
    response: { schema: POISpec, failAction: validationError },
  },

  getRatingStats: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const stats = await db.placemarkStore.getPlacemarkRatingStats();
        if (stats) {
          return h.response(stats).code(200);
        }
        return Boom.badImplementation("error getting rating stats");
      } catch (err) {
        return Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "The amount of Ratings per star Rating",
    notes: "Returns values of ratings",
    response: {
      schema: Joi.object({
        labels: Joi.array().items(Joi.string()).required(),
        data: Joi.array().items(Joi.number()).required(),
      }),
      failAction: validationError,
    },
  },

  getPlacemarkUserStats: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const stats = await db.placemarkStore.getPlacemarkUserStats(request.params.id);
        return stats;
      } catch (err) {
        return Boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "The amount of created Placemarks per user",
    notes: "Returns the names of users with their amount of created Placemarks",
    response: { schema: UserCreationStats, failAction: validationError },
  },

  getPlacemarkCategoryStats: {
    auth: {
      strategy: "jwt",
    },
    handler: async (request, h) => {
      try {
        return await db.placemarkStore.getCategories();
      } catch (err) {
        throw Boom.badRequest(err);
      }
    },
    tags: ["api"],
    description: "The Placemark categories and the amount of their usage",
    notes: "Returns details of all Placemarks",
    response: { schema: CategorySpec, failAction: validationError },
  },

  deletePlacemark: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarkID = request.params.id;
        await db.placemarkStore.deletePlacemarkById(placemarkID);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
  },

  findByCategory: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const { category } = request.params;
        return await db.placemarkStore.findPlacemarksByCategory(category);
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
  },

  updatePlacemark: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const response = await db.placemarkStore.updatePlacemark(request.params.id, request.payload);
        if (!response) {
          return Boom.notFound("ID not available");
        }
        return h.response(response).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a placemark",
    notes: "Updates a Placemark",
    validate: { params: { id: IdSpec }, payload: POIUpdateSpec, failAction: validationError },
    response: { schema: POISpec, failAction: validationError },
  },
};
