
Test Execute Script on all Frames
=================================

For ticket: [chromium/issues #826433](https://bugs.chromium.org/p/chromium/issues/detail?id=826433)

This extensions tests what happens if you run `chrome.tabs.executeScript` on `allFrames` in different scenarios. When the page has an iframe with a different domain ([example](https://mrcoles.com/media/test2/scratch/iframe2.html)), then `executeScript` does not run on that page.

Separately, `chrome.webNavigation.getAllFrames` finds them, but `executeScript` with `allFrames` true doesn’t.

NOTE: this works when the extension has all tabs permissions:

```javascript
{
  "permissions": ["tabs", "http://*/*", "https://*/*", "activeTab"]
}
```

but not when it only has activeTab:

```javascript
{
  "permissions": ["activeTab"]
}
```
