"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrapper = require("./index");
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
//# sourceMappingURL=index.spec.js.map