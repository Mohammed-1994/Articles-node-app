
# Article Management Project with Node.js and MongoDB

## Overview
This project is a **Node.js** application using **Express.js** and **MongoDB**, allowing users to add, view, and delete articles. The app leverages the **Mongoose** library to interact with the **MongoDB** database, and includes **Rate Limiting** to protect the API from Distributed Denial of Service (DDoS) attacks or excessive requests.

## Requirements
- **Node.js** (version 12 or higher)
- **MongoDB** (you can use either local MongoDB or MongoDB Atlas)

## Installation

### 1. **Set up the environment:**
- Make sure you have **Node.js** and **npm** installed on your system. You can check by running the following commands:
  ```bash
  node -v
  npm -v
2. Install dependencies:
In the root of the project, open your Terminal and run the following command to install the required dependencies:

bash
Copy
npm install
3. Set up the database:
If you're using MongoDB Atlas (cloud database):

Go to MongoDB Atlas and create an account.

Create a new Cluster.

Obtain the Connection String.

Add the Connection String to the .env file using the MONGODB_URL   variable.

If you're using local MongoDB:

Make sure MongoDB is installed and running locally on your machine.

4. Create a .env file:
In the root of the project, create a file named .env and add the following:

env
Copy
MONGODB_URL =mongodb://localhost:27017/myDatabase   # If using local MongoDB
# OR
MONGODB_URL =mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority  # If using MongoDB Atlas
Features Implemented
CRUD Operations:

Create articles with a title and content.

Read all articles in the database with pagination.

Delete articles by ID.

Rate Limiting:

To prevent abuse of the API, a Rate Limiter is implemented that allows up to 50 requests per 10 minutes from the same IP.

Mongoose Integration:

The project uses Mongoose for MongoDB schema validation and interacting with the database.

Usage
1. Run the Application:
Once all dependencies are installed, you can start the application by running:

bash
Copy
npm start
2. API Endpoints:
GET /api/articles:

Fetch all articles, supports pagination using page and limit query parameters.

Example: /api/articles?page=1&limit=10

POST api/articles:

Add a new article.

Request body:

json
Copy
{
  "articleTitle ": "Article Title",
  "articleBody ": "Content of the article"
}
DELETE api/articles/:id:

Delete an article by ID.

Example: api/articles/605c72ef15320724b1b0c828

PUT api/articles/:id:

Update an article by ID.

Example: api/articles/605c72ef15320724b1b0c828

3. Rate Limiting:
If a user exceeds the rate limit (more than 3 requests in 10 minutes), they will receive the following error:

json
Copy
{
  "message": "Too many requests, please try again later."
}

4. Accessing the Web Interface:
After starting the application, open your browser and go to:

    http://localhost:PORT/articles

Replace `PORT` with the port number specified in your `.env` file (default is usually 3000).

You can use the web interface to create, view, edit, and delete articles using user-friendly forms.

Error Responses
All API errors are returned in JSON format. Example error response:

```json
{
  "status": "error",
  "message": "Description of the error"
}
```

Validation errors will include details about what went wrong. For example, if you send an invalid article:

```json
{
  "status": "error",
  "message": "\"articleTitle\" is required"
}
```

Testing
You can use Postman or any other API testing tool to test the endpoints.

Example Postman Request:
POST to api/articles:

```json
{
  "articleTitle": "New Article",
  "articleBody": "This is a new article."
}
-```

Contributing
If you want to contribute to this project, please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.


