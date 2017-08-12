$(document).ready(function() {

  // Tweet generator using template strings
  function createTweetElement(tweet) {

    let handle = tweet.user.handle;
    if (handle[0] !== "@") {
      handle = `@${handle}`;
    }

    // moment.js used for tweet time display
    const $tweet = `
      <article>
        <header>
          <img class="user-avatar" src="${tweet.user.avatars.small}">
          <span class="user-name">${tweet.user.name}</span>
          <span class="user-handle">${handle}</span>
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
  $('.compose-button').on('click', function(event) {
    const newTweet = $('.new-tweet');
    newTweet.slideToggle('fast');
    newTweet.find('textarea').focus();
  });

  // Tweet submit handler
  $('.tweet-form').on('submit', function(event) {
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
            // get /tweets returns {tweets, logged-in boolean}
            renderTweets(data.tweets.slice(-1));
          });
      });
  });

  // Toggle nav bar button visibility
  function toggleNavButtons() {
    $('.compose-button').toggleClass('hidden');
    $('.logout').toggleClass('hidden');
    $('.login').toggleClass('hidden');
    $('.register').toggleClass('hidden');
  }

  // Logout handler
  $('.logout').on('click', function() {
    $.post('/logout')
      .done(() => {
        toggleNavButtons();
        // Slide up tweet box if displayed
        if ($('.new-tweet').css('display') === 'block') {
          $('.new-tweet').slideToggle('fast');
        }
      });
  });

  // Login handler
  $('#login-form').on('submit', function(event) {
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
        toggleNavButtons();

        $('.new-tweet').slideToggle('fast');

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
  $('#register-form').on('submit', function(event) {
    event.preventDefault();

    let userName = $('#register-username').val();

    // Input validation
    if (userName === "") {
      $('#register-button').notify("Must Enter Username");
      return;
    }
    if ($('#register-handle').val() === "") {
      $('#register-button').notify("Must Enter Handle");
      return;
    }

    // Password validation
    const password = $('#register-password').val();
    if(!password.match(/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,})$/)) {
      $('#register-password').notify("Password must be 6 characters minimum, 1 upper, 1 lower and 1 number");
      return;
    }

    let input = $(this).serialize();

    $.post('/register', input)
      .done(() => {
        toggleNavButtons();

        $('.new-tweet').slideToggle();

        $('#register-popup').popup('hide');

        $('.new-tweet-head').notify(`Welcome ${userName}, Start Tweeting!!`, "success");
        $('#register-form')[0].reset();
      })
      .fail((err) => {
        $('#register-button').notify("Username is already registered");
      });
  });

  // Page load / Refresh
  function loadTweets() {

    $.get('/tweets')
      .done((data) => {
        // data contains tweets and logged boolean
        // On refresh, if user is still logged in, display proper buttons
        if (data.logged) {
          toggleNavButtons();
        }
        renderTweets(data.tweets);
      });
  }

  loadTweets();

});