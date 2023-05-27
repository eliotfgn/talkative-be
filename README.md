# Talkative

This is the REST API for a forum application with Express, Typescript, PrismaORM.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Postman](https://www.postman.com/)

### Installation

1. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

2. Create a `.env` file in the root directory and add the corresponding environment variables from `.env.example`:

```bash
cp .env.example .env
```

3. Create a PostgreSQL database named `talkative` and run the migrations

```bash
yarn db:push
```

4. Then start the project in development environment:

````bash
yarn dev
````

5. To build and run the project in prod environment:

````bash
yarn start
````
