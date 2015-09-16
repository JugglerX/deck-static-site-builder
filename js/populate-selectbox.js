
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
