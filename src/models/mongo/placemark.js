import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  description: String,
  lat: Number,
  lng: Number,
  user: String,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
