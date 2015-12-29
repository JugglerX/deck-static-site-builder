function loadTemplate(templateName, htmlPath, cssPath, jsonPath, metaPath) {
  console.log("**** Load Template ****")
  $(".loading").hide();
  $.when(
      getHtml(templateName, htmlPath),
      getCss(templateName, cssPath),
      getJson(templateName, jsonPath),
      // getMeta(templateName, metaPath),
      loading(true)
    )
    .done(function(html,css,json,meta) { 
      console.log("-- All assets loaded Asynchronously")
      // We actually use the cssPath when we render, but we still check the file exists using an ajax all above
      renderTemplate(templateName, html[0],json[0],cssPath)
      $(".demo-heading").html(htmlPath)
      loading(false)
    })
    .fail(function() {
      console.log("-- loadTemplate() failed - one or more assets was not found")
      loading(false)
      $(".error").html("loadTemplate() failed - one or more assets was not found")
    });

  function loading(spinner) {
    $(".error").html("")
    spinner ? $(".loading").show() : $(".loading").hide();
  }
}

function renderTemplate(templateName, html, json, css, meta) {
  console.log("-- Rendering template: " + templateName)
  template = Handlebars.compile(html,{compat: true});
  $(".deck").html(template(json)); 
  $(".css").attr("href", "library/" + templateName + "/" + css);
}

// Async Calls to get Assets
function getMeta(templateName, metaPath) {
  var path = "library/" + templateName + "/" + metaPath
  console.log("Meta Asset: " + path);
  return $.ajax({
    url: path,
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

function getCss(templateName, cssPath) {
  var path = "library/" + templateName + "/" + cssPath
  console.log("CSS Asset: " + path);
  return $.ajax({
    url: path,
    success: function(data) {
    },
    error: function(err) { 
      console.log("-- getCss AJAX Failure")
    }
  })
}

function getHtml(templateName, htmlPath) {
  var path = "library/" + templateName + "/" + htmlPath
  console.log("HTML Asset: " + path);
  return $.ajax({
    url: path,
    success: function(data) {
    },
    error: function(err) { 
      console.log("-- getHtml AJAX Failure")
    }
  })
};

function getJson(templateName, jsonPath) {
  var path = jsonPath
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


