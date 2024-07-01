# linkedin-api-scrapper

## Installation

`npm install linkedin-api-scrapper --save`

## Usage

### Query jobs

The API results is 10 jobs. If you want to load all results, implements a loop with a try catch to retry if there's a failure and keep incrementing the start by 10 when it succeeds.

#### Example

```Typescript
import * as scrapper from "./index";

// Get the first 10 jobs for my query
const jobs = scrapper
  .queryJobs({
    query: {
      keywords: ["engineer"],
      location: "Australia",
      locationType: 1,
    },
    start: 0,
  });
```

#### Args

| Argument     | Description                          | Options                                          |
| ------------ | ------------------------------------ | ------------------------------------------------ |
| keywords     | Keywords to search for in job titles | Array of strings, e.g., ['engineer']             |
| location     | Location filter for job search       | String, e.g., 'Australia'                        |
| locationType | Type of location                     | Number, e.g, 1 = on site; 2 = remote; 3 = hybrid |
| sortBy       | Sorting criteria for job results     | String, e.g., 'relevant', 'recent'               |
| debug        | Print debug log                      | Boolean                                          |

You can adjust the options as needed for your specific query requirements.
