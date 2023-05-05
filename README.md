# Welcome to the Backend of our MERN application! 👋

## Introduction

Welcome to the backend of our MERN application! This project was built with Express and NodeJS and serves as the server-side of our full-stack web application. We have used MongoDB as our database, which provides reliable and scalable data storage.

## Features

Our application allows users to create an account and login securely, with password encryption using bcrypt and JWT tokens. We have also integrated session and cookies functionalities to ensure a seamless user experience.

## Installation and Usage

To get started with the backend, you can clone this repository to your local machine by running:

### `git clone https://github.com/your-username/your-repo.git`

Once you have cloned the repository, navigate to the project directory and install the necessary dependencies by running:

### `npm install`

To run the backend, use the command:

### `npm start`

This will start the server and you can access the endpoints at http://localhost:5000.

## Database Configuration

We have used MongoDB as our database for this project. You will need to create a MongoDB Atlas account and add your database credentials to a `.env` file in the root directory of the project. You can use the `.env.example` file as a template.

## API Endpoints

Our backend provides the following API endpoints:

- `/userCreate`: allows users to create an account
- `/UserLogin`: allows users to login to their account
- `/getAllUser`: returns information about the all Users in Database.
- `/getFilteredUser`: returns information about a specific user as per the parameters.

## Live Demo

A live demo of the application can be found at https://mern-backend-j83f4uym2-aashutoshverma.vercel.app/.

## Contributions

We welcome contributions from anyone! Feel free to fork this repository and make any changes you see fit. Once you have made your changes, submit a pull request and we will review your changes.

## Contact

If you have any questions or issues, feel free to contact us at aashutoshverma007@gmail.com .
