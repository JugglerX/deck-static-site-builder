
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