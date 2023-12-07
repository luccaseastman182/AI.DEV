```javascript
let comments = [];

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getComments') {
        sendResponse(comments);
    } else if (request.message === 'addComment') {
        comments.push(request.data);
        saveComments();
    }
});

// Load comments from storage
chrome.storage.sync.get('comments', (data) => {
    if (data.comments) {
        comments = data.comments;
    }
});

// Save comments to storage
function saveComments() {
    chrome.storage.sync.set({comments: comments});
}

// Add comment to page
function addComment(comment) {
    let commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.textContent = comment.text;
    document.body.appendChild(commentDiv);
}

// Add existing comments to page
comments.forEach(addComment);
```