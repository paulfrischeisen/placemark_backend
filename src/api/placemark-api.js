import Boom from "@hapi/boom";
import Joi from "joi";
import { db } from "../models/db.js";
import { POIArray, POISpec, IdSpec, POISpecPlus, POISpecUpdate } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";

export const placemarksApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks(request.auth.credentials);
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

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getOnePlacemark(request.params.id, request.auth.credentials);
        if (placemark) {
          return placemark;
        }
        return Boom.notFound("Found no Placemark with this ID");
      } catch (err) {
        return Boom.serverUnavailable("Found no Placemark with this ID");
      }
    },
    tags: ["api"],
    description: "Gets one specific Placemark",
    notes: "Returns one Placemarks",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: POISpecPlus, failAction: validationError },
  },

  create: {
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
    tags: ["api"],
    description: "Create a Placemark",
    notes: "Returns details of the created Placemark",
    validate: { payload: POISpec, failAction: validationError },
    response: { schema: POISpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarkID = request.params.id;
        await db.placemarkStore.deleteOnePlacemark(placemarkID);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("deleteAll placemarks");
      try {
        const user = request.auth.credentials;
        await db.placemarkStore.deleteAllPlacemarks(user);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all Placemarks",
    notes: "Deletes all Placemarks",
  },

  addImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = request.auth.credentials;
        const poi = await db.placemarkStore.getOnePlacemark(request.params.id, user);

        if (!poi) {
          return Boom.notFound("Not Found");
        }

        const file = request.payload.image;

        if (Object.keys(file).length > 0) {
          const imgURL = await imageStore.uploadImage(request.payload.image);
          await db.placemarkStore.addImage(request.params.id, imgURL, user);
        }
        const POIAfterUpdate = await db.placemarkStore.getOnePlacemark(request.params.id, user);
        return POIAfterUpdate;
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
  },

  deleteImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = request.auth.credentials;
        const poi = await db.placemarkStore.getOnePlacemark(request.params.id, user);

        if (!poi) {
          return Boom.notFound("Not Found");
        }

        const { imgURL } = request.payload;

        await imageStore.deleteImage(imgURL);
        await db.placemarkStore.deleteImage(request.params.id, imgURL);

        const POIAfterDelete = await db.placemarkStore.getOnePlacemark(request.params.id, user);
        return POIAfterDelete;
      } catch (err) {
        return Boom.badImplementation(err);
      }
    },
  },

  getPlacemarksByCategories: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const { category } = request.params;
        return await db.placemarkStore.getPlacemarksByCategory(category);
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const response = await db.placemarkStore.updatePlacemark(request.params.id, request.payload, request.auth.credentials);
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
    validate: { params: { id: IdSpec }, payload: POISpecUpdate, failAction: validationError },
    response: { schema: POISpecPlus, failAction: validationError },
  },
};
