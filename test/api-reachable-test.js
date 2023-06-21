import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";

suite("Api reachable test", async () => {
  test("test reachability:", async () => {
    const answer = await placemarkService.callApi();
    assert.equal(answer.message, "API callback");
  });
});
