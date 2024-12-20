# Country Information App

This project consists of a frontend application (React) and a backend service, which can be run simultaneously on different ports. The frontend communicates with the backend to fetch country data, display the list of countries, and show detailed information such as population charts, borders, etc.

## Prerequisites

Before running the application, make sure you have the following software installed on your system:

-  **Node.js** (v16 or higher)
-  **npm** or **yarn** (for package management)
-  **Postman** or any API testing tool (for API testing)

## Folder Structure

The project follows a simple structure with two main folders:

## Backend (API)

### 1. **Country List API**

The backend provides an API to fetch a list of countries. You can refer to the official documentation for more details:

-  [Country List API Documentation](https://date.nager.at/swagger/index.html)

### 2. **Country Info API**

The backend also provides detailed information about each country, including population data, borders, and more. Here's the Postman documentation:

-  [Country Info API Documentation](https://documenter.getpostman.com/view/1134062/T1LJjU52)

## Installation

### Backend (API)

1. Navigate to the `backend/` directory:

```bash
cd backend-challenge
```

2. Install the backend dependencies:

```bash
npm install
```

3. Configure any necessary environment variables
4. Run the backend server on a specific port (e.g., port 5000):

```bash
npm start
```

The backend server will start and be available on http://localhost:5000.

### Frontend (React App)

1. Navigate to the frontend/ directory:

```bash
cd fronted-challenge
```

2. Install the frontend dependencies:

```bash
npm install
```

3. Run the frontend app on a different port (e.g., port 3000):

```bash
npm start
```

## Usage

Once both the frontend and backend are running, you can access the app at http://localhost:3000. The frontend will communicate with the backend to fetch and display the list of available countries and detailed information when a country is selected.

### Testing the Application Locally

#### Frontend:

1. Visit http://localhost:3000 in your browser.
2. The homepage will display the list of available countries.
3. Click on any country to view its detailed information, including population charts and borders.

#### Backend:

1. The backend API should be accessible at http://localhost:5000.
2. You can use Postman or another API testing tool to interact with the backend directly.
3. GET /countries: Returns the list of countries.
4. GET /country/{countryCode}: Returns detailed information for a specific country.

### Testing the API

To test the backend APIs, follow these steps:

1. Open Postman or your preferred API testing tool.
2. Send a GET request to http://localhost:5000/countries to retrieve the list of countries.
3. Send a GET request to http://localhost:5000/country/{countryCode} (replace {countryCode} with a valid country code, e.g., "US" for the United States) to retrieve detailed information about a country.

### Notes

-  The frontend communicates with the backend via HTTP requests. Ensure the backend is running before attempting to access the frontend.
-  Make sure to replace any placeholders in the .env files with the actual values required for the APIs to function correctly.

### Troubleshooting

-  Port Conflicts: If you encounter issues with port conflicts, you can change the port numbers in the .env files for both the frontend and backend.
-  Missing Data: Ensure the backend server is running correctly and returning valid data. If you see empty data or errors, check the backend logs for more information.

### Conclusion

By following the instructions above, you should be able to run the frontend and backend servers simultaneously and interact with the application as intended.
