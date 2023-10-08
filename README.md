# BitVote - Crypto Price Prediction Platform

BitVote is a web application that allows users to predict the percentage change in cryptocurrency prices over a 24-hour period. Users can also view price charts for various coins, log in, sign up, and log out. Additionally, the project is actively working on implementing a forum feature.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Forum](#forum)

## Project Overview

BitVote is a Spring Boot project with a Docker Compose setup for containerization and a front-end built using Vite, React, and TypeScript. The project's primary goal is to provide a platform for users to predict cryptocurrency price changes, view coin price charts, and interact with a growing community through the forum feature.

## Features

List the key features of your BitVote project:

- Predict cryptocurrency price percentage changes.
- View cryptocurrency price charts.
- User authentication (Login, Sign Up, Logout).
- Forum (Work in progress).

## Technologies Used

Outline the technologies, libraries, and frameworks used in your project:

**Front-end:**

- Vite (Front-end build tool)
- React (Front-end library)
- TypeScript (Programming language)
- Axios (HTTP client)
- Chart.js (Chart library)
- React Router DOM (Routing)
- JoyUI/MUI (UI Library)

**Back-end:**

- Spring Boot (Java framework)
- Spring Security (Security framework)
- Redis (In-memory data store)
- PostgreSQL (Database)
- Lombok (Java library)
- JWT (JSON Web Tokens) authentication
- OpenFeign (REST client)
- Passay (Password validation)
- Docker Compose (Container orchestration)
- CoinGeckoAPI (External API)

## Requirements

1. **Java Development Kit (JDK):** You will need a compatible version (17 or higher) of JDK installed on your system. You can download the JDK from the [Oracle](https://www.oracle.com/java/technologies/javase-downloads.html) website or use an OpenJDK distribution.

2. **Maven:** Spring Boot projects are typically managed using Maven. Install Maven if you haven't already. You can download it from the [official Maven website](https://maven.apache.org/download.cgi) and follow the installation instructions.

3. **Docker:** Install Docker on your system. You can download Docker from the [official Docker website](https://docs.docker.com/get-docker/) and follow the installation instructions.

4. **Node.js and npm:** Install Node.js and npm (Node Package Manager) on your system. You can download them from the [official Node.js website](https://nodejs.org/). These are required to build and run the React front end.

5. **Vite:** Vite is a front-end build tool used in your project. Install Vite globally using npm:

```bash
npm install -g create-vite
```

## Installation

If applicable, provide detailed installation instructions for both the front end and back end. Include code snippets or commands for installing dependencies and running your project locally.

**Front-end:**

```bash
# Change directory to the front-end folder
cd Front-end

# Install dependencies
npm install
```

**Back-end:**

```bash
# Clone the repository
git clone https://github.com/Pouzani/BitVote.git

# Change directory to the back-end folder
cd Back-end

# Build the Docker containers
docker compose build

# Start the Docker containers
docker compose up
```

## Usage

1. Click on the avatar in the bottom of the sidebar to log in/sign up. 
2. Press on the vote button to vote on the crypto-currency. 
3. You can click on the crypto-currency to get more details and look at its chart. 

## How to Run the App

To run the BitVote app, follow these steps:

**1. Start the Back-end (Spring Boot):**

- Open a terminal and navigate to the `Back-end` directory.
- Run the following command to start the Spring Boot application:

```bash
./mvnw spring-boot:run
```

**2. Start the Front-end (Vite, React, TypeScript):**

- Open another terminal and navigate to the `Front-end` directory.
- Install dependencies if you haven't already:

```bash
npm install
```

- Start the development server:

```bash
npm run dev
```

The BitVote app should now be running. You can access it by opening your web browser and navigating to `http://localhost:8000`.

## Forum

Currently working on the UI for the forum page.