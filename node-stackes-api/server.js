require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const basicAuth = require('_helpers/basic-auth');
const errorHandler = require('_helpers/error-handler');
const mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
mongoose.connect("mongodb+srv://nikitos:qwasdx=1@cloudcluster-yl09g.gcp.mongodb.net/test", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use basic HTTP auth to secure the api
app.use(basicAuth);

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/stakes', require('./stakes/stakes.controller'))

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
