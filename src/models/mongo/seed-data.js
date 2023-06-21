export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      username: "HSimpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      username: "MSimpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      username: "BSimpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },

  placemarks: {
    _model: "Placemark",
    poi1: {
      name: "Placemark1",
      description: "description of POI 1",
      category: "test category for POI 1",
      location: {
        type: "Point",
        coordinates: [49.01183336119857, 11.953814284654438],
      },
    },
    poi2: {
      name: "Placemark2",
      description: "description of POI 2",
      category: "test category for POI 2",
      location: {
        type: "Point",
        coordinates: [49.01183336119857, 11.953814284654438],
      },
    },
    poi3: {
      name: "Placemark3",
      description: "description of POI 3",
      category: "test category for POI 3",
      location: {
        type: "Point",
        coordinates: [49.01183336119857, 11.953814284654438],
      },
    },
  },
};
