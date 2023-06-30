import Mongoose from "mongoose";
// import { User } from "./user.js";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  description: String,
  lat: Number,
  lng: Number,
  category: String,
  images: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
