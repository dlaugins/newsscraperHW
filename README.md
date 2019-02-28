# newsscraperHW
# newsscraperHW

What is this repo or project? 

This project scrapes the newsite Huffington Post using . It gives the title with summary, link, and an image from the article on the home page.




How does it work?

THe scraping of the Huffiington post is completed using axios to call the Huffington post backend and then Cheerios to scrape the sight.  The data from the articles is saved in a Mongoose database. The titel/summary, link, optional notes written by the user, and an image from the article are stored in the database. On the home page there are options to clear the articles that have been scraped and scrape the Huffinton Post for articles. Once the articles are listed each article has the option of being saved (which turns the column in the database to true) or deleted(turns the column in the saved part of database to false.) There is also an option to add a note about each article and to save the note to the database.

The index.handlebars and saved.handlebars use express-handlebars to render the data on the screen. Express.js was used to handle my routes. in apiRoutes I used findeone and update, remove, and deletemany.




 There is also a link to go to a page called Saved Articles where the user has the option to add notes about the article or to delete the article. 
Who will use this repo or project?
What is the goal of this project?