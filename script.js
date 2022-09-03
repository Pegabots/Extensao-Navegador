document.addEventListener('DOMNodeInserted', (e) => getTweets(document.body));
// verifyProfile('blckjzz');

function getTweets() {
  let tweets = Array.from(document.getElementsByTagName('article'));
  tweets.forEach((tweet) => {
    let found = isFromBot(tweet);

    if (found) {
      tweet.remove();
    }
  });
}

function isFromBot(username) {
  // Detect if username is in PegaBot's database.
  
  return false;
}

async function verifyProfile(username) {
  const url = `https://backend.pegabot.com.br/botometer?socialnetwork=twitter&profile=${username}&search_for=profile&limit=1`;
  const pegaBotRequest = new Request(url);
  
  const response = await fetch(pegaBotRequest)
  
  if (!response.ok) {
    throw new Error('HTTP Error!');
  }

  const body = await response.json();
  if (body.profiles.bot_probability > 0.7) {
    console.log('user probably is bot');
    return true;
  } else {
    console.log('user probably isn\'t bot');
    return false;
  }
}