document.addEventListener('DOMNodeInserted', (e) => getTweets(document.body));

function getTweets() {
  let tweets = Array.from(document.getElementsByTagName('article'));
  tweets.forEach((tweet) => {
    let found = findText(tweet);

    if (found) {
      tweet.remove();
    }
  })
}

function findText(element) {
  if (element.hasChildNodes()) {
    let find = [];
    element.childNodes.forEach((child) => find.push(findText(child)));
    return find.includes(true);
  } else if (element.nodeType === Text.TEXT_NODE) {
    return element.textContent.match(/Red Bull/gi) ? true : false;
  }

  return false;
}