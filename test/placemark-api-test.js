import { assert } from "chai";
import { assertSubset } from "./test-utils.js";
import { maggie, maggieCredentials, Frankenjura, testPlacemarks } from "./fixtures.js";
import { placemarkService } from "./placemark-service.js";

const placemarks = new Array(testPlacemarks.length);

suite("Placemark API tests", () => {
  setup(async () => {
    await placemarkService.clearAuth();
    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllPlacemarks();
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      placemarks[i] = await placemarkService.createPlacemark(testPlacemarks[i]);
    }

    await placemarkService.createPlacemark(Frankenjura);
  });

  teardown(async () => {});

  test("create a placemark", async () => {
    const createdPlacemark = await placemarkService.createPlacemark(Frankenjura);
    assertSubset(Frankenjura, createdPlacemark);
    assert.isDefined(createdPlacemark._id);
  });

  test("delete all placemarks", async () => {
    let returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length + 1);
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.createPlacemark(Frankenjura);
    returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 1);
  });

  test("get a placemark", async () => {
    const returnedPlacemark = await placemarkService.getOnePlacemark(placemarks[0]._id);
    assert.deepEqual(placemarks[0], returnedPlacemark);
  });

  test("get a placemark - bad id", async () => {
    try {
      const returnedPlacemark = await placemarkService.getOnePlacemark("1");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a placemark - deleted placemark", async () => {
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.createPlacemark(Frankenjura);
    try {
      const returnedPlacemark = await placemarkService.getOnePlacemark(placemarks[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      console.log(error.response.data);
      assert(error.response.data.message === "No Placemark with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
