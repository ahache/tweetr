/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  function createTweetElement(tweet) {
    let $tweet = $('<article>');

    let $header = $('<header>');

    let $avatarImg = $('<img>').addClass('user-avatar').attr('src', tweet.user.avatars.small);
    let $nameSpan = $('<span>').addClass('user-name').text(tweet.user.name);
    let $handleSpan = $('<span>').addClass('user-handle').text(tweet.user.handle);

    let $content = $('<div>').addClass('content');
    let $text = $('<span>').addClass('text').text(tweet.content.text);

    let $footer = $('<footer>');

    let $timeSpan = $('<span>').addClass('created_at').text(tweet['created_at']);
    let $flag = $('<img>').addClass('flag').attr('src', '../images/flag.png');
    let $retweet = $('<img>').addClass('retweet').attr('src', '../images/retweet.png');
    let $like = $('<img>').addClass('like').attr('src', '../images/like.png');

    $header.append($avatarImg).append($nameSpan).append($handleSpan);
    $content.append($text);
    $footer.append($timeSpan).append($flag).append($retweet).append($like);

    $tweet.append($header).append($content).append($footer);

    return $tweet;
  }

  var tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('#tweet-container').append($tweet);
});