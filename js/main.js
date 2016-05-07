// Seed inital template
templateOptions = {
  templateDirectory: "hotel",
  templateName: "hotel-teaser",
  templateHtmlPath: "hotel-teaser.html"
}

// Boot the App
jQuery(document).ready(function($) {

  // Enable select box on change events
  // changeTemplateSelectBox();
  // changeCss();
  // changeJson();
  // changeHtml();
  // changeViewMode();

  var pathname = window.location.pathname; // Returns path only
  console.log(pathname);

  // Load default template
  loadTemplate(templateOptions);
  changeTemplateBulletList();
});
