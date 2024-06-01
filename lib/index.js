"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryJobs = exports.QuerySortBy = void 0;
const axios_1 = require("axios");
const cheerio = require("cheerio");
var QuerySortBy;
(function (QuerySortBy) {
    QuerySortBy["relevant"] = "R";
    QuerySortBy["recent"] = "DD";
})(QuerySortBy = exports.QuerySortBy || (exports.QuerySortBy = {}));
/**
 * Query 10 jobs from the linkedin api
 * @param args
 * keywords: ['engineer']
 * location: ex = Australia
 * locationType: 1 = on site; 2 = remote; hybrid = 3
 * sortBy: relevant; recent
 * debug: boolean
 */
const queryJobs = async (args) => {
    let url = new URL(`https://${args.host ?? "www.linkedin.com"}/jobs-guest/jobs/api/seeMoreJobPostings/search`);
    if (args.query) {
        if (args.query.keywords) {
            url.searchParams.set("keywords", args.query.keywords.toString());
        }
        if (args.query.location) {
            url.searchParams.set("location", args.query.location.toString());
        }
        if (args.query.locationType) {
            url.searchParams.set("f_WT", args.query.locationType.toString());
        }
    }
    if (args.start) {
        url.searchParams.set("start", args.start.toString());
    }
    if (args.sortBy) {
        url.searchParams.set("sortBy", args.sortBy.toString());
    }
    // Get the jobs from the linkedin api
    const response = await axios_1.default.get(url.toString());
    // If debug mode activated, show the url
    if (args.debug == true) {
        console.log(url.toString());
    }
    // Extra the jobs from the html
    const $ = cheerio.load(response.data);
    const jobCursors = $("li");
    const jobs = jobCursors
        .map((_, cursor) => {
        const jobCursor = $(cursor);
        const position = jobCursor.find(".base-search-card__title").text().trim() || "";
        const companyName = jobCursor.find(".base-search-card__subtitle").text().trim() || "";
        const location = jobCursor.find(".job-search-card__location").text().trim() || "";
        const postedAt = jobCursor.find("time").attr("datetime") || "";
        const salary = jobCursor
            .find(".job-search-card__salary-info")
            .text()
            .trim()
            .replace(/\n/g, "")
            .replace(" ", "") || "";
        const jobUrl = jobCursor.find(".base-card__full-link").attr("href") || "";
        const companyLogoUrl = jobCursor.find(".artdeco-entity-image").attr("data-delayed-url") || "";
        return {
            position: position,
            company: {
                name: companyName,
                logoUrl: companyLogoUrl,
            },
            location: location,
            salary: salary,
            postedAt: postedAt,
            jobUrl: jobUrl,
        };
    })
        .get();
    return jobs;
};
exports.queryJobs = queryJobs;
//# sourceMappingURL=index.js.map