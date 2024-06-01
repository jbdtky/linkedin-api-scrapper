export declare enum QuerySortBy {
    relevant = "R",
    recent = "DD"
}
export declare type Job = {
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
export declare const queryJobs: (args: {
    host?: string;
    query?: {
        keywords?: string[];
        location?: string;
        locationType?: number;
    };
    start?: number;
    sortBy?: QuerySortBy;
    debug?: boolean;
}) => Promise<Job[]>;
