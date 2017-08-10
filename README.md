# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

Using Ajax and jQuery, tweets are dynamically stored and rendered. An Express server connected to MongoDB controls the back end.

Tweets input through the user interface, however the users and user handles are randomly generated using the chance package.

## Final Product

!["Screenshot of Tweeter with the tweet box"](https://github.com/ahache/tweetr/blob/master/docs/tweeter-with-tweetbox.png?raw=true)
!["Screenshot of Tweeter without tweet box"](https://github.com/ahache/tweetr/blob/master/docs/tweeter-without-tweetbox.png?raw=true)
!["Screenshot demonstrating the character input counter"](https://github.com/ahache/tweetr/blob/master/docs/character-counter.png?raw=true)

## Getting Started

1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
3. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chance
- mongodb