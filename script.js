document.addEventListener('DOMNodeInserted', (e) => replaceText(document.body));

function replaceText(element) {
  if (element.hasChildNodes()) {
    element.childNodes.forEach((child) => replaceText(child));
  } else if (element.nodeType === Text.TEXT_NODE) {
    if (element.textContent.match(/Red Bull/gi)) {
      element.parentElement.remove();
    }
  }
}