```javascript
document.addEventListener('DOMContentLoaded', function() {
    let commentButton = document.getElementById('commentButton');
    let commentText = document.getElementById('commentText');

    commentButton.addEventListener('click', function() {
        let comment = commentText.value;
        if (comment) {
            chrome.runtime.sendMessage({
                type: "COMMENT",
                data: comment
            });
            commentText.value = '';
        }
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "COMMENTS_UPDATED") {
        let commentsContainer = document.getElementById('commentsContainer');
        commentsContainer.innerHTML = '';
        request.data.forEach(function(comment) {
            let commentElement = document.createElement('p');
            commentElement.textContent = comment;
            commentsContainer.appendChild(commentElement);
        });
    }
});
```