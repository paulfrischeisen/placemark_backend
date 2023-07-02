import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks(user) {
    const placemarks = await Placemark.find({ user: user }).lean();
    return placemarks;
  },

  async getOnePlacemark(id, user) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id, user: user }).lean();
      return placemark;
    }
    return null;
  },

  async addPlacemark(placemark) {
    const newPlacemark = new Placemark(placemark);
    let placemarkObj = null;

    for (let i = 0; i < 5; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      placemarkObj = await newPlacemark.save();
      if (newPlacemark) {
        break;
      }
    }
    console.log("we get into the addPlacemark");
    console.log(placemarkObj._id);
    const temp = await this.getOnePlacemark(placemarkObj._id, placemarkObj.user);
    return temp;
  },

  async deleteOnePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks(user) {
    await Placemark.deleteMany({ user: user });
  },

  async addImage(id, imgURL, user) {
    const placemark = await Placemark.findOne({ _id: id });
    if (!placemark) {
      return "error";
    }
    placemark.images.push(imgURL);
    await placemark.save();

    const poi = await this.getOnePlacemark(id, user);
    return poi;
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

  async updatePlacemark(id, newPlacemark, user) {
    const placemark = await Placemark.findOne({ _id: id, user: user });

    if (!placemark) {
      return null;
    }

    Object.assign(placemark, newPlacemark);
    await placemark.save();

    const temp = await this.getOnePlacemark(id, user);
    return temp;
  },

  async deleteImage(id, imgURL) {
    const placemark = await Placemark.findOne({ id: id });
    if (!placemark) {
      return null;
    }
    const numImg = placemark.images.indexOf(imgURL);
    if (numImg > -1) {
      placemark.images.splice(numImg, 1);
      await placemark.save();
    }

    const temp = await this.getOnePlacemark(id, placemark.user);
    return temp;
  },

  async getPlacemarksByCategory(category) {
    const placemarks = await Placemark.find({ _Category: category }).lean();
    return placemarks;
  },
};
