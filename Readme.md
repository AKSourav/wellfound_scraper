# Wellfound Job Scraper

A Python-based web scraper and API service for collecting job listings from Wellfound (formerly AngelList Talent).

## Live API

The API is hosted at: [wellfound.anupamkumarsourav.site](https://wellfound.anupamkumarsourav.site)

## Features

- Scrapes job listings from Wellfound with customizable parameters
- RESTful API with FastAPI integration
- In-memory caching system
- Background task processing
- Comprehensive data extraction including salary, equity, and company details

## Installation

```bash
pip install requests beautifulsoup4 pandas fastapi uvicorn
```

## Components

### 1. WellfoundJobScraper Class

The core scraper class that handles the actual web scraping functionality.

#### Key Methods:

- `get_job_listings(location, role, num_pages)`: Main method to scrape job listings
- `save_to_csv(jobs, filename)`: Export scraped data to CSV
- Various helper methods for data extraction:
  - `_extract_salary_range(text)`
  - `_extract_equity_range(text)`
  - `_extract_years_experience(text)`

### 2. FastAPI Service

A RESTful API service that provides endpoints for job scraping operations.

#### Endpoints:

1. `POST /api/v1/jobs/scrape`
   - Start a background scraping job
   - Parameters:
     - `role` (str, default: 'backend-engineer')
     - `location` (str, optional, default: "india")
     - `num_pages` (int, optional, default: 1)

2. `GET /api/v1/jobs/{role}`
   - Retrieve cached job listings
   - Parameters:
     - `role` (path parameter)
     - `location` (query parameter, optional)
     - `num_pages` (query parameter, optional)

3. `GET /api/v1/jobs/find/{role}`
   - Directly scrape and return job listings
   - Parameters:
     - Same as above endpoint

4. `GET /api/v1/health`
   - Health check endpoint

## Usage Examples

### Using the Scraper Directly

```python
from wellfound_scraper import WellfoundJobScraper

# Initialize scraper
scraper = WellfoundJobScraper()

# Scrape jobs
jobs = scraper.get_job_listings(
    location="seattle",
    role="devops-engineer",
    num_pages=1
)

# Save to CSV
scraper.save_to_csv(jobs)
```

### Using the Hosted API

```python
import requests

# Start a scraping job
response = requests.post(
    "https://wellfound.anupamkumarsourav.site/api/v1/jobs/scrape",
    json={
        "role": "backend-engineer",
        "location": "san-francisco",
        "num_pages": 2
    }
)

# Retrieve scraped jobs
jobs = requests.get(
    "https://wellfound.anupamkumarsourav.site/api/v1/jobs/backend-engineer",
    params={"location": "san-francisco", "num_pages": 2}
)

# Direct scraping endpoint
jobs = requests.get(
    "https://wellfound.anupamkumarsourav.site/api/v1/jobs/find/backend-engineer",
    params={"location": "san-francisco", "num_pages": 2}
)
```

## Data Structure

The scraper extracts the following information for each job listing:

- Company Information:
  - Company name
  - Description
  - Size
  - URL
  - Logo URL
  - Tags

- Job Details:
  - Title
  - URL
  - Type (Full-time, Part-time, etc.)
  - Salary range (min/max)
  - Equity range (min/max)
  - Location(s)
  - Required experience
  - Posted date
  - Actively hiring status

## Caching

The API implements an in-memory cache with the following characteristics:
- Cache key: `{role}_{location}_{num_pages}`
- Cache duration: 1 hour
- Includes timestamp and error handling

## Running the Service Locally

Start the FastAPI server:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Error Handling

The scraper implements comprehensive error handling:
- Individual job processing errors are caught and logged
- Company container processing errors are isolated
- Page-level scraping errors are handled gracefully
- API endpoints return appropriate HTTP status codes and error messages
