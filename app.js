// Define available Library items. Eventually this will be created based on scanning the /library/ folder structure (using node FS)
var library = [
  ["airbnb","https://zilyo.p.mashape.com/id?id=air3962084"],
  ["issue","http://localhost:3000/api/issues/1"]
];

var globalJson = {};
var globalHtml = {};

// Boot the App
jQuery(document).ready(function($) {

  // Populate the select boxes from the library array
  populateTemplateSelectBox(library)
  populateHtmlSelectBox(library)
  populateCssSelectBox(library);
  populateJsonSelectBox(library);

  // Load a default template
  loadTemplate("hotel","https://zilyo.p.mashape.com/id?id=air3962084")

  // Hook on change events
  changeTemplate();
  changeCss();
  changeJson();
  changeHtml();

});


// Handlebars.registerHelper('helperMissing', function(/* [args, ] options */) {
//     var options = arguments[arguments.length - 1];
//     return 'MISSING VALUE: ' + options.name;
// });  

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  throw new Handlebars.Exception('Only if or each is allowed');
});

Handlebars.registerHelper("nullValue", function(val) {
    if(val === undefined) {
        return "{{" + val + "}}";
    }
    return val;
});

function loadTemplate(template, url) {
  console.log("Load Template")
  getJson(url);
  getHtml(template);
  getCss(template); 
}

function getHtml(path) {
  var asset = "library/" + path + "/" + path + ".html"
  console.log("HTML Asset: " + asset);
  $.ajax({
    url: asset,
    cache: true,
    success: function(data) {
      source = data;
      template = Handlebars.compile(source,{compat: true});
      
      updateHtmlCodeHighlight(asset);
      console.log(globalJson)
      $(".deck").html(template(globalJson)); 
      $(".demo h2.demo-heading").html(path)  
    },
    error: function(err) { 
      console.log(path)
    }
  });
};

function getCss(path) {
  var asset = "library/" + path + "/" + path + ".css"
  console.log("CSS Asset: " + asset);
  $("#template-css").attr("href", asset);

  updateCssCodeHighlight(asset);
};

function getJson(path) {
  console.log("JSON Asset: " + path);
  var request = $.ajax({
    url: path,
    type: 'GET', 
    data: {}, 
    dataType: 'json',
    success: function(data) { 
      globalJson = data
      updateJsonCodeHighlight(data);
      $(".deck").html(template(data));  
    },
    error: function(err) { 
      console.log(path)
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "0c0ftQWSlxmshp0yAhOSa50Pg7zMp1BBxEDjsnQdZKJcvcX9M0"); 
    }
  })
};

function changeTemplate() {
  $( "#template-selector" ).change(function() {
    var str = [];
    console.log("**** Change Template ****")
    $(this).children("select option:selected").each(function() {
      str = $(this).text().split(',');
      console.log(str)
    });
    loadTemplate(str[0], str[1]);
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

// Populate Select Boxes
function populateTemplateSelectBox(array) {
  var option = '';
  for (var i=0;i<array.length;i++){
     option += '<option value="'+ array[i] + '">' + array[i] + '</option>';
  }
  $('#template-selector').append(option);
}

function populateHtmlSelectBox(array) {
  option = '';
  for (var i=0;i<array.length;i++){
     option += '<option value="'+ array[i][0] + '">' + array[i][0] + '</option>';
  }
  $('#html-selector').append(option);
}

function populateCssSelectBox(array) {
  option = '';
  for (var i=0;i<array.length;i++){
     option += '<option value="'+ array[i][0] + '">' + array[i][0] + '</option>';
  }
  $('#css-selector').append(option);
}

function populateJsonSelectBox(array) {
  option = '';
  for (var i=0;i<array.length;i++){
     option += '<option value="'+ array[i][1] + '">' + array[i][1] + '</option>';
  }
  $('#json-selector').append(option);
}

// Update code highlight boxes on the DOM
function updateJsonCodeHighlight(data) {
  $(".json code").html(JSON.stringify(data, null, 2));
  Prism.highlightElement($('.json code')[0]);
}

function updateCssCodeHighlight(data) {
  $(".css pre").attr('data-src', data);
  Prism.fileHighlight();
}

function updateHtmlCodeHighlight(data) {
  $(".html pre").attr('data-src', data);
  Prism.fileHighlight();
}

