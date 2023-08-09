# NodeJS Apollo MongoDB AWS Prisma Jenkins Docker Project

This repository contains a comprehensive project that utilizes various technologies and tools to create a web application for conducting assessments and tests. The project is divided into two main parts: a test-taking platform for users and an admin interface for managing assessments and questions. The technologies used in this project include NodeJS, Apollo Server for GraphQL, AWS services, Mongoose for MongoDB, Prisma with PostgreSQL, Jenkins for CI/CD, and Docker for containerization.

## Table of Contents

- [NodeJS Apollo MongoDB AWS Prisma Jenkins Docker Project](#nodejs-apollo-mongodb-aws-prisma-jenkins-docker-project)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Usage](#usage)
  - [Technologies Used](#technologies-used)
  - [CI/CD with Jenkins](#cicd-with-jenkins)
  - [Dockerization](#dockerization)
  - [Contributing](#contributing)
  - [License](#license)

## Project Overview

This project aims to provide a user-friendly platform for conducting assessments and tests. It is divided into two primary parts:

1. **Test-Taker Platform**: Users can visit the website to take tests and assessments. They can view questions, answer them, and submit their responses. The platform provides a smooth user experience with a responsive interface.

2. **Admin Interface**: Administrators can log in to the admin interface to manage assessments, questions, and exams. They can create new assessments, add questions, set up exams, and review test results.

## Features

- User authentication and authorization.
- User-friendly interface for test takers.
- Admin dashboard for managing assessments and questions.
- Dynamic question creation and assignment to assessments.
- Real-time exam submission and results for test takers.
- Secure storage of user data and assessment information.

## Usage

1. Start the server: `npm run dev` or `docker-compose up` or `docker compose up`
2. For the test-taker platform: `http://localhost:3000`
3. For the admin interface: `http://localhost:3000/graphql`

## Technologies Used

- NodeJS: Backend server environment.
- Apollo Server: Implementation of GraphQL server.
- MongoDB: Database for storing user data.
- AWS S3: Database for storing files, template mail and so on... .
- Mongoose: Object Data Modeling (ODM) for MongoDB.
- Prisma: ORM for PostgreSQL.
- Jenkins: CI/CD automation.
- Docker: Containerization for easy deployment.

## CI/CD with Jenkins

The project includes a Jenkinsfile for setting up a continuous integration and continuous deployment pipeline using Jenkins. The pipeline automates building, testing, and deploying the application to a target environment.

## Dockerization

Docker is used to containerize the application, making it easy to deploy and run consistently across different environments.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the project, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README according to your project's specific details and add any additional sections that might be relevant.
