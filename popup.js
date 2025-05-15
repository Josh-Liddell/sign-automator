// This script controls the popup functionality

// Listen for when 'place' button is clicked, then send a message to the content script
document.getElementById('button1').addEventListener('click', function() {
  // Send message to the content script in the active tab
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {action: "addLocation"},
      response => {
        console.log("Response:", response);
      }
    );
  });
});