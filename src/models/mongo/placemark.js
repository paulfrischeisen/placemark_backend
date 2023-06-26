import Mongoose from "mongoose";
import { User } from "./user.js";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
  description: String,
  category: String,
  /*
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

   */
  /*
  photos: [
    {
      type: String,
      ref: "Photo",
    },
  ],

   */
  /*
  stats: {
    avgRating: Number,
    countRatings: Number,
  },
  comments: [
    {
      username: String,
      comment: String,
      date: Date,
    },
  ],

   */
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
