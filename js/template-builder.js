function loadTemplate(template) {
  console.log("**** Load Template ****")
  $(".loading").hide();
  $.when(
      getHtml(template),
      getCssPath(template),
      // getJson("https://zilyo.p.mashape.com/search?ids=hma1554297%2Cwts1398%2Cair1836678"),
      getJsonFile(template),
      loading(true)
    )
    .done(function(html,css,json) { 
        handlebarsTemplate = Handlebars.compile(html[0],{compat: true});
        $(".deck").html(handlebarsTemplate(json[0])); 
        $(".css").attr("href", css);
        loading(false);
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

function getCss(template) {
  if (template.cssPath === undefined) {
    var path = "library/" + template.templateDirectory + "/" + template.templateName + ".css";
  } else {
    var path = "library/" + template.templateDirectory + "/" + cssPath;
  }
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

function getCssPath(template) {
  if (template.cssPath === undefined) {
    var path = "library/" + template.templateDirectory + "/" + template.templateName + ".css";
    console.log("CSS Asset: " + path);
    return path;
  } else {
    var path = "library/" + template.templateDirectory + "/" + cssPath;
    console.log("CSS Asset: " + path);
    return path;
  }
}

function getHtml(template) {
  if (template.templateHtmlPath === undefined) {
    var path = "library/" + template.templateDirectory + "/" + template.templateName + ".html";
  } else {
    var path = "library/" + template.templateDirectory + "/" + template.templateHtmlPath;
  }
  console.log("HTML Asset: " + path);
  return $.ajax({
    url: path,
    success: function(data) {     
    },
    error: function(err) { 
      console.log("-- getHtml() AJAX File Failure")
    }
  })
};

function getJsonFile(template) {
  if (template.jsonPath === undefined) {
    var path = "library/" + template.templateDirectory + "/" + template.templateDirectory + ".json";
  } else {
    var path = "library/" + template.templateDirectory + "/" + jsonPath;
  }
  console.log("JSON File Asset: " + path);
  return $.ajax({
    url: path,
    type: 'GET', 
    data: {}, 
    dataType: 'json',
    success: function(data) {     
    },
    error: function(err) { 
      console.log("-- getJsonFile() AJAX File Failure")
    }
  })
};

function getJson(url) {
  var path = url
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


