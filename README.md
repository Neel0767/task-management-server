# Backend Setup Guide

## Prerequisites

Make sure you have the following installed on your machine:
- Docker
- Git
- Node.js and npm

## Step-by-Step Setup

### Step 1: Setup Docker and Pull MySQL 5.7 Image

First, ensure that Docker is installed and running on your machine. Then, pull the MySQL 5.7 image from Docker Hub:

```bash
docker pull mysql:5.7
```

### Step 2: Create a MySQL Database Container and Run It

Next, create a container for the MySQL database and run it:

```bash
docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=0000 -e MYSQL_DATABASE=mydatabase -p 3306:3306 -d mysql:5.7
```

- Replace rootpassword with a secure password of your choice.
- Replace mydatabase with the name of the database you want to create.

### Step 3: Clone the Server Repository

Clone the server repository to your local machine using Git:

bash
git clone https://github.com/Neel0767/task-management-server.git


### Step 4: Run Migrations and Seeders

Navigate to the cloned repository directory:

bash
cd <repository-directory>


Install the required npm packages:

```bash
npm install
```

Run the database migrations to set up your database schema:

bash
npx sequelize-cli db:migrate


Run the seeders to populate the database with initial data:
```bash
npx sequelize-cli db:seed:all
```

### Step 5: Start the Server

Finally, start the server:

```bash
npm start
```

Your backend server should now be up and running, connected to the MySQL database.

## Additional Information

- To stop the MySQL container, use:

  bash
  docker stop mysql-db
  

- To start the MySQL container again, use:

  bash
  docker start mysql-db
  

---

This section covers the steps to set up and run the backend server. You can add more sections for other details like environment variables, testing, and contribution guidelines as needed.
