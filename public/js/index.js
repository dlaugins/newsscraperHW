/* global bootbox */
$(document).ready(function() {
  // Setting a reference to the article-container div where all the dynamic content will go
  // Adding event listeners to any dynamically generated "save article"
  // and "scrape new article" buttons
  $(document).on("click", ".btn.save", saveArticle);
  $(document).on("click", ".scrape-new", scrapeArticle);
  $(document).on("click", ".clear", clearArticle);
  $(document).on("click", ".note", saveNote);
  $(document).on("click", ".delete", deleteArticle )

  function initPage() {
    // Run an AJAX request for any unsaved headlines
    $.get("/").then(function(data) { });
  }

  

  

    
  
  

  function saveArticle() {
  
    // This function is triggered when the user wants to save an article
    // When we rendered the article initially, we attached a javascript object containing the headline id
    // to the element using the .data method. Here we retrieve that.
    event.preventDefault();
       var articleToSave = $(this).attr('data')
    // articleToSave.saved = true;
    // Using a patch method to be semantic since this is an update to an existing record in our collection
    $.ajax({
      method: "PUT",
      url: "/api/saved/" + articleToSave
    }).then(function(data) {
    //   // If the data was saved successfully
      location.reload();
    });
  }
  function deleteArticle() {
 
  
    event.preventDefault();
       var articleToDelete = $(this).attr('data')
    
    // Using a patch method to be semantic since this is an update to an existing record in our collection
    $.ajax({
      method: "DELETE",
      url: "/api/delete/" + articleToDelete
    }).then(function(data) {
    //   // If the data was saved successfully
      location.reload();
    });
  }


  function saveNote() {
   console.log("called note")
  
    // This function is triggered when the user wants to save an article
    // When we rendered the article initially, we attached a javascript object containing the headline id
    // to the element using the .data method. Here we retrieve that.
    event.preventDefault();
       var id = $(this).attr('data')
       var noteId = "#note" + id;
       var noteVal = $(noteId).val();
      
       var noteData = { "note": noteVal };
     
      
    
    
    $.ajax({
      method: "PUT",
      url: "/api/note/" + id,
      data: noteData
    }).then(function(data) {
    // // // //   // If the data was saved successfully
      location.reload();
    });
  }

  function scrapeArticle() {
    event.preventDefault();
    
    $.get("/api/fetch").then(function(data) {
     
      location.reload();
    });
  }

  function clearArticle() {
    event.preventDefault();
    $.get("/api/clear").then(function(data) {    
      location.reload();
    });
  }
});