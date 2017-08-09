$(document).ready(function() {

  const data = [
    {
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
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ]

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
      $('#tweet-container').append(createTweetElement(tweet));
    }
  }

  renderTweets(data);

});