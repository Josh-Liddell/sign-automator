// This script executes every time a iworq popup loads

(() => {

    console.log("Sign popup script loaded");

    chrome.storage.local.get(["stage", "signIds", "signDescriptions"], (result) => {

        if (result.stage !== 0) {
            import(chrome.runtime.getURL('assets/sign_map.js')).then((signmap) => {

                if (result.stage === -1) {
                    //End stage
                    chrome.storage.local.set({ stage: 0 });
                    window.close();
                
                } else if (result.stage === 1) {
                    console.log("Stage 1 detected");
                    // document.getElementById('mutcd_id').shadowRoot.querySelector('div.option[data-value="283"]').click();
                    let sign = result.signIds.shift();
                    sign = sign.toUpperCase();
                    document.getElementById('mutcd_id').shadowRoot.querySelector(`div.option[data-value="${signmap.default[sign]}"]`).click();
                    // Fill in its description

                    if (result.signIds.length > 0) {
                        // Save updated signIds array (with first item removed), and set stage to 2
                        chrome.storage.local.set({ signIds: result.signIds, stage: 2 });
                    } else {
                        chrome.storage.local.set({ stage: -1 });
                    }

                    // Finish first stage by clicking the create button
                    document.getElementById('create').click();

                } else if (result.stage === 2) {
                    // This stage is needed to press the copy button after the first sign is created
                    console.log("Stage 2 detected");
                    
                    // Code to override the javascript confirmation alert
                    const script = document.createElement('script');
                    script.src = chrome.runtime.getURL('scripts/confirmation_override.js');
                    (document.head || document.documentElement).appendChild(script);
                    script.onload = () => script.remove();
                    console.log("Script injection attempted");
                    
                    // click copy

                    

                } else if (result.stage === 3) {
                    console.log("Stage 3 (looping) detected");
                    // Enter sign id
                    // Enter description
                    // Click the save button (wait for saving to complete)

                    //If more signs, override and cick the copy button
                    // Else set stage = 0 and close window
                    
                }

            });
        }

    });

})();