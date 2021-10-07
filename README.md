# finances-tracker

Full-stack budgeting app that allows a user to log their transactions (income and expenses) and see them represented visually in interactive charts.  You can try it out at [dollarsdollarsdollars.club](https://dollarsdollarsdollars.club). 

## Getting Started

1. git clone this repo and navigate to the directory
2. install dependencies: `npm install`
3. navigate into the `client` directory and install dependencies: `npm install`
4. start up the front-end application: `yarn start`
5. open another terminal, navigate into the `server` directory, and start up the server: `npm run server`
6. open http://localhost:3000 in your browser

## Developing with the database

In order to run the full version of this project, you must have PostgreSQL installed on your system.  Installing and configuring PostgreSQL is beyond the scope of this README, but help and documentation can be found [here](https://postgresql.org).

If you have PostgreSQL installed, you'll need to configure the `/server/db/index.js` file with your settings.

## Built With

* [React.js](https://reactjs.org/)
* [Chart.js](https://www.chartjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)
