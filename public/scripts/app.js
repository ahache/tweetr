$(document).ready(function() {

  // HTML generator using template strings
  function createTweetElement(tweet) {

    const $tweet = `
      <article>
        <header>
          <img class="user-avatar" src="${tweet.user.avatars.small}">
          <span class="user-name">${tweet.user.name}</span>
          <span class="user-handle">${tweet.user.handle}</span>
        </header>
        <div class="content">
          <span class="text">${tweet.content.text}</span>
        </div>
        <footer>
          <span class="created_at">${moment(tweet['created_at']).fromNow()}</span>
          <img class="flag" src="../images/flag.png" alt="Report">
          <img class="retweet" src="../images/retweet.png" alt="Retweet">
          <img class="like" src="../images/like.png" alt="Like">
        </footer>
      </article>
    `;
    return $tweet;
  }

  // Add new tweet/s to top of container
  function renderTweets(tweets) {
    for (const tweet of tweets) {
      $('#tweet-container').prepend(createTweetElement(tweet));
    }
  }

  // Compose button handler, slides tweet box up and down
  $('.compose-button').on('click', function() {
    const newTweet = $('.new-tweet');
    newTweet.slideToggle('slow');
    newTweet.find('textarea').focus();
  });

  // Tweet submit handler
  $('.tweet-form').on('submit', function() {
    event.preventDefault();

    // input validation, using notify.js for bad input
    let length = $(this).find('textarea').val().length;
    if (length === 0) {
      $('input').notify("Your tweet is empty!");
      return;
    }
    if (length > 140) {
      $('input').notify("Your tweet is too long!");
      return;
    }

    let input = $(this).serialize();

    // Reset form after successful submit
    $(this).find('textarea').val("");
    $(this).find('.counter').text('140');

    // Send new tweet to server, get back all tweet data and prepend the new item
    $.post('/tweets', input)
      .done(() => {
        $.get('/tweets')
          .done((data) => {
            // Send only the newest item of the return array to be rendered
            renderTweets(data.slice(-1));
          });
      });
  });

  // Logout handler
  $('.logout').on('click', function() {
    // post to server to clear cookie
    $.post('/logout')
      .done(() => {
        $('.compose-button').addClass('hidden');
        $('.logout').addClass('hidden');
        $('.new-tweet').slideToggle('slow'); //a asdfasdfasdfsd
        $('.login').removeClass('hidden');
        $('.register').removeClass('hidden');
      });
  });

  // Login handler
  $('#login-form').on('submit', function() {
    event.preventDefault();

    // Input validation
    if ($('#login-username').val() === "") {
      $('#login-button').notify("Must Enter Username");
      return;
    }
    if ($('#login-password').val() === "") {
      $('#login-button').notify("Must Enter Password");
      return;
    }

    let input = $(this).serialize();

    $.post('/login', input)
      .done((res) => {
        // put notification on compose button after it appears
        $('.login').addClass('hidden');
        $('.register').addClass('hidden');
        $('.new-tweet').removeClass('hidden');
        $('.logout').removeClass('hidden');
        $('.compose-button').removeClass('hidden');
        $('.compose-button').notify(`Logged in as ${res.user}, @${res.handle}`, 'success');

        $('#login-form')[0].reset();
        $('#login-popup').popup('hide');
      })
      .fail((err) => {
        if (err.status === 400) {
          $('#login-button').notify("Cannot find user");
        }
        if (err.status === 401) {
          $('#login-button').notify("Wrong password");
        }
      });
  });

  // Registration input handler
  $('#register-form').on('submit', function() {
    event.preventDefault();

    let handleInput = $('#register-handle').val();

    // Input validation
    if ($('#register-username').val() === "") {
      $('#register-button').notify("Must Enter Username");
      return;
    }
    if (handleInput === "") {
      $('#register-button').notify("Must Enter Handle");
      return;
    }
    if (handleInput[0] !== "@") {
      handleInput = "@" + handleInput;
     }


    const password = $('#register-password').val();
    if(!password.match(/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,})$/)) {
      $('#register-password').notify("Password must be 6 characters minimum, 1 upper, 1 lower and 1 number");
      return;
    }

    let input = $(this).serialize();

    $.post('/register', input)
      .done(() => {
        $('.login').addClass('hidden');
        $('.register').addClass('hidden');
        $('.new-tweet').removeClass('hidden');
        $('.compose-button').removeClass('hidden');
        $('.logout').removeClass('hidden');

        $('#register-popup').popup('hide');

        $('.new-tweet-head').notify("Successfully Registered, Start Tweeting!!", "success");
        $('#register-form')[0].reset();
      })
      .fail((err) => {
        // customize some error codes
        $('#register-button').notify("Username is already registered");
      });

  });

  // Initial load when user first accesses app
  function loadTweets() {
    $.ajax('/tweets')
      .done((data) => {
        renderTweets(data);
      });
  }

  loadTweets();

});