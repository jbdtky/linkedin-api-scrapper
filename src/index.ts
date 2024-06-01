import axios from "axios";
import * as cheerio from "cheerio";

export enum QuerySortBy {
  relevant = "R",
  recent = "DD",
}

export type Job = {
  position: string;
  company: {
    name: string;
    logoUrl: string;
  };
  location: string;
  salary: string;
  postedAt: string;
  jobUrl: string;
};

/**
 * Query 10 jobs from the linkedin api
 * @param args
 * keywords: ['engineer']
 * location: ex = Australia
 * locationType: 1 = on site; 2 = remote; hybrid = 3
 * sortBy: relevant; recent
 * debug: boolean
 */
export const queryJobs = async (args: {
  host?: string;
  query?: {
    keywords?: string[];
    location?: string;
    locationType?: number;
  };
  start?: number;
  sortBy?: QuerySortBy;
  debug?: boolean;
}) => {
  let url = new URL(
    `https://${
      args.host ?? "www.linkedin.com"
    }/jobs-guest/jobs/api/seeMoreJobPostings/search`
  );

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
  const response = await axios.get(url.toString());

  // If debug mode activated, show the url
  if (args.debug == true) {
    console.log(url.toString());
  }

  // Extra the jobs from the html
  const $ = cheerio.load(response.data);
  const jobCursors = $("li");
  const jobs: Job[] = jobCursors
    .map((_, cursor) => {
      const jobCursor = $(cursor);
      const position =
        jobCursor.find(".base-search-card__title").text().trim() || "";
      const companyName =
        jobCursor.find(".base-search-card__subtitle").text().trim() || "";
      const location =
        jobCursor.find(".job-search-card__location").text().trim() || "";
      const postedAt = jobCursor.find("time").attr("datetime") || "";
      const salary =
        jobCursor
          .find(".job-search-card__salary-info")
          .text()
          .trim()
          .replace(/\n/g, "")
          .replace(" ", "") || "";
      const jobUrl = jobCursor.find(".base-card__full-link").attr("href") || "";
      const companyLogoUrl =
        jobCursor.find(".artdeco-entity-image").attr("data-delayed-url") || "";
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
