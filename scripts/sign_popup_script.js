// This file will have the code to execute the commands in the popup sign creation process

(() => {

    console.log("Sign popup script loaded");

    chrome.storage.local.get(["stage", "signIds", "signDescriptions"], (result) => {

        if (result.stage === 1) {
            console.log("Stage 1 detected");
            document.getElementById('mutcd_id').shadowRoot.querySelector('div.option[data-value="283"]').click();
            document.getElementById('create').click();
            chrome.storage.local.set({ stage: 2 });
        } else if (result.stage === 2) {
            console.log("Stage 2 detected");


        }

    });

})();


    // IF stage 1 of sign creation process is started take the data from the storage and do the following
    // instad of 1 do the mapped data value for the sign id they entered (make the sign map)

    // click on the create button
    // const createButton = document.getElementById('create');
    // if (createButton) {
    //     createButton.click();
    // } else {
    //     console.log("createButton not found");
    // }



// use mutation obeserver for checking when new sign on post gets saved


// THIS WORKS BELOW TO STOP THE JAVASCRIPT CONFIRM BUT IT DOESNT SEEM TO WORK IF THE EXTENSION RUNS THE CODE 

// var s = document.createElement('script');
// s.innerHTML = "confirm= function(){return true;}"
// document.body.appendChild(s);
// console.log("Confirm function overridden");




// NOTES
    // Override the confirm dialog immediately
    
    // window.confirm = () => true;
    // chrome.storage.local.get(["signProcessStarted"], (result) => {
    //     if (result.signProcessStarted) {
    //         console.log("Running code to handle the sign popup");
    //         // Enter the first sign ID and desc into the id dropdown and description input
                
            
    //         // Click the create button

    //         // If there are more sign IDs
                   // window.confirm = () => true;
    //             // Click the copy button (chrome confirm popup will be taken care of by the above line)
    //             // Enter the next sign ID and desc into the id dropdown and description input
    //             // Click the save button

            
            

            
    //         chrome.storage.local.set({ signProcessStarted: false });
    //     }
    // });