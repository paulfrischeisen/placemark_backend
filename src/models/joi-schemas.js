import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    _id: IdSpec,
  })
  .label("JwtAuth");

export const POISpec = Joi.object()
  .keys({
    name: Joi.string().example("Frankenjura").required(),
    lat: Joi.number().example(51.12314).required(),
    lng: Joi.number().example(12.0213123).required(),
    description: Joi.string().example("description of a test POI").required(),
    category: Joi.string().example("Lead Climbing").required(),
    images: Joi.array().items(Joi.string().example("https://www.pictures.com/example1.png")).optional(),
  })
  .label("POI");

export const POISpecUpdate = Joi.object().keys({
  name: Joi.string().example("Frankenjura").optional(),
  lat: Joi.number().example(51.12314).optional(),
  lng: Joi.number().example(12.0213123).optional(),
  description: Joi.string().example("description of a test POI").optional(),
  category: Joi.string().example("Lead Climbing").optional(),
  images: Joi.array().items(Joi.string().example("https://www.pictures.com/example1.png")).optional(),
});

export const POISpecWithCreationUser = POISpec.keys({
  user: IdSpec,
}).label("POIWithCreationUser");

export const POISpecPlus = POISpecWithCreationUser.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("POISpecPlus");

export const POIArray = Joi.array().items(POISpecPlus).label("POIArray");
