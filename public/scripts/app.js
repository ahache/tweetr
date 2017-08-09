$(document).ready(function() {

  function constructHeader(user) {
    let $header = $('<header>');

    let $avatarImg = $('<img>').addClass('user-avatar').attr('src', user.avatars.small);
    let $nameSpan = $('<span>').addClass('user-name').text(user.name);
    let $handleSpan = $('<span>').addClass('user-handle').text(user.handle);

    $header.append($avatarImg).append($nameSpan).append($handleSpan);

    return $header;
  }

  function constructContent(content) {
    let $content = $('<div>').addClass('content');
    let $text = $('<span>').addClass('text').text(content.text);

    $content.append($text);

    return $content;
  }

  function constructFooter(date) {
    let $footer = $('<footer>');

    let $timeSpan = $('<span>').addClass('created_at').text(date);
    let $flag = $('<img>').addClass('flag').attr('src', '../images/flag.png');
    let $retweet = $('<img>').addClass('retweet').attr('src', '../images/retweet.png');
    let $like = $('<img>').addClass('like').attr('src', '../images/like.png');

    $footer.append($timeSpan).append($flag).append($retweet).append($like);

    return $footer;
  }

  function createTweetElement(tweet) {
    let $tweet = $('<article>');

    $tweet.append(constructHeader(tweet.user));
    $tweet.append(constructContent(tweet.content));
    $tweet.append(constructFooter(tweet['created_at']));

    return $tweet;
  }

  function renderTweets(tweets) {
    for (const tweet of tweets) {
      $('#tweet-container').prepend(createTweetElement(tweet));
    }
  }

  function loadTweets() {
    $.ajax('/tweets')
      .done((data) => {
        renderTweets(data);
      });
  };

  // Compose button handler
  // Should make .new-tweet section fade out and in on click ... toggle
  // After fade in focus should be on textarea
  $('.compose-button').on('click', function() {
    const newTweet = $('.new-tweet');
    newTweet.slideToggle('slow');
    newTweet.find('textarea').focus();
  });

  // Tweet submit handler
  $('form').on('submit', function() {
    event.preventDefault();

    // input validation
    let length = $(this).find('textarea').val().length;

    // Refactor to display pop up prompt by form
    if (length === 0) {
      alert("Enter something!!");
      return;
    }
    if (length > 140) {
      alert("Too long! Cut it down..");
      return;
    }

    let input = $(this).serialize();

    // Send new tweet to server, get back all tweet data and prepend the new item
    $.post('/tweets', input)
      .done(() => {
        $.get('/tweets')
          .done((data) => {
            renderTweets(data.slice(-1));
          });
      });
  });

  // Display all existing tweets on page load
  loadTweets();

});