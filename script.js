// const bots = await getKnownBots();
const bots = ['@jovemnerd', '@azaghal'];

const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(getTweets);

observer.observe(document, config);
// verifyProfile('blckjzz');

/**
 * Iterate over tweets on HTML and remove them from the page if they are from
 * a known bot account.
 */
function getTweets() {
  let tweets = Array.from(document.getElementsByTagName('article'));
  tweets.forEach((tweet) => {
    let found = isFromBot(tweet);

    if (found) {      
      tweet.remove();
      console.log('removing tweet');
    }
  });
}

/** 
 * Calls the API to get all stored bots on DB
 * 
 * @return array with all bots handles
 */
async function getKnownBots() {
  // Here, we consider that there is an API call to get known bots from DB
  const url = 'https://backend.pegabot.com.br/url-to-required-function';
  const response = await apiGet(url);
  return response.handles;
}

/**
 * Determines if the tweet is from a bot, doing so by selecting the @ that tweeted
 * and if it is inside the bots array, answers yes.
 * 
 * @param tweet the HTML element that contains the tweet 
 * @returns true or false, if the tweet should be removed
 */
function isFromBot(tweet) {
  const elements = Array.from(tweet.querySelectorAll('.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0'));
  let isBot = false;
  let username;

  elements.forEach((element) => {
    const elementText = element.textContent;

    if (elementText.match(/@.+/gm)) {
      username = elementText;

      if (bots.includes(username)) {
        isBot = true;
      }
    }
  });

  return (username && isBot);
}
