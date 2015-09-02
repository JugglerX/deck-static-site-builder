jQuery(document).ready(function($) {
  $(".colorblue").click(function(){
    getCSS('blue')
    return false;
  })

  getTemplate("hotel");
  getCSS("hotel");
  getJson();

  $( ".template-selector" ).change(function() {
    var str = "";
    $( "select option:selected" ).each(function() {
      str = $(this).text();
    });
    console.log(str)
    loadTemplate(str);
  });
});

Handlebars.registerHelper('helperMissing', function(/* [args, ] options */) {
    var options = arguments[arguments.length - 1];
    return 'MISSING VALUE: ' + options.name;
});    

function getTemplate(path) {
  var asset = "library/" + path + "/" + path + ".html"
  console.log(asset);

  $.ajax({
    url: asset,
    cache: true,
    success: function(data) {
    	console.log(data)
      source = data;
      template = Handlebars.compile(source);
    }
  });
};

function getCSS(path) {
  var asset = "library/" + path + "/" + path + ".css"
  console.log(asset);

  $("#template-css").attr("href", asset);
  updateCssCodeHighlight(asset);
};

function getJson() {
  var request = $.ajax({
    url: "https://zilyo.p.mashape.com/id?id=air3962084",
    type: 'GET', 
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) { 
      console.log(data);
      updateJsonCodeHighlight(data);
      $(".deck").html(template(data));   
      for (i in data) {
        console.log(i)
      }
    },
    error: function(err) { 
      alert(err); 
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "0c0ftQWSlxmshp0yAhOSa50Pg7zMp1BBxEDjsnQdZKJcvcX9M0"); 
    }
  })
};

function updateJsonCodeHighlight(data) {
  $(".json code").html(JSON.stringify(data, null, 2));
  Prism.highlightElement($('.json code')[0]);
}

function updateCssCodeHighlight(data) {
  $(".css pre").attr('data-src', data);
  Prism.fileHighlight();
}

function loadTemplate(template) {
  getTemplate(template);
  getCSS(template);
  getJson()
}

