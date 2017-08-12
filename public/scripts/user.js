$(document).ready(function() {
  $('#login-popup').popup({
    color: '#eafbfd',
    opacity: 0.9,
    transition: '0.6s'
  });

  $('#register-popup').popup({
    color: '#eafbfd',
    opacity: 0.9,
    transition: '0.6s'
  });

  // Create click handler for user button to test popup
  $('.login').on('click', function() {
    $('#login-popup').popup('show');
  });

  $('.register').on('click', function() {
    $('#register-popup').popup('show');
  });

});