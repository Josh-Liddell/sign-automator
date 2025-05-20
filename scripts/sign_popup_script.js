// The iWorQ popup script

(() => {

    console.log("Sign popup script loaded");

    // Code to override the javascript confirmation alert
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('scripts/confirmation_override.js');
    (document.head || document.documentElement).appendChild(script);
    script.onload = () => script.remove();
    console.log("Script injection attempted");
    
    import(chrome.runtime.getURL('assets/sign_map.js')).then((signmap) => {
        
        chrome.storage.local.get(["stage", "signIds", "descriptions"], (result) => {
            
            if (result.stage !== 0) {

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
                    document.getElementById('field451591').value = result.descriptions.shift();

                    if (result.signIds.length > 0) {
                        // Save updated signIds array (with first item removed), and set stage to 2
                        chrome.storage.local.set({ 
                            signIds: result.signIds, 
                            stage: 2,
                            descriptions: result.descriptions
                        });
                    } else {
                        chrome.storage.local.set({ stage: -1 });
                    }

                    // Increment count
                    chrome.storage.local.get(["count"], (result) => {
                        let currentCount = result.count || 0;
                        chrome.storage.local.set({ count: currentCount + 1 });
                    });

                    // Finish by clicking the create button
                    document.getElementById('create').click();

                } else if (result.stage === 2) {
                    // This stage controls page after create button is clicked IF there are more signs (after the first one)
                    console.log("Stage 2 detected");
                    chrome.storage.local.set({ stage: 3 });
                    
                    // Click the copy button
                    // document.getElementById('sidebar-copy-support').click();
                    setTimeout(() => {
                        // Clicking copy button after delay (to allow confirmation override to load)
                        document.getElementById('sidebar-copy-support').click();
                    }, 500);
                    

                } else if (result.stage === 3) {
                    // This stage controls page after copy button is clicked
                    console.log("Stage 3 (looping) detected");
                    // Enter sign id (get them using shift)
                    let sign = result.signIds.shift();
                    sign = sign.toUpperCase();
                    document.getElementById('mutcd_id').shadowRoot.querySelector(`div.option[data-value="${signmap.default[sign]}"]`).click();
                    document.getElementById('field451591').value = result.descriptions.shift();

                    const saveButton = document.getElementById('save')
                    const saveTextElement = document.getElementById('savetext');

                    // use mutation observer to wait for saving to complete
                    const mutationObserver = new MutationObserver((entries) => {
                        console.log(entries);
                        if (saveTextElement.textContent === "Saved") {
                            mutationObserver.disconnect();
                            if (result.signIds.length > 0) {
                                chrome.storage.local.set({ 
                                    signIds: result.signIds,
                                    descriptions: result.descriptions 
                                });
                                document.getElementById('sidebar-copy-support').click();
                            } else {
                                chrome.storage.local.set({ stage: 0 });
                                window.close();
                            }
                        }
                    });

                    mutationObserver.observe(saveButton, {
                        subtree: true,
                        characterData: true,
                        childList: true
                    });

                    // Increment count
                    chrome.storage.local.get(["count"], (result) => {
                        let currentCount = result.count || 0;
                        chrome.storage.local.set({ count: currentCount + 1 });
                    });
                    
                    // Click the save button 
                    saveButton.click();
                    
                }

            }

        });

    });

})();