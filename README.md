# finances-tracker
![finances-tracker](https://user-images.githubusercontent.com/42900752/136457105-4b81533d-faf7-4d7f-a16e-cd9e1d68f6bc.png)

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

If you have PostgreSQL installed, you'll need to configure your `.env` file so that `pg` can connect to your database (see `server/db/index.js`).  Refer to `.env example` for the appropriate variable names.

## Contributing

Although this project was built primary for personal and educational purposes, suggestions, issues, and contributions are welcome!

```
1. Create an issue
2. Fork the repo
3. Create a branch
4. Make your changes
5. Commit changes
6. Make a pull request
```

## Built With

* [React.js](https://reactjs.org/)
* [Chart.js](https://www.chartjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)

## License

This project is licensed under the MIT License Copyright (c) 2021.

See LICENSE for more info.
