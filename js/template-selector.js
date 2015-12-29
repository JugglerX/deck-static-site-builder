// Change Template
function changeTemplate() {
  $( "#template-selector" ).change(function() {
    var str = [];
    console.log("**** Change Template ****")
    $(this).children("select option:selected").each(function() {
      str = $(this).val().split(',');
      console.log(str)
    });
    loadTemplate(str[0], str[1], str[2], str[3], str[4]);
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

// Change Viewmode
function changeViewMode() {
  $(".label").on("click", function() {

    var viewmode = $(this).html().toLowerCase()
    console.log("**** Switching Viewmode ****")
    console.log("Viewmode: " + viewmode)

    var str = [];
    $( "#template-selector" ).children("select option:selected").each(function() {
      str = $(this).val().split(',');
    });

    loadTemplate(
      str[0], 
      str[0] + "-" + viewmode + ".html", 
      str[0] + "-" + viewmode + ".css",
      str[3], 
      str[4]
    );
  });
};