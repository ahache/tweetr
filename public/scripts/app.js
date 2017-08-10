$(document).ready(function() {

  // HTML generator using template string
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

  // Initial load when user first accesses app
  function loadTweets() {
    $.ajax('/tweets')
      .done((data) => {
        renderTweets(data);
      });
  }

  // Compose button handler, slides tweet box up and down
  $('.compose-button').on('click', function() {
    const newTweet = $('.new-tweet');
    newTweet.slideToggle('slow');
    newTweet.find('textarea').focus();
  });

  // Tweet submit handler
  $('form').on('submit', function() {
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

  // Display all existing tweets on page load
  loadTweets();

});