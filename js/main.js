var library = [
  ["hotel","hotel-teaser.html", "hotel-teaser.css", "https://zilyo.p.mashape.com/search?ids=hma1554297%2Cwts1398%2Cair1836678", "hotel.json"],
  ["hotel","hotel-full.html", "hotel-full.css", "https://zilyo.p.mashape.com/search?ids=hma1554297%2Cwts1398%2Cair1836678", "hotel.json"],
  ["issue","issue", "http://localhost:3000/api/issues/1"]
];

// Boot the App
jQuery(document).ready(function($) {

  // Populate select boxes from the library array
  populateTemplateSelectBox(library)
  populateHtmlSelectBox(library)
  populateCssSelectBox(library);
  populateJsonSelectBox(library);

  // Enable select box on change events
  changeTemplate();
  changeCss();
  changeJson();
  changeHtml();
  changeViewMode();

  var pathname = window.location.pathname; // Returns path only
  console.log(pathname)
  // Load default template
  loadTemplate("hotel","hotel-teaser.html","hotel-teaser.css","https://zilyo.p.mashape.com/search?ids=hma1554297%2Cwts1398%2Cair1836678", "hotel.json")

});



