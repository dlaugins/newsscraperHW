var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
 
  app.get("/api/fetch", function (req, res) {
    db.Article.remove();
    axios.get("https://www.huffingtonpost.com/").then(function (response) {
      var $ = cheerio.load(response.data);

      console.log("*****add to database");

      $(".card").each(function (i, element) {
        console.log("*******element");
        var result = {};
        result.title = $(element).children().text();
        console.log("TITLE", result.title);
        result.link = $(element).find("a").attr("href");
        console.log("LINK", result.link)
        result.saved = false;
        result.note = " ";
        result.image = $(element).find("img").attr("src");
        console.log(result.image);
        if (result.link && result.title) {
          db.Article.create(result)
            .then(function (dbArticle) { })
            .catch(function (err) {
              console.log(err);
            });
        }

      });
      console.log("*****Database complete")
      res.send("Scrape Complete");
    });

  });

  app.get("/api/clear", function (req, res) {
    db.Article.deleteMany({saved:false}).then(function (clear) {

    })
      .catch(function (err) {
        console.log(err);
      });
    res.send("Clear Complete")
  });

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


  app.delete("/api/delete/:id", function (req, res) {
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


};
