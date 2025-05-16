// This script controls the popup functionality

// Listens for when 'place' button is clicked, then send a message to the content script
document.getElementById('button1').addEventListener('click', function() {

  // Set flag first, then proceed only after it's saved
  chrome.storage.local.set({ signProcessStarted: true }, () => {

    // Optional: close the popup or clear fields
    // window.close();
    // Or: clear inputs
    // document.getElementById("input1").value = "";

    // Send the message to the content script
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

  chrome.storage.local.set({ signProcessStarted: false });

});
