// The Extension popup script

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

// handle pages
const logoButton = document.getElementById('logo-button');
const mainPage = document.querySelector('.main-page');
const aboutPage = document.querySelector('.about');

const picButton = document.querySelector('.picture');
const picPage = document.querySelector('.images');
const picSelect = document.getElementById('pic-select');

let showingAbout = false;
let showingPic = false;

logoButton.addEventListener('click', () => {
  if (showingPic === false) {
    if (showingAbout) {
      // Show main, hide about
      mainPage.style.display = 'flex';
      aboutPage.style.display = 'none';
    } else {
      // Show about, hide main
      mainPage.style.display = 'none';
      aboutPage.style.display = 'flex';
    }
  }
  showingAbout = !showingAbout;
});

picButton.addEventListener('click', () => {
  mainPage.style.display = 'none';
  picPage.style.display = 'flex';

  showingPic = !showingPic;
  
});

document.querySelectorAll('.sign-image').forEach(button => {
  button.addEventListener('click', () => {
    mainPage.style.display = 'flex';
    picPage.style.display = 'none';

    

    if (signInput.value.trim() === '') {
      signInput.value = button.dataset.sign;
    } else {
      signInput.value += `, ${button.dataset.sign}`;
    }

    showingPic = false;
    signInput.focus();
    
  });
});

// Update about page with count
chrome.storage.local.get(["count"], (result) => {
    let currentCount = result.count || 0;
    document.getElementById('count').textContent = currentCount;  
});

// Handle update button
document.getElementById('button2').addEventListener('click', function () {

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
    stage: 3,
    signIds: signIds,
    descriptions: descriptions
  }, () => {
    // console.log('Data saved:', { stage: 3, signIds, descriptions });

    // Clear fields
    window.close();
    signInput.value = '';
    descInput.value = '';

  });
});