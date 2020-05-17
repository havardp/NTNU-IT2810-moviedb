const mongoose = require('mongoose')
const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemas/schema')

// Cors is required in order to enable cross origin calls
var cors = require('cors')
const app = express();
app.use(cors())

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Register graphql endpoint and related schemas to server
app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }),
  );



const port = process.env.PORT || 5000;
app.listen(port);


console.log('App is listening on port ' + port);

// Connects to db named it2810 with user and password
// Needs to be configured locally in mongoDB.
// executing mongo < database_setup.js, will create the correct user
// 'mongodb://<username>:<password>@<port-db-is-connected-to>/name-of-db>'
mongoose.connect('mongodb://dbAdmin:dbAdmin@localhost:27017/it2810')

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});
