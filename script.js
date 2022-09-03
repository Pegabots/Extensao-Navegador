// const bots = await getKnownBots();
const bots = ['@jovemnerd', '@azaghal'];

document.addEventListener('DOMNodeInserted', (e) => getTweets(document.body));
// verifyProfile('blckjzz');

function getTweets() {
  let tweets = Array.from(document.getElementsByTagName('article'));
  tweets.forEach((tweet) => {
    let found = isFromBot(tweet);

    if (found) {
      console.log('removing tweet');
      tweet.remove();
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

function isFromBot(tweet) {
  const elements = Array.from(tweet.querySelectorAll('.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0'));
  let username;

  elements.forEach((element) => {
    const elementText = element.textContent;

    if (elementText.match(/@.+/gm)) {
      username = elementText;
    }
  });

  if (!username) return false;
  if (bots.includes(username)) return true;
  return false;
}

async function verifyProfile(username) {
  const url = `https://backend.pegabot.com.br/botometer?socialnetwork=twitter&profile=${username}&search_for=profile&limit=1`;
  const response = await apiGet(url);

  if (response.profiles.bot_probability > 0.7) {
    console.log('user probably is bot');
    return true;
  } else {
    console.log('user probably isn\'t bot');
    return false;
  }
}

async function apiGet(url) {
  const pegaBotRequest = new Request(url);
  
  const response = await fetch(pegaBotRequest)
  
  if (!response.ok) {
    throw new Error('HTTP Error!');
  }

  return await response.json();
}
