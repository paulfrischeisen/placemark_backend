import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async addPlacemark(placemark) {
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    const p = await this.getPlacemarkById(placemarkObj._id);
    return p;
  },

  async deletePlacemarkById(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async addImageById(id, img) {
    const placemark = await Placemark.findOne({ _id: id });
    if (!placemark) {
      return "error";
    }
    if (placemark.photos.length > 2) {
      placemark.photos[0] = img;
    } else {
      placemark.photos.push(img);
    }
    await placemark.save();
    return placemark;
  },

  async updateRatingById(id, rating) {
    const poi = await Placemark.findOne({ _id: id });
    if (!poi) {
      return "error";
    }
    if (poi.stats.avgRating == null) {
      poi.stats.avgRating = rating;
      poi.stats.numRatings = 1;
    }
    // if there is already a rating given to the POI
    else {
      const newAvg = (poi.stats.avgRating * poi.stats.numRatings + rating) / (poi.stats.numRatings + 1);
      poi.stats.avgRating = newAvg;
      poi.stats.numRatings += 1;
    }
    await poi.save();
    const tmp = await this.getPlacemarkById(poi._id);
    return tmp;
  },

  async addCommentById(id, username, comment) {
    const newComment = {
      username: username,
      comment: comment,
      date: new Date(),
    };

    const poi = await Placemark.findOne({ _id: id });
    if (!poi) {
      return "error";
    }
    poi.comments.push(newComment);
    await poi.save();
    const tmp = await this.getPlacemarkById(poi._id);
    return tmp;
  },

  async getPlacemarkUserStats() {
    const countUsers = await Placemark.aggregate([
      {
        $group: {
          _id: "$createdByUser",
          count: { $sum: 1 },
        },
      },
    ]);
    return countUsers;
  },

  async getPlacemarkRatingStats() {
    const countRating = await Placemark.aggregate([
      {
        $group: {
          _id: "$stats.avgRating",
          count: { $sum: 1 },
        },
      },
    ]);
    const counter = [0, 0, 0, 0, 0, 0];
    countRating.forEach((element) => {
      if (element._id === 5) {
        counter[5] += 1;
      } else if (element._id >= 4) {
        counter[4] += 1;
      } else if (element._id >= 3) {
        counter[3] += 1;
      } else if (element._id >= 2) {
        counter[2] += 1;
      } else if (element._id >= 1) {
        counter[1] += 1;
      } else if (element._id > 0) {
        counter[0] += 1;
      }
    });
    return {
      labels: ["0", "1", "2", "3", "4", "5"],
      data: counter,
    };
  },

  async getCategories() {
    const categories = await Placemark.distinct("category");
    const countCategories = await Placemark.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    return { categories, countCategories };
  },

  async updatePlacemark(newPlacemark) {
    const poi = await Placemark.findOne({ _id: newPlacemark._id });
    poi.title = newPlacemark.title;
    poi.img = newPlacemark.img;
    await poi.save();
  },

  async getPlacemarkByName(name) {
    try {
      const placemark = await Placemark.findOne({ name: name });
      if (placemark.location !== undefined) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },

  async addPhoto(placemark, photo) {
    const newPhoto = placemark.photos.push(photo);
    return newPhoto;
  },

  async findPlacemarksByCategory(category) {
    const placemarks = await Placemark.find({ _Category: category }).lean();
    return placemarks;
  },
};
