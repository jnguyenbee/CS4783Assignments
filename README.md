## Setup
Install NodeJS and extract these files into a folder

## Required npm packages
[express](https://www.npmjs.com/package/express), [dotenv](https://www.npmjs.com/package/dotenv), [mysql](https://www.npmjs.com/package/mysql), [nodemon](https://www.npmjs.com/package/nodemon), [body-parser](https://www.npmjs.com/package/body-parser), [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc), [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

## Installing packages
Open up your terminal in the root directory and run this command:
```
npm install
```

## Create environment variables
Create a file called .env in the root directory and fill in the following variables without quotations
```
PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
```

## Running server
```
npm run server
```
Pressing Ctrl + S will save and restart the server if the script is already running

## Calling requests
Open up Postman and call the requests
- GET    - localhost:3000/hello
- GET    - localhost:3000/properties
- POST   - localhost:3000/properties/
- GET    - localhost:3000/properties/`<id>`
- DELETE - localhost:3000/properties/`<id>`
- PUT    - localhost:3000/properties/`<id>`