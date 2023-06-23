import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const ErrorResponse = Joi.object()
  .keys({
    statusCode: Joi.number().example(404).description("http status code").optional(),
    error: Joi.string().example("Not Found").description("http error").optional(),
    message: Joi.string().example("error message").description("error message").optional(),
  })
  .label("ErrorResponse");

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
  })
  .label("JwtAuth");

export const POISpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Frankenjura"),
    description: Joi.string().example("Example description of POI").optional().allow(""),
    category: Joi.string().example("Bouldering").optional().allow(""),
    location: Joi.object().keys({
      type: Joi.string().valid("Point").example("Point"),
      coordinates: Joi.array().items(Joi.number()).required().example([49.03222233840492, 12.1288167694678]),
    }),
    photos: Joi.array().items(Joi.string()).example(["https://www.pictures.com/example1.png", "https://www.pictures.com/example2.png"]).optional(),
    stats: Joi.object().keys({
      avgRating: Joi.number().example(3).optional().allow(null),
      countRatings: Joi.number().example(13).optional().allow(null),
    }),
    comments: Joi.any().optional(),
    _id: IdSpec,
    __v: Joi.number(),
    createdByUser: Joi.string().example("Contributor1").optional(),
  })
  .label("POIInformation");

export const POIArray = Joi.array().items(POISpec).label("POIArray");

export const POICreation = Joi.object()
  .keys({
    name: Joi.string().example("Test POI").required(),
    category: Joi.string().example("Lead Climbing").required(),
    description: Joi.string().example("description of a test POI").required(),
    location: {
      type: Joi.string().valid("Point").example("Point"),
      coordinates: Joi.array().items(Joi.number()).required().example([49.03222233840492, 12.1288167694678]),
    },
    createdByUser: Joi.string().example("Contributor1").required(),
  })
  .label("POICreation");

export const addRating = Joi.object()
  .keys({
    id: IdSpec.required().example("1234").required(),
    rating: Joi.number().example(3).required(),
  })
  .label("addRating");

export const addComment = Joi.object()
  .keys({
    id: IdSpec.required().example("1234").required(),
    username: Joi.string().example("Contributor1").required(),
    comment: Joi.string().example("test comment").required(),
  })
  .label("addComment");

export const CategorySpec = Joi.object()
  .keys({
    categories: Joi.array()
      .items(Joi.string())
      .example(["Bouldering", "Lead Climbing", "Top rope", "All Climbing Categories", "Speed"])
      .description("Array of all categories")
      .optional(),
    categoryAmount: Joi.array().items(
      Joi.object().keys({
        _id: Joi.string().example("Bouldering").description("The category name").optional(),
        count: Joi.number().example(2).description("Amount of POIs in this category").optional(),
      })
    ),
  })
  .label("CategoryAmount");

export const UserCreationStats = Joi.array()
  .items(
    Joi.object().keys({
      _id: Joi.string().example("Bouldering").description("The category name").optional().allow(null),
      count: Joi.number().example(2).description("Amount of POIs in this category").optional(),
    })
  )
  .label("UserCreationStats");
