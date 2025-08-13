# Wild Horizons

A Node.js server application for serving travel destination data with query-based filtering capabilities.

## What I Built

This project is a RESTful API server that provides travel destination information with advanced filtering options. Users can query destinations by country, continent, and public accessibility status.

## Key Learning Outcomes

### HTTP Server Development
- Built a custom HTTP server using Node.js native `http` module
- Implemented proper request/response handling patterns
- Created modular utility functions for reusable code

### HTTP Status Codes & Headers
- Learned the importance of proper HTTP status codes (200, 400, 404, etc.)
- Implemented appropriate response headers including `Content-Type`
- Understanding when and why different status codes matter for API consumers

### CORS (Cross-Origin Resource Sharing)
- Gained deeper understanding of CORS policies and browser security
- Configured CORS headers for public API accessibility
- Learned the security implications of `Access-Control-Allow-Origin: '*'`

### Data Filtering & Query Parameters
- Implemented dynamic data filtering based on URL query parameters
- Built a flexible filtering system that handles multiple criteria simultaneously
- Extracted and processed query parameters for precise data retrieval

## Features

- **GET `/api`** - Retrieve all destinations with optional filtering
- **Query Parameters**: `?country=`, `?continent=`, `?is_open_to_public=`
- **Modular Architecture** - Separated concerns into utility functions
- **JSON Responses** - Consistent API response format

TEST