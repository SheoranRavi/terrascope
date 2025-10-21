## FIN
- I used this more as a practice project.
- What I actually wanted to do with it was not possible with the free tools/resources/apis I could find.
- Might spend some time on it in future.

## Rough sketch
- Create a tool that can be used to conduct research over geographical areas
    - The research can be of types like
        - Land prices
        - Hotel/resort per night prices with availability

## Rough implementation
- Get the user query -> type, area coordinates or bounding box within which to search
- Collect data
    - For collecting data you have to scrape the internet
        - so need some kind of web scraper
- Filter data
- Overlay over the map

## Tech Stack
- **Frontend:** React
- **Backend:** Go

## API Endpoint

### `GET /api/hotels`

This endpoint retrieves a list of hotels within a specified geographical bounding box.

#### Query Parameters

-   `north` (float, required): The latitude of the northern boundary.
-   `south` (float, required): The latitude of the southern boundary.
-   `east` (float, required): The longitude of the eastern boundary.
-   `west` (float, required): The longitude of the western boundary.

#### Example Request

```
GET /api/hotels?north=37.8&south=37.7&east=-122.4&west=-122.5
```

#### Success Response (200 OK)

Returns a JSON array of hotel objects.

```json
[
    {
        "name": "Fairmont San Francisco",
        "place_id": "ChIJN2SgO9-AhYARw4v4dJv2Z5c",
        "location": {
            "lat": 37.7922,
            "lng": -122.4105
        },
        "rating": 4.6,
        "user_ratings_total": 4500,
        "vicinity": "950 Mason St, San Francisco"
    },
    {
        "name": "The Ritz-Carlton, San Francisco",
        "place_id": "ChIJb-3G8t-AhYARr5t3a0q3adY",
        "location": {
            "lat": 37.7919,
            "lng": -122.4065
        },
        "rating": 4.7,
        "user_ratings_total": 2300,
        "vicinity": "600 Stockton St, San Francisco"
    }
]
```
