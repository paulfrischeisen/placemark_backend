import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  description: String,
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
  photos: [
    {
      type: String,
      ref: "Photo",
    },
  ],
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
  createdByUser: String,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
