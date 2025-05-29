# Sign Creation Automator Tool

This sign creation tool is a Chrome browser extension designed to streamline the process of creating signs in the iWorQ mapping software.

With this tool you can input a list of sign IDs and descriptions and have the extension automatically populate the required fields and trigger the appropriate buttons within the iWorQ sign creation form saving time and reducing manual errors.

## Features

- Automates data entry for new sign records in iWorQ
- Supports batch input of multiple sign IDs
- Speeds up the sign creation process with fewer clicks
- Reduces user fatigue and human error

## Requirements

- Google Chrome
- Access to iWorQ mapping software

## Getting Started

1. Clone, or download and unzip this repository. (to download click the above green code button and then click download zip)
2. In Chrome, navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the extension directory.
5. Pin extension to tool bar and click the icon to start automating your iWorQ sign creation process.

## Usage

**Place sign:**
1. Enter one or multiple sign IDs separated by commas into the first text field. (use image icons to speed up the process)
   - Example: `r1-1, oc-4, oc-4`

2. If a sign requires a description(object_val), enter each description in order in the second text field, separated by commas.  
   Leave blank where no description needed.  
   - Example: `,"desc 2", "desc 3"`  
     (This applies a description to the second and third signs but no description to the first as it was left blank. Leave entire field blank if no descriptions are needed)

3. Click the place button and then click a point on the map. 

**Update sign:**
1. Select a sign on the map.

3. Open the extension and enter the sign ids and descriptions of your desired sign.

5. Click the update button. (this process will override the original sign and then contiue to add to the support. If the original support had more than 1 sign the others will have to be deleted manually)

**Note:**
- You can assign a hotkey to open the extension and press tab and enter to click the place or update buttons.
- You can view number of signs created by clicking the top left logo icon.

## Disclaimer

This tool is intended for internal use by authorized personnel with access to iWorQ.
