# Analysis of an LLM-Based Batch Price Search

This analysis evaluates the refined proposal of using a single, batch query to a Large Language Model (LLM) to find hotel prices.

## 1. The Proposed Workflow

The proposed workflow is as follows:
1.  Use the Google Places API to get a list of all hotels within a user-defined map area.
2.  Construct a single prompt containing this list of hotels (e.g., in a tabular format).
3.  Send this single prompt to a web-browsing LLM and ask it to find the price for each hotel and return the completed list.

This approach aims to improve the efficiency over making individual LLM calls for each hotel.

## 2. Analysis of the Approach

While batching requests is a standard optimization technique in computing, using it with a web-browsing LLM presents a unique set of challenges. The core issue is that an LLM's web browsing is **inherently sequential**.

An LLM does not have dozens of web browsers it can run in parallel. When given a list of 30 hotels, it will execute the task as a sequence of steps:

1.  Look at Hotel #1.
2.  Perform a web search for it.
3.  Analyze the page to find the price.
4.  Look at Hotel #2.
5.  Perform a new web search...
6.  ...and so on, for all hotels in the list.

This single query is, in reality, a long chain of sequential tasks. Evaluating this against the key criteria for a consumer application:

### Speed

This approach would be **even slower** from the user's perspective. In a one-query-per-hotel model, you could at least show results as they come in. In this batch model, the user would see a loading spinner for the entire duration of the LLM's sequential search. If each hotel takes 20 seconds to look up, a list of 30 hotels would mean the user waits **10 minutes** before seeing a single result. This is not a viable user experience.

### Cost

The operational cost remains **prohibitively high**. The cost of an LLM query is based on the total amount of processing. Whether you do 30 small queries or one giant query that performs 30 sequential actions, the total computational work is roughly the same. The cost would still be orders of magnitude higher than traditional methods, making it economically unfeasible.

### Reliability

Reliability would be **significantly worse**. A long, sequential chain of tasks is much more fragile than a series of independent tasks. If the process fails on hotel #17 out of 30 (e.g., a website doesn't load, the price isn't listed, the AI gets confused), what happens?

*   Does the entire 10-minute query fail, returning nothing?
*   Does it return an incomplete list, leaving the user with missing data?

This single point of failure in a long chain makes the entire process much less dependable than handling each hotel search as an independent job.

## 3. Conclusion

While the idea of batching is a logical attempt at optimization, it unfortunately **exacerbates the core problems** of using a general-purpose LLM for this task. It leads to a slower user experience and lower reliability compared to making individual calls.


The fundamental conclusion remains unchanged: web-browsing LLMs are powerful tools for one-off research and summarization, but they are not a substitute for the real-time, parallel, and structured data aggregation required to power a consumer travel application. The speed, cost, and reliability do not meet the requirements for this specific product.

---

## 4. Pivot to a Feasible Pet Project

This section analyzes the latest pivot: creating a simple pet project that drops the complex pricing requirement and focuses on the core map-search functionality.

### Proposal: A Simple Hotel Locator

*   **Product:** A simple web application.
*   **Core Feature:** A user can draw a box on a map to define a custom area. The application then lists the hotels found within that area.
*   **Key Simplification:** The requirement to find and display real-time pricing is **completely removed**. The goal is simply to identify and list the hotels.
*   **Technology:** Use the Google Places API to find the hotels.

### Feasibility and Viability Assessment

This pivoted idea is **highly feasible and an excellent choice for a pet project.**

By removing the price-fetching requirement, all the major roadblocks that made the previous ideas unviable (web scraping, LLM costs, reliability issues, competition) are eliminated.

*   **Technical Feasibility:** The project is straightforward.
    1.  **Frontend:** Use a standard JavaScript mapping library (like Leaflet, Mapbox, or the Google Maps JS API) to create the interactive map and allow users to draw a rectangle.
    2.  **Backend Logic:** When the user finishes drawing the box, get the corner coordinates.
    3.  **API Call:** Make a single API call to the **Google Places API** using its "Nearby Search" functionality. The search query will include the coordinates and specify `type: 'hotel'`.
    4.  **Display Results:** The API will return a list of hotels in a structured JSON format. The frontend can then simply display this list (name, address, rating, etc.) to the user.

*   **Project Viability (as a Pet Project):**
    *   **Achievable Scope:** The project is small, well-defined, and can likely be completed by a single developer in a reasonable amount of time.
    *   **Practical Skills:** It's a great way to practice valuable skills in frontend development, interacting with maps, and consuming third-party APIs.
    *   **No Bottlenecks:** It avoids the entire data-sourcing problem that plagued the more ambitious versions of the idea. The Google Maps Platform free tier is more than sufficient for development and personal use.

### Conclusion

This pivot is a perfect example of refining a broad, complex idea into a practical and achievable project. It retains the fun, interactive map feature while scoping it down to a level that is perfect for a personal project, a learning exercise, or a portfolio piece. This version of the idea is **strongly recommended** as a starting point.