
Test Execute Script on all Frames
=================================

This tries to see what happens if you run `chrome.tabs.executeScript` on `allFrames` in different scenarios. When the page has an iframe with a different domain, then `executeScript` does not run on that page.

Separately, `chrome.webNavigation.getAllFrames` finds them, but `executeScript` with `allFrames` true doesn’t.
