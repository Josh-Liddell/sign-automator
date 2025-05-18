// This script controls the popup functionality for the extension and will send a message to content script when the button is clicked. (and will add the data to storage)

// Prevent Enter key from submitting form or adding new lines
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });
});

const signInput = document.getElementById('text1');
const descInput = document.getElementById('text2');
signInput.focus();

// Listens for when 'place' button is clicked, then send a message to the content script
document.getElementById('button1').addEventListener('click', function () {

  const signIds = signInput.value.split(',').map(s => s.trim()).filter(s => s.length > 0);

  let descriptions;
  if (descInput.value.length === 0) {
    descriptions = signIds.map(() => ""); // fill with blanks for each sign
  } else {
    const rawDescs = descInput.value.split(',').map(s => s.trim());
    descriptions = signIds.map((_, idx) => rawDescs[idx] || '');
  }

  // Send variables to storage
  chrome.storage.local.set({
    stage: 1,
    signIds: signIds,
    descriptions: descriptions
  }, () => {
    console.log('Data saved:', { stage: 1, signIds, descriptions });

    //Send messsage
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {action: "addLocation"},
        response => {
          console.log("Response:", response);
        }
      );
    });

    // Clear fields
    window.close();
    signInput.value = '';
    descInput.value = '';

  });
});
