// Function to copy text to clipboard using a temporary text area
function copyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices

    try {
        document.execCommand('copy');
        console.log("Text copied to clipboard successfully.");
    } catch (err) {
        console.error("Failed to copy text to clipboard: ", err);
    }

    document.body.removeChild(textArea);
}

// Function to decode URL-encoded text
function decodeText(text) {
    try {
        return decodeURIComponent(text);
    } catch (err) {
        console.error("Failed to decode text: ", err);
        return null;
    }
}

// Get the current value from sessionStorage for the key "telegram-apps/launch-params"
let launchParams = sessionStorage.getItem("telegram-apps/launch-params");

if (launchParams) {
    let newLaunchParams = launchParams.replace("tgWebAppPlatform=tdesktop", "tgWebAppPlatform=ios");
    sessionStorage.setItem("telegram-apps/launch-params", newLaunchParams);

    // Refresh the page after a 1-second delay
    setTimeout(() => {
        location.reload();
    }, 1000);
} else {
    console.log("Session storage key 'telegram-apps/launch-params' not found.");
}

// Get the value from sessionStorage for the key "SourceTarget"
let sourceTarget = sessionStorage.getItem("SourceTarget");

if (sourceTarget) {
    // Find the index of "#tgWebAppData=" and start after it
    let startIndex = sourceTarget.indexOf("#tgWebAppData=");
    if (startIndex !== -1) {
        startIndex += "#tgWebAppData=".length;  // Move index to right after "#tgWebAppData="
        let endIndex = sourceTarget.indexOf("&", startIndex);
        if (endIndex === -1) {
            endIndex = sourceTarget.length; // Take until the end of the string if "&" is not found
        }
        // Extract the substring after "#tgWebAppData="
        let dataPart = sourceTarget.substring(startIndex, endIndex);
        
        // Decode the extracted portion after it's fetched
        let decodedDataPart = decodeText(dataPart);

        // Now, extract the `user` from `tgWebAppData`
        if (decodedDataPart) {
            const params = new URLSearchParams(decodedDataPart);
            const user = params.get('user');  // Get the value of the 'user' key

            // Copy the user to clipboard if it exists
            if (user) {
                copyToClipboard(user);
            } else {
                console.log("User not found in tgWebAppData.");
            }
        }
    } else {
        console.log("Key '#tgWebAppData=' not found.");
    }
} else {
    console.log("Session storage key 'SourceTarget' not found.");
}
