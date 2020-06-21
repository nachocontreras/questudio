/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
// eslint-disable-next-line prefer-arrow-callback
$(document).ready(function () {
  const selector = $('#selectMediaType');
  if (selector.val() == 1) {
    $('#imageInput').show();
    $('#youtubeInput').hide();
    $('#memeInput').hide();
    $('#youtubeInputAlert').hide();
  } else if (selector.val() == 2) {
    $('#imageInput').hide();
    $('#youtubeInput').show();
    $('#memeInput').hide();
    $('#youtubeInputAlert').show();
  } else if (selector.val() == 3) {
    $('#imageInput').hide();
    $('#youtubeInput').hide();
    $('#memeInput').show();
    $('#youtubeInputAlert').hide();
  }
  selector.change(() => {
    if (selector.val() == 1) {
      $('#imageInput').show();
      $('#youtubeInput').hide();
      $('#memeInput').hide();
      $('#youtubeInputAlert').hide();
    } else if (selector.val() == 2) {
      $('#imageInput').hide();
      $('#youtubeInput').show();
      $('#memeInput').hide();
      $('#youtubeInputAlert').show();
    } else if (selector.val() == 3) {
      $('#imageInput').hide();
      $('#youtubeInput').hide();
      $('#memeInput').show();
      $('#youtubeInputAlert').hide();
    }
  });
});
