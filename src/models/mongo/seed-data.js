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
      name: "Frankenjura",
      description: "POI in Frankenjura - climbing area near nuremberg",
      lat: "49.02103943114347",
      lng: "10.760429041231525",
      category: "Rock Climbing",
      images: ["https://www.outdoor-magazin.com/klettern/verliebt-ins-frankenjura/"],
      user: "->users.bart",
    },
    poi2: {
      name: "Altmühltal",
      description: "POI in Altmühltal - climbing area near regensburg",
      lat: "49.03971128371192",
      lng: "10.815850748556889",
      category: "Rock Climing",
      images: [],
      users: "->users.bart",
    },
    poi3: {
      name: "Schönhofen",
      description: "POI in Schönhofen - climbing area near regensburg",
      lat: "49.00888869872047",
      lng: "11.96074961644391",
      category: "Rock Climing",
      images: [],
      users: "->users.bart",
    },
    poi4: {
      name: "Magic Wood",
      description: "POI in Switzerland - climbing area near the italian border",
      lat: "46.56696788951796",
      lng: "9.437610795632962",
      category: "Outdoor Bouldering",
      images: [],
      users: "->users.bart",
    },
  },
};
