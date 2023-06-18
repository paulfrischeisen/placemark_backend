import { assert } from "chai";
import { Frankenjura, testPlacemarks } from "./fixtures.js";
import { db } from "../src/models/db.js";
import { assertSubset } from "./test-utils.js";

suite("Placemark Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(testPlacemarks[i]);
    }
  });

  teardown(async () => {});

  test("get placemark by id", async () => {
    await db.placemarkStore.addPlacemark(Frankenjura);
    const returnedPlacemark = await db.placemarkStore.getPlacemarkById(Frankenjura._id);
    assertSubset(Frankenjura, returnedPlacemark);
  });

  test("create a placemark", async () => {
    const newPlacemark = await db.placemarkStore.addPlacemark(Frankenjura);
    assertSubset(Frankenjura, newPlacemark);
    assert.isDefined(newPlacemark._id);
  });

  test("delete a placemark", async () => {
    await db.placemarkStore.addPlacemark(Frankenjura);
    await db.placemarkStore.deletePlacemarkById(Frankenjura._id);
    const returnedPlacemark = await db.placemarkStore.getPlacemarkById(Frankenjura._id);
    assert.isNull(returnedPlacemark);
  });

  test("delete all placemarks", async () => {
    for (let i = 0; i < testPlacemarks; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.placemarkStore.addPlacemark(testPlacemarks[i]);
    }
    await db.placemarkStore.deleteAllPlacemarks();
    const returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });
});
