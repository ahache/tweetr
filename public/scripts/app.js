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
      .done(function(data) {
        renderTweets(data);
      });
  };

  // refactor success/fail
  $('form').on('submit', function() {
    event.preventDefault();
    let input = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: input
    })
      .done(function() {
        $.ajax('/tweets')
          .done(function(data) {
            renderTweets(data.slice(-1));
          });
      });

  });
  loadTweets();
});