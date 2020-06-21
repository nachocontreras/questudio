/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
// eslint-disable-next-line prefer-arrow-callback
$(document).ready(function () {
  const parentDiv = $('.gallery-items');
  var shownImage = 1;
  const finalImage = parentDiv.children().length;
  for( i = 1; i < finalImage; i++) {
    if (i > 1){
      parentDiv.children()[i].hidden = true;
    }
  }
  $('#go-left').click( e => {
    parentDiv.children()[shownImage].hidden = true;
    shownImage--;
    if (shownImage < 1) {
      shownImage = 1;
    }
    if (shownImage > finalImage - 1) {
      shownImage = finalImage - 1;
    }
    parentDiv.children()[shownImage].hidden = false;
    $('#pagination-number').text(shownImage);
  });

  $('#go-right').click( e => {
    parentDiv.children()[shownImage].hidden = true;
    shownImage++;
    if (shownImage < 1) {
      shownImage = 1;
    }
    if (shownImage > finalImage - 1) {
      shownImage = finalImage - 1;
    }
    parentDiv.children()[shownImage].hidden = false;
    $('#pagination-number').text(shownImage);
  });
});
