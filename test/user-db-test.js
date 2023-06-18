import { assert } from "chai";
import { db } from "../src/models/db.js";
import { maggie, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("User Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAllUsers();
  });

  teardown(async () => {});

  test("get all users", async () => {
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);

    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
    const returnedUsersNew = await db.userStore.getAllUsers();
    assert.equal(returnedUsersNew.length, testUsers.length);
  });

  test("get user by id", async () => {
    const user = await db.userStore.addUser(maggie);
    const returnedUser = await db.userStore.getUserById(user._id);
    assert.deepEqual(user, returnedUser);
  });

  test("get user by email", async () => {
    const user = await db.userStore.addUser(maggie);
    const returnedUser = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(user, returnedUser);
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete user by id", async () => {
    await db.userStore.addUser(maggie);
    await db.userStore.deleteUserById(maggie._id);
    const returnedUser = await db.userStore.getUserById(maggie._id);
    assert.isNull(returnedUser);
  });

  test("get a user - bad params", async () => {
    assert.isNull(await db.userStore.getUserByEmail(""));
    assert.isNull(await db.userStore.getUserById(""));
    assert.isNull(await db.userStore.getUserById());
  });

  test("delete all users", async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
    await db.userStore.deleteAllUsers();
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });
});
