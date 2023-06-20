export const apiReachableTest = {
  apiTest: {
    auth: false,
    handler: async function (request, h) {
      return { message: "API callback" };
    },
  },
};
