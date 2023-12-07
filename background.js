```javascript
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ comments: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'saveComment') {
    chrome.storage.sync.get('comments', (data) => {
      let comments = data.comments;
      comments.push(request.comment);
      chrome.storage.sync.set({ comments: comments }, () => {
        sendResponse({ message: 'Comment saved' });
      });
    });
    return true;
  } else if (request.message === 'getComments') {
    chrome.storage.sync.get('comments', (data) => {
      sendResponse({ message: 'Comments retrieved', comments: data.comments });
    });
    return true;
  }
});
```