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
2. Create a `.env` file in the root directory and add the following environment variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=username
DB_PASSWORD=password
DB_NAME=talkative
```
3. Create a PostgreSQL database named `talkative` and run the migrations
```bash
npx prisma migrate dev --name init
```