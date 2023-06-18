export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },

  placemarks: {
    _model: "Placemark",
    poi1: {
      name: "POI 1",
      description: "description of POI 1",
      lat: "49.01183336119857",
      lng: "11.953814284654438",
      user: "->users.homer",
    },
    poi2: {
      name: "Placemark2",
      description: "description of POI 2",
      lat: "49.01183336119857",
      lng: "11.953814284654438",
      user: "->users.marge",
    },
    poi3: {
      name: "Placemark3",
      description: "description of POI 3",
      lat: "49.01183336119857",
      lng: "11.953814284654438",
      user: "->users.bart",
    },
  },
};
