import { apiGet } from '../tools.js';

let contextMenuItem = {
  'id': 'pegaBot',
  'title': 'Verificar perfil',
  'contexts': ['link'],
};

async function onClickFunction(info, tab) {
  if (info.menuItemId !== contextMenuItem.id) {
      return;
  }

  const regex = new RegExp(/^https:\/\/twitter\.com\/([^\/]+)\/?.*$/gi);
  const match = regex.exec(info.linkUrl);

  if (match && match[1]) {
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

function createModalBase() {
  const parentDiv = document.createElement('div');
  const contentDiv = document.createElement('div');
  const spinner = document.createElement('div');
  const close = document.createElement('span');
  const text = document.createElement('p');

  parentDiv.style.display = 'block';
  parentDiv.style.position = 'fixed';
  parentDiv.style.zIndex = 1; /* Sit on top */
  parentDiv.style.paddingTop = '100px'; /* Location of the box */
  parentDiv.style.left = '50%';
  parentDiv.style.top = 0;
  parentDiv.style.width = 'auto'; /* Full width */
  parentDiv.style.height = 'auto'; /* Full height */
  parentDiv.style.overflow = 'null'; /* Enable scroll if needed */
  parentDiv.id = 'parentDiv';

  contentDiv.style.backgroundColor = '#fefefe';
  contentDiv.style.margin = 'auto';
  contentDiv.style.padding = '20px';
  contentDiv.style.border = '1px solid #888';
  contentDiv.style.width = '80%';
  contentDiv.id = 'contentDiv';

  spinner.style.border =  '16px solid #f3f3f3';
  spinner.style.borderTop =  '16px solid #3498db';
  spinner.style.borderRadius = '50%';
  spinner.style.width = '60px';
  spinner.style.height = '60px';
  spinner.style.animation = 'spin 2s linear infinite';
  spinner.id = 'spinner';

  const keyFrames = document.createElement('style');
  keyFrames.innerHTML = `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
  spinner.appendChild(keyFrames);

  close.style.color = '#aaaaaa';
  close.style.float = 'right';
  close.style.fontSize = '28px';
  close.style.fontWeight = 'bold';
  close.textContent = 'x';
  close.id = 'close';

  text.textContent = 'Aguarde!';
  text.id = 'text';

  contentDiv.appendChild(close);
  contentDiv.appendChild(text);
  contentDiv.appendChild(spinner);
  parentDiv.appendChild(contentDiv);
  document.body.appendChild(parentDiv);

  close.onclick = function() {
    document.getElementById('parentDiv').remove();
  }

  window.onclick = function(event) {
    if (event.target === parentDiv) {
      document.getElementById('parentDiv').remove();
    }
  }
}

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
