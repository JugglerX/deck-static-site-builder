var library = [
  ["hotel","hotel", "https://zilyo.p.mashape.com/search?ids=hma1554297%2Cwts1398%2Cair1836678", "hotel"],
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

  // Load default template
  loadTemplate("hotel","hotel","https://zilyo.p.mashape.com/search?ids=hma1554297%2Cwts1398%2Cair1836678", "hotel")

});


function getMeta(path) {
  var asset = "library/" + path + "/" + path + ".json"
  console.log("Meta Asset: " + asset);
  return $.ajax({
    url: asset,
    type: 'GET', 
    data: {}, 
    dataType: 'json',
    success: function(data) {
    },
    error: function(err) { 
      console.log("-- getMeta AJAX Failure")
    }
  })
}

function getCss(path) {
  var asset = "library/" + path + "/" + path + ".css"
  console.log("CSS Asset: " + asset);
  return $.ajax({
    url: asset,
    success: function(data) {
    },
    error: function(err) { 
      console.log("-- getCss AJAX Failure")
    }
  })
}

function getHtml(path) {
  var asset = "library/" + path + "/" + path + ".html"
  console.log("HTML Asset: " + asset);
  return $.ajax({
    url: asset,
    success: function(data) {
    },
    error: function(err) { 
      console.log("-- getHtml AJAX Failure")
    }
  })
};

function getJson(path) {
  console.log("JSON Asset: " + path);
  return $.ajax({
    url: path,
    type: 'GET', 
    data: {}, 
    dataType: 'json',
    success: function(data) {  
    },
    error: function(err) { 
      console.log("-- getJson() AJAX Failure")
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "0c0ftQWSlxmshp0yAhOSa50Pg7zMp1BBxEDjsnQdZKJcvcX9M0"); 
    }
  })
};

function loadTemplate(htmlPath,cssPath,jsonPath,metaPath) {
  console.log("**** Load Template ****")
  $(".loading").hide();
  $.when(
      getHtml(htmlPath),
      getCss(cssPath),
      getJson(jsonPath),
      getMeta(metaPath),
      loading(true)
    )
    .done(function(html,css,json,meta) { 
      console.log("-- All assets loaded Asynchronously")
      // We actually use the cssPath when we render, but we still check the file exists using an ajax all above
      renderTemplate(html[0],json[0],cssPath,meta[0])
      loading(false)
    })
    .fail(function() {
      console.log("-- loadTemplate() failed - one or more assets was not found")
    });

  function loading(spinner) {
    spinner ? $(".loading").show() : $(".loading").hide();
  }
}

function renderTemplate(html, json, css, meta) {
  console.log("**** Render Template ****")
  template = Handlebars.compile(html,{compat: true});
  $(".deck").html(template(json)); 
  $(".css").attr("href", "library/" + css + "/" + css + ".css");
}

function changeTemplate() {
  $( "#template-selector" ).change(function() {
    var str = [];
    console.log("**** Change Template ****")
    $(this).children("select option:selected").each(function() {
      str = $(this).text().split(',');
      console.log(str)
    });
    loadTemplate(str[0], str[1], str[2]);
  });
};

function changeCss() {
  $( "#css-selector" ).change(function() {
    var str = '';
    $(this).children("select option:selected").each(function() {
      str = $(this).text();
      console.log(str)
    });
    getCss(str);
  });
};

function changeJson() {
  $( "#json-selector" ).change(function() {
    var str = '';
    $(this).children("select option:selected").each(function() {
      str = $(this).text();
      console.log(str)
    })
    getJson(str);
  });
};

function changeHtml() {
  $( "#html-selector" ).change(function() {
    var str = '';
    $(this).children("select option:selected").each(function() {
      str = $(this).text();
      console.log(str)
    });  
    getHtml(str);
  });
};

// Labels
function changeViewMode() {
  $(".label").on("click", function() {

    var viewmode = $(this).html();
    viewmode = viewmode.toLowerCase();
    viewmode = viewmode + ".html"

    var splitPath = globalHtml.split('/');
    delete splitPath[splitPath.length - 1];

    var directory = splitPath.join('/');
    var filename = splitPath[1]

    console.log(splitPath)
    console.log(directory)
    console.log(filename)

    var asset = directory + filename + "-" + viewmode
    console.log(asset)
    
    // Load the HTML
    $.ajax({

      url: asset,
      cache: true,
      success: function(data) {
        source = data;
        template = Handlebars.compile(source,{compat: true});
        console.log(data)
        updateHtmlCodeHighlight(asset);
        $(".deck").html(template(globalJson)); 
        // $(".demo h2.demo-heading").html(path)  
      },
      error: function(err) { 
        console.log(path)
      }
    });
  });
};
