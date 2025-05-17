// This script executes every time a iworq popup loads

(() => {

    console.log("Sign popup script loaded");

    chrome.storage.local.get(["stage", "signIds", "signDescriptions"], (result) => {

        if (result.stage === 1) {
            console.log("Stage 1 detected");
            document.getElementById('mutcd_id').shadowRoot.querySelector('div.option[data-value="283"]').click();
            // Fill in its description
            // remove it from the list???
            document.getElementById('create').click();

            // If list still has more sign ids
            chrome.storage.local.set({ stage: 2 });

            // Else (set stage 0 and do window.close())

        } else if (result.stage === 2) {
            console.log("Stage 2 detected");

            // Code to override the javascript confirmation alert
            const script = document.createElement('script');
            script.src = chrome.runtime.getURL('scripts/confirmation_override.js');
            (document.head || document.documentElement).appendChild(script);
            script.onload = () => script.remove();
            console.log("Script injection attempted");

            // Loop number of times there are sign ids left:

            // set stage = 3 (looping)
            //Click the copy button


        } else if (result.stage === 3) {
            console.log("Stage 3 (looping) detected");
            // Enter sign id
            // Enter description
            // Click the save button (wait for saving to complete)

            //If more signs, cick the copy button
            // Else set stage = 0 and do window.close()
            
        }

    });

})();