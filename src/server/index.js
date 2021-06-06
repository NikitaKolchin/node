//без HOME_DIR в .env бесполезен https://www.npmjs.com/package/rootpath
require("rootpath")();
const express = require("express");
const app = express();
//тоже не нужен, так как все в одном корса нет
const cors = require("cors");
const bodyParser = require("body-parser");
const basicAuth = require("_helpers/basic-auth");
const errorHandler = require("_helpers/error-handler");
const mongoose = require("mongoose");
const config = require("./config");

//mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
mongoose.connect(config.get("cloudConnectionString"), {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('build'));
// use basic HTTP auth to secure the api
app.use(basicAuth);

// api routes
app.use("/users", require("./users/users.controller"));
app.use("/matches", require("./matches/matches.controller"));

// global error handler
app.use(errorHandler);

// start server
//.env - надо завести с NODE_ENV=production на проде работает в разы шустрее
const port =
  process.env.NODE_ENV === "production"
    ? config.get("prodPort")
    : config.get("devPort");
app.listen(port, function () {
  console.log("Server listening on port " + port);
  console.log("process.env.NODE_ENV ", process.env.NODE_ENV);
  console.log("build 210606_gcloud_beckend");
});

// require("rootpath")();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const basicAuth = require("_helpers/basic-auth");
// const errorHandler = require("_helpers/error-handler");
// const mongoose = require("mongoose");
// const config = require("./config");

// //mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
// mongoose.connect(config.get("cloudConnectionString"), {
//   useNewUrlParser: true,
// });
// const db = mongoose.connection;
// db.on("error", (error) => console.log(error));
// db.once("open", () => console.log("connection to db established"));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// // use basic HTTP auth to secure the api
// app.use(basicAuth);

// // api routes
// app.use("/users", require("./users/users.controller"));
// app.use("/matches", require("./matches/matches.controller"));

// // global error handler
// app.use(errorHandler);

// // start server
// const port =
//   process.env.NODE_ENV === "production"
//     ? config.get("prodPort")
//     : config.get("devPort");
// const server = app.listen(port, function () {
//   console.log("Server listening on port " + port);
//   console.log("process.env.NODE_ENV ", process.env.NODE_ENV);
//   console.log("mongodb ", config.get("localConnectionString"));
// });
