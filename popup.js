function _log(msg) {
  var elt = document.createElement('li');
  elt.innerText = msg;
  document.getElementById('msgs').appendChild(elt);
}

let tabId = null;

pchrome
  .timeout(600)
  .then(() => pchrome.tabs.query({ active: true, currentWindow: true }))
  .then(tabs => (tabId = tabs[0].id))
  .then(() => _log('### chrome.webNavigation.getAllFrames(...) approach'))
  .then(() => pchrome.webNavigation.getAllFrames({ tabId }))
  .then(details => {
    _log('lookup all frames via webNavigation:');
    details.forEach((d, i) => {
      _log(
        `RESP: frame ${d.frameId} (url=${d.url}, parentFrameId=${
          d.parentFrameId
        })`
      );
    });
    return details;
  })
  .then(() => _log('### chrome.tabs.executeScript({... allFrames}) approach'))
  .then(() => {
    let extId = chrome.runtime.id;
    let code = `console.log('execute code'); chrome.runtime.sendMessage('${extId}', window.location.href); true;`;
    _log('try to execute code in all frames:\n ```\n' + code + '\n```');
    return pchrome.tabs.executeScript(tabId, {
      code: code,
      allFrames: true,
      matchAboutBlank: true
    });
  })
  .then(resp => {
    _log(`done with executeScript: ${JSON.stringify(resp)}`);
  })
  .catch(err => {
    _log(`GOT ERROR: ${(err && err.message) || err}`);
  });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // https://developer.chrome.com/extensions/runtime#event-onMessage
  _log(
    `RESP: received executeScript runtime message from ${JSON.stringify(
      message
    )} ${sender.frameId}`
  );
  return false;
});
