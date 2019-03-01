# newsscraperHW

What is this repo or project? 

This project scrapes the newsite Huffington Post. It gives the title with summary, link, and an image from the article on the home page.

How does it work?

THe scraping of the Huffiington post is completed using axios to call the Huffington post website and then Cheerios is used to search through the site.  The data from the articles is saved in a Mongo database. The title/summary, link, optional notes written by the user, and an image from the article are stored in the database. On the home page there are options to clear the articles that have been scraped. Once the articles are listed each article has the option of being saved (which turns the column in the database to true) or deleted(turns the column in the saved part of database to false.) There is also an option to add a note about each article and to save the note to the database.

The index.handlebars and saved.handlebars use express-handlebars to render the data on the screen. Express.js was used to handle the routes. In apiRoutes I used findeone and update, remove, and deletemany.

 There is also a link to go to a page called Saved Articles where the user has the option to add notes about the article or to delete the article. 
Who will use this repo or project?
It will be used by me for now to keep track of interesting articles.
What is the goal of this project?
I was able to learn all the technologies used in this project.