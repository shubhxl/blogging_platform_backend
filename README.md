# Blog Backend with Express, TypeScript, and PostgreSQL
 
This is a backend application for a blog website, implemented using Express.js, TypeScript, and PostgreSQL. It follows the MVC (Model-View-Controller) architecture and uses a configuration library for variable management. This backend provides user registration, login, and logout functionality with cookie and session management, along with blog CRUD operations.
 
## Features
 
- User Registration: Allows users to create an account with a unique username and password.
- User Login: Enables users to log in with their credentials and creates a session.
- User Logout: Logs users out and destroys their session.
- Blog CRUD Operations: Provides Create, Read, Update, and Delete operations for blog posts.
- Database: Utilizes PostgreSQL as the database for storing user and blog data.
- Configuration Management: Uses a configuration library for managing environment variables.
 
## Prerequisites
 
Before you begin, ensure you have met the following requirements:
 
- Node.js: Install Node.js on your system.
- PostgreSQL: Set up a PostgreSQL database for the application.
- Dependencies: Install project dependencies using `npm install`.
 
## Configuration
 
Before running the application, make sure to set the necessary environment variables. You can use a `.env` file to store these variables. An example `.env` file might include:
 
```plaintext
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydatabase
DB_USER=myuser
DB_PASSWORD=mypassword
SESSION_SECRET=mysecret
