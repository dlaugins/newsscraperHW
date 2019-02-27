

var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
   "handlebars",
   exphbs({
       defaultLayout: "main"
   })
);
app.set("view engine", "handlebars");
// Connect to the Mongo DB

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsie";

mongoose.connect(MONGODB_URI);


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
   syncOptions.force = true;
}
// Start the server
app.listen(PORT, function() {
   console.log("App running on port " + PORT + "!");
});


module.exports = app;