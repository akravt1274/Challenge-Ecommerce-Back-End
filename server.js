const express = require('express');
const routes = require('./routes');
// import database connection from config.js
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// sync sequelize models to the database 
sequelize.sync({ force: false }).then(() => {
  console.log('All models were synchronized successfully.');
  // turn on the server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

