var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // Find all Notes
    db.Article.find({})
      .then(function (dbArticle) {
        // If all Notes are successfully found, send them back to the client
        res.render("index", {
          Article: dbArticle
        });
      })
      .catch(function (err) {
        // If an error occurs, send the error back to the client
        res.json(err);
      });
  });

  app.get("/saved", function (req, res) {
    // Find all Notes
    db.Article.find({})
      .then(function (dbArticle) {
        // If all Notes are successfully found, send them back to the client
        res.render("saved", {
          Article: dbArticle
        });
      })
      .catch(function (err) {
        // If an error occurs, send the error back to the client
        res.json(err);
      });
  });



  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
