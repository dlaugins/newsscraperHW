var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
  // Get all examples
  app.get("/api/fetch", function (req, res) {
    db.Article.remove();
    axios.get("https://news.ycombinator.com/").then(function (response) {
      // Load the html body from axios into cheerio
      var $ = cheerio.load(response.data);
      // For each element with a "title" class
      $(".title").each(function (i, element) {
        // Save the text and href of each link enclosed in the current element
        var title = $(element).children("a").text();
        var link = $(element).children("a").attr("href");
      

        // If this found element had both a title and a link
        if (title && link) {
          // Insert the data in the scrapedData db
          db.Article.create({
            title: title,
            link: link,
            summary: "nothing",
            saved: false,
            note: " "
          },
            function (err, inserted) {
              if (err) {
                // Log the error if one is encountered during the query
                console.log(err);
              }
              else {
                // Otherwise, log the inserted data
                console.log(inserted);
              }
            });
        }
      });
      res.send("Scrape Complete")
    });
  });

  app.get("/api/clear", function (req, res) {
    db.Article.deleteMany({}).then(function (clear) {

    })
      .catch(function (err) {
        console.log(err);
      });
    res.send("Clear Complete")
  });

  // Create a new example
  app.put("/api/saved/:id", function (req, res) {
    db.Article.findOneAndUpdate(
      { "_id": req.params.id },
      { saved: true },
      { new: true },
      (err, todo) => {
        // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(todo);
      }
    )

  });

  // app.delete("/api/delete/:id", function (req, res) {
    // db.Article.findOneAndDelete(
    //   { "_id": req.params.id },
    //   { deleted: true },
    //   { new: true },
    //   (err, todo) => {
    //     // Handle any possible database errors
    //     if (err) return res.status(500).send(err);
    //     return res.send(todo);
    //   }
    // )
    app.delete("/api/delete/:id", function(req, res) {
      console.log("*****DELETE NODE on id ", req.params.id);
      db.Article.remove({ "_id": req.params.id },
          (err, todo) => {
              if (err) return res.status(500).send(err);
              return res.send(todo);
          }
      );
  });



  app.put("/api/note/:id", function (req, res) {
    console.log("notecall")
    db.Article.findOneAndUpdate(
      { "_id": req.params.id },
      { note: req.body.note },
      { new: true },
      (err, todo) => {
        // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(todo);
      }
    )

  });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
