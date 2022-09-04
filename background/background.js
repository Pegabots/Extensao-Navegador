import { apiGet } from '../tools.js';

let contextMenuItem = {
  'id': 'pegaBot',
  'title': 'Verificar perfil',
  'contexts': ['link'],
};

/**
 * Triggered by every click on a context menu, this function deals with the
 * clicks on the BotBlock menu and try to verify the Twitter handle, showing
 * the results to the user through script injection. 
 * 
 * @param info the context that was clicked
 * @param tab the current active tab
 * @returns void
 */
async function onClickFunction(info, tab) {
  if (info.menuItemId !== contextMenuItem.id) {
      return;
  }

  // Clicked link must be like: https://twitter.com/*, where * is the username
  const regex = new RegExp(/^https:\/\/twitter\.com\/([^\/]+)\/?.*$/gi);
  const match = regex.exec(info.linkUrl);

  if (match && match[1]) { // assuring it found a remembered group in the url
    const twitterHandle = '@' + match[1];

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: createModalBase
    });
    
    const isBot = await verifyProfile(twitterHandle);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showResults,
      args: [twitterHandle, isBot]
    });
  }
}

/**
 * Given a username, makes a request to the PegaBot's API to assert if it is or
 * not from a bot.
 * 
 * @param username the suspect's twitter handle 
 * @returns a boolean value, representing if it is a bot
 */
async function verifyProfile(username) {
  const url = `https://backend.pegabot.com.br/botometer?socialnetwork=twitter&profile=${username}&search_for=profile&limit=1`;
  const response = await apiGet(url);
  const bot_probability_threshold = 0.7;

  if (response.profiles[0].bot_probability.all > bot_probability_threshold) {
      console.log(`user ${username} probably is bot`);
      return true;
  } else {
      console.log(`user ${username} probably isn't bot`);
      return false;
  }
}

/**
 * This is far from perfect, but it was the best solution to the problem of
 * creating a modal so the user could receive the answer to its request about
 * the profile. It will create on JavaScript the elements of the modal, 
 * inserting in them their classes and styles, as data, and adding to DOM.
 * 
 * It would be interesting to try other approaches to this problem.
 */
function createModalBase() {
  const parentDiv = document.createElement('div');
  const contentDiv = document.createElement('div');
  const spinner = document.createElement('div');
  const close = document.createElement('span');
  const text = document.createElement('p');

  // main div creation
  parentDiv.style.display = 'block';
  parentDiv.style.position = 'fixed';
  parentDiv.style.zIndex = 1;
  parentDiv.style.paddingTop = '100px';
  parentDiv.style.left = '50%';
  parentDiv.style.top = 0;
  parentDiv.style.width = 'auto';
  parentDiv.style.height = 'auto';
  parentDiv.style.overflow = 'null';
  parentDiv.id = 'parentDiv';

  // div to store all content
  contentDiv.style.backgroundColor = '#fefefe';
  contentDiv.style.margin = 'auto';
  contentDiv.style.padding = '20px';
  contentDiv.style.border = '1px solid #888';
  contentDiv.style.width = '80%';
  contentDiv.id = 'contentDiv';

  // spinner, or loader, to show user the application hasn't stopped
  spinner.style.border =  '16px solid #f3f3f3';
  spinner.style.borderTop =  '16px solid #3498db';
  spinner.style.borderRadius = '50%';
  spinner.style.width = '60px';
  spinner.style.height = '60px';
  spinner.style.animation = 'spin 2s linear infinite';
  spinner.id = 'spinner';

  // style element to give the spinner some movement
  const keyFrames = document.createElement('style');
  keyFrames.innerHTML = `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
  spinner.appendChild(keyFrames);

  // closing span
  close.style.color = '#aaaaaa';
  close.style.float = 'right';
  close.style.fontSize = '28px';
  close.style.fontWeight = 'bold';
  close.textContent = 'x';
  close.id = 'close';

  // The text that the user will see when the modal is created
  text.textContent = 'Aguarde!';
  text.id = 'text';

  // Inserting the recent created elements to the document
  contentDiv.appendChild(close);
  contentDiv.appendChild(text);
  contentDiv.appendChild(spinner);
  parentDiv.appendChild(contentDiv);
  document.body.appendChild(parentDiv);

  // Deals with the user clicking on the span to close
  close.onclick = function() {
    document.getElementById('parentDiv').remove();
  }

  // Deals with the user clicking outside the modal to close
  window.onclick = function(event) {
    if (event.target === parentDiv) {
      document.getElementById('parentDiv').remove();
    }
  }
}

/**
 * Using the elements created by the previous function on the document, this
 * function alters the text and remove the spinner, to show the user the result
 * of their request.
 * 
 * @param username the twitter handle of the suspect profile 
 * @param isBot boolean value, the answer if the profile is indeed a bot or not 
 * @returns void
 */
function showResults(username, isBot) {
  const text = document.getElementById('text');
  if (!text) return;

  const spinner = document.getElementById('spinner');
  if (spinner) spinner.remove();

  if (isBot) {
    text.textContent = `O perfil ${username} provavelmente é um bot!`;
  } else {
    text.textContent = `O perfil ${username} provavelmente não é um bot!`;
  }
}

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(onClickFunction)
