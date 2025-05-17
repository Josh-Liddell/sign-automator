// This script executes every time a iworq popup loads

(() => {

    console.log("Sign popup script loaded");
    
    import(chrome.runtime.getURL('assets/sign_map.js')).then((signmap) => {
        chrome.storage.local.get(["stage", "signIds", "signDescriptions"], (result) => {
            
            if (result.stage !== 0) {
                const copyClick = () => {
                    // Code to override the javascript confirmation alert
                    const script = document.createElement('script');
                    script.src = chrome.runtime.getURL('scripts/confirmation_override.js');
                    (document.head || document.documentElement).appendChild(script);
                    script.onload = () => script.remove();
                    console.log("Script injection attempted");
                    
                    // click copy
                    // document.getElementById('copy').click();
                };
            

                if (result.stage === -1) {
                    //End stage
                    chrome.storage.local.set({ stage: 0 });
                    window.close();
                
                } else if (result.stage === 1) {
                    //Create page stage
                    console.log("Stage 1 detected");
                    let sign = result.signIds.shift();
                    sign = sign.toUpperCase();
                    document.getElementById('mutcd_id').shadowRoot.querySelector(`div.option[data-value="${signmap.default[sign]}"]`).click();
                    
                    
                    // Fill in its description
                    // document.getElementById('objvalGETIT').value = result.signDescriptions.shift();

                    if (result.signIds.length > 0) {
                        // Save updated signIds array (with first item removed), and set stage to 2
                        chrome.storage.local.set({ signIds: result.signIds, stage: 2 });
                    } else {
                        chrome.storage.local.set({ stage: -1 });
                    }

                    // Finish by clicking the create button
                    document.getElementById('create').click();

                } else if (result.stage === 2) {
                    // This stage controls page after create button is clicked IF there are more signs (after the first one)
                    console.log("Stage 2 detected");
                    chrome.storage.local.set({ stage: 3 });
                    copyClick();
                    

                } else if (result.stage === 3) {
                    // This stage controls page after copy button is clicked
                    console.log("Stage 3 (looping) detected");
                    // Enter sign id (get them using shift)
                    // Enter description
                    // Click the save button (wait for saving to complete)

                    
                    // if (result.signIds.length > 0) {
                    //     chrome.storage.local.set({ signIds: result.signIds });
                    //     copyClick();
                    // } else {
                    //     chrome.storage.local.set({ stage: 0 });
                    //     window.close();
                    // }
                    
                }

                
            }

        });
    });

})();