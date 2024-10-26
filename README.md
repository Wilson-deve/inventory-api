# My Inventory Api

## Project Setup Instructions

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 12 or higher)
- **npm** (Node Package Manager, comes with Node.js)
- **MongoDB** (either locally or using a cloud service like MongoDB Atlas)

### 1. Create a New Project Directory

Open your terminal and create a new directory for your project:
cd my-inventory-app

### 2. Initialize a New Node.js Project

Run the following command to create a `package.json` file:
npm init -y

### 3. Install Required Packages

Install the necessary packages for your project:
npm install express mongoose dotenv

### 4. Create Project Structure

Create the following directory structure:

mkdir models controllers routes
touch server.js .env

### 5. Set Up the Database Configuration

In the `.env` file, add your MongoDB connection string. If you're using MongoDB Atlas, you can find the connection string in your Atlas dashboard. It should look something like this:

```
MONGODB_URI=mongodb://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and `mydatabase` with your actual MongoDB credentials and database name.

### 6. Create the Server in index.js

Open `src/index.js` and set up your Express server.

### 7. Create the Inventory Model

In `models/inventory.js`, define your inventory schema.

### 8. Create the Inventory Controller

In `controllers/inventory.js`, implement your inventory logic.

### 9. Create the Inventory Routes

In `routes/inventory.js`, set up your routes.

### 10. Run Your Application

Make sure your MongoDB server is running (if local) or that you have access to your MongoDB Atlas cluster. Then, start your application:

```
npm start
```

You should see a message indicating that the server is running and connected to MongoDB.

## API Endpoints

### 1. Get All Inventory Items

- **Endpoint**: `GET /api/inventory`
- **Query Parameters**:
  - `page`: (optional) The page number to retrieve (default is 1).
  - `limit`: (optional) The number of items per page (default is 10).
- **Response**: Returns a paginated list of inventory items along with total items and pages.

### 2. Create a New Inventory Item

- **Endpoint**: `POST /api/inventory`
- **Request Body**:
  ```json
  {
    "name": "Product Name",
    "category": "Product Category",
    "quantity": 10
  }
  ```
- **Response**: Returns the created inventory item.

### 3. Get Inventory Item by ID

- **Endpoint**: `GET /api/inventory/:id`
- **Response**: Returns the inventory item with the specified ID.

### 4. Update an Inventory Item

- **Endpoint**: `PUT /api/inventory/:id`
- **Request Body**:
  ```json
  {
    "name": "Updated Product Name",
    "category": "Updated Product Category",
    "quantity": 15
  }
  ```
- **Response**: Returns the updated inventory item.

### 5. Delete an Inventory Item

- **Endpoint**: `DELETE /api/inventory/:id`
- **Response**: Returns a success message upon deletion.

## Testing the API

You can use tools like [Postman](https://www.postman.com/) to test the API endpoints. For example, to get all inventory items, you can make a GET request to:

```
http://localhost:5000/api/inventory?page=1&limit=10
```
