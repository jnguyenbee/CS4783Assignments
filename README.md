## Setup
Install NodeJS and extract these files into a folder

## Required packages
[express](https://www.npmjs.com/package/express), [dotenv](https://www.npmjs.com/package/dotenv), [mysql](https://www.npmjs.com/package/mysql), [nodemon](https://www.npmjs.com/package/nodemon)

## Installing packages
Open up bash or powershell on root directory and run this command:
```
npm install express dotenv mysql nodemon
```

## Create environment variables
Create a file called .env in root and fill in the following variables without quotations
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
Pressing ctrl + S will save and restart the server if the script is already running