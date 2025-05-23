// Map Page Script

(() => {
    function addLocation() {
        const addButton = document.querySelector(".modal-footer button");
        if (addButton) {
            addButton.click();
        } else {
            console.log("addButton not found");
        }
    }

    chrome.storage.local.set({ stage: 0 });
    document.querySelector(".navbar-toggler").click()

    // Code to override the javascript confirmation alert
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('scripts/confirmation_override.js');
    (document.head || document.documentElement).appendChild(script);
    script.onload = () => script.remove();
    console.log("Script injection attempted");

    // Listed for the click of the buttons
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "addLocation") {
            addLocation();
            sendResponse({status: "attempted"});
            
            // Wait for 1 second before trying to find the cancel button
            setTimeout(() => {
                const cancelButton = document.querySelector('.btn.action.border.form-group.cancel-btn');
                
                if (cancelButton) {
                    cancelButton.addEventListener('click', function(event) {
                        chrome.storage.local.set({ stage: 0 });
                        console.log('Stage reset to 0');
                    });
                } else {
                    console.error('Cancel button not found even after delay');
                }
            }, 1000);
        } else if (message.action === "update") {
            const editButton = document.querySelector(".editView");
            if (editButton) {
                editButton.click();
            } else {
                console.log("edit button not found");
            }

            sendResponse({status: "attempted"});
        }
    });

})();