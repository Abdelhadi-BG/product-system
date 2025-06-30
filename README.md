# Full-Stack Product Management Application

This is a full-stack web application for managing a product catalog. It features a Spring Boot backend that provides a RESTful API and a React frontend that offers a user-friendly interface for interacting with the data.

## Project Structure

- `backend/`: Contains the Spring Boot application, including the API, service layer, and data persistence logic.
- `frontend/`: Contains the React application, which provides the user interface.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (Version 17 or higher)
- [Node.js and npm](https://nodejs.org/)
- [Docker and Docker Compose](https://www.docker.com/products/docker-desktop)

## Getting Started

Follow these steps to get the application up and running on your local machine.

### 1. Backend Setup

The backend is a Spring Boot application that connects to a PostgreSQL database. Docker Compose is used to manage both the application and the database services.

1.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2.  **Start the services:**
    Make sure Docker Desktop is running, then execute the following command:
    ```sh
    docker-compose up --build
    ```
    This command will build the Spring Boot application image and start both the application and PostgreSQL containers. The backend API will be available at `http://localhost:8080`.

### 2. Frontend Setup

The frontend is a React application that consumes the backend API.

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Start the development server:**
    ```sh
    npm start
    ```
    The React application will open automatically in your browser at `http://localhost:3000`.

## API Endpoints

The backend provides the following RESTful endpoints for managing products:

- `GET /api/products`: Retrieve a list of all products.
- `GET /api/products/{id}`: Retrieve a single product by its UUID.
- `POST /api/products`: Create a new product.
- `PUT /api/products/{id}`: Update an existing product.
- `DELETE /api/products/{id}`: Delete a product.
