// This file will have the code to execute the commands on the website

(() => {
    function addLocation() {
        const addButton = document.querySelector(".modal-footer button");
        if (addButton) {
            addButton.click();
        } else {
            console.log("addButton not found");
        }
    }


    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "addLocation") {
            addLocation();
            sendResponse({status: "attempted"});
        }
    });

})();

































// When place button is clicked
// addLocation()

// await the popup to appear

// enter users first id input into the code dropdown

// enter users first description into the description input

// click create button


// IF the users entered more ids

  // Click copy (accept the popup confirmation), awai the new page loaded
  // Enters next id input into the code dropdown
  // Enters next description into the description input















// ---------- NOTES ----------

// Find the button 
    // var button = document.querySelector("button[onclick='addElement()']");
    // var button = document.querySelector(".example button");


// When place is clicked, start by clicking on add sign, and then accept
// Then wait for the popup to appear, when it does 
// Click the code value and enter code first code. If there is a first description add it too
// Click create
// When created if the sign list > 1 then loop: click on copy same post, enter code, enter description, click save, wait until saved
// Close window


// (() => {
//   let youtubeLeftControls, youtubePlayer;
//   let currentVideo = "";
//   let currentVideoBookmarks = [];

//   const fetchBookmarks = () => {
//     return new Promise((resolve) => {
//       chrome.storage.sync.get([currentVideo], (obj) => {
//         resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
//       });
//     });
//   };

//   const addNewBookmarkEventHandler = async () => {
//     const currentTime = youtubePlayer.currentTime;
//     const newBookmark = {
//       time: currentTime,
//       desc: "Bookmark at " + getTime(currentTime),
//     };

//     currentVideoBookmarks = await fetchBookmarks();

//     chrome.storage.sync.set({
//       [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
//     });
//   };

//   const newVideoLoaded = async () => {
//     const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];

//     currentVideoBookmarks = await fetchBookmarks();

//     if (!bookmarkBtnExists) {
//       const bookmarkBtn = document.createElement("img");

//       bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
//       bookmarkBtn.className = "ytp-button " + "bookmark-btn";
//       bookmarkBtn.title = "Click to bookmark current timestamp";

//       youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
//       youtubePlayer = document.getElementsByClassName('video-stream')[0];

//       youtubeLeftControls.appendChild(bookmarkBtn);
//       bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
//     }
//   };

//   chrome.runtime.onMessage.addListener((obj, sender, response) => {
//     const { type, value, videoId } = obj;

//     if (type === "NEW") {
//       currentVideo = videoId;
//       newVideoLoaded();
//     } else if (type === "PLAY") {
//       youtubePlayer.currentTime = value;
//     } else if ( type === "DELETE") {
//       currentVideoBookmarks = currentVideoBookmarks.filter((b) => b.time != value);
//       chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) });

//       response(currentVideoBookmarks);
//     }
//   });

//   newVideoLoaded();
// })();

// const getTime = t => {
//   var date = new Date(0);
//   date.setSeconds(t);

//   return date.toISOString().substr(11, 8);
// };
