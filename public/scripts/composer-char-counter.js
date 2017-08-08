$(document).ready(function() {
  $('.new-tweet').find('textarea').on('keyup', function() {
    const charsLeft = 140 - $(this).val().length;
    const counter = $(this).closest('form').find('.counter');
    counter.text(charsLeft);
    if (charsLeft < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});