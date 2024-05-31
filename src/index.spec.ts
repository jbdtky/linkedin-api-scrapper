import * as scrapper from "./index";

describe("Query jobs", () => {
  it("should be able to execute a test", (done) => {
    scrapper
      .queryJobs({
        query: {
          keywords: ["engineer"],
          location: "Australia",
          locationType: 1,
        },
        start: 0,
      })
      .then((jobs) => done());
  });
});
