var pchrome = {};

pchrome.tabs = {
  query: opts =>
    new Promise((resolve, reject) => {
      chrome.tabs.query(opts, tabs => {
        let err = chrome.runtime.lastError;
        return err ? reject(err) : resolve(tabs);
      });
    }),
  executeScript: (tabId, opts) =>
    new Promise((resolve, reject) => {
      chrome.tabs.executeScript(tabId, opts, args => {
        var err = chrome.runtime.lastError;
        return err ? reject(err) : resolve(args);
      });
    })
};

pchrome.webNavigation = {
  getAllFrames: opts =>
    new Promise((resolve, reject) => {
      chrome.webNavigation.getAllFrames(opts, details => {
        let err = chrome.runtime.lastError;
        return err ? reject(err) : resolve(details);
      });
    })
};

pchrome.runtime = {
  sendMessage: (extensionId, message, opts) =>
    new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(extensionId, message, opts, resp => {
        let err = chrome.runtime.lastError;
        return err ? reject(err) : resolve(resp);
      });
    })
};

pchrome.timeout = delay =>
  new Promise((resolve, reject) => {
    window.setTimeout(resolve, delay);
  });
