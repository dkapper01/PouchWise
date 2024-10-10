## PouchWise Documentation

### Overview

PouchWise is an app that integrates with [CUDIS](https://www.cudis.xyz/) wearable devices to track the user's heart rate and compares this data to the user's logged nicotine consumption. The app provides insights into how nicotine intake might be affecting the user's heart rate by visualizing key metrics such as maximum, minimum, and average heart rates for specific time periods.

### API Response

The app's API retrieves heart rate data from the CUDIS wearable device within a specified time range and returns the following data in the response:

- **HTTP Status:** 200 (Success)
- **Message:** "success" (Indicates the successful retrieval of heart rate data)
- **Data Object:**
  - **maximum:** The highest recorded heart rate for the specified time period.
  - **minimum:** The lowest recorded heart rate for the specified time period.
  - **average:** The average heart rate for the specified time period.
  - **list:** An array of objects where each object represents the heart rate data for a specific date.
    - **date:** The date for which the heart rate data was recorded.
    - **maxY:** The maximum heart rate recorded on that date.
    - **minY:** The minimum heart rate recorded on that date.

### Sample Response

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "maximum": 80,
    "minimum": 60,
    "average": 73,
    "list": [
      {
        "date": "2024-09-16",
        "maxY": 80.0,
        "minY": 70.0
      },
      {
        "date": "2024-09-17",
        "maxY": 80.0,
        "minY": 60.0
      },
      {
        "date": "2024-09-18",
        "maxY": 80.0,
        "minY": 75.0
      }
    ]
  }
}
```

### Key Features

- **Heart Rate Analysis:** PouchWise compares heart rate data collected from the wearable device against the user's nicotine consumption logs.
- **Time-Range Insights:** The app provides maximum, minimum, and average heart rate values over a user-specified time period.
- **Daily Breakdown:** Detailed heart rate data for individual days, allowing users to track trends and patterns in their heart rate relative to nicotine consumption.

### Use Case Example

A user wants to understand how nicotine consumption impacts their heart rate over time. They log their nicotine intake in PouchWise while the app continuously tracks their heart rate. By analyzing the API response, users can see how their heart rate fluctuates based on their nicotine usage and adjust their behavior accordingly.

### Future Features (Planned)

- Real-time alerts for abnormal heart rate changes correlated with high nicotine consumption.
- Visual graphs to compare nicotine intake and heart rate trends over time.

This document outlines the key API response structure and how it integrates with user data to provide insights into health metrics.

### Example Workflow for Combining Data

#### Step 1: Fetch and Combine Data

Use the API response to get the heart rate data:

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "maximum": 80,
    "minimum": 60,
    "average": 73,
    "list": [
      {
        "date": "2024-09-16",
        "maxY": 80.0,
        "minY": 70.0
      }
    ]
  }
}
```

Fetch the user’s nicotine log data for the same period:

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "date": "2024-09-16",
    "nicotineUnits": 5 // User consumed 5 units of nicotine on 2024-09-16
  }
}
```

#### Step 2: Combine Data for Analysis

Combine the data for the date "2024-09-16" to see how nicotine intake relates to heart rate:

```json
{
  "date": "2024-09-16",
  "nicotineUnits": 5,
  "maxY": 80.0,
  "minY": 70.0,
  "averageHeartRate": 73
}
```

#### Step 3: Derive Insights

On 2024-09-16, the user consumed 5 units of nicotine, and their heart rate ranged between 70-80 bpm. If there are multiple days of data, you can analyze whether higher nicotine units on other days led to higher heart rates, thus deriving actionable insights.
