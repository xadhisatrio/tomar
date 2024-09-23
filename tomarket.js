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
}

// Get the current value from sessionStorage for the key "telegram-apps/launch-params"
let launchParams = sessionStorage.getItem("telegram-apps/launch-params");

// Replace 'tdesktop' with 'ios'
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

// Get the value from sessionStorage for the key "telegram-apps/launch-params"
let launchParams = sessionStorage.getItem("telegram-apps/launch-params");

if (launchParams) {
    let startIndex = launchParams.indexOf("tgWebAppData=");
    if (startIndex !== -1) {
        startIndex += "tgWebAppData=".length;
        let endIndex = launchParams.indexOf("&", startIndex);
        if (endIndex === -1) {
            endIndex = launchParams.length;
        }

        let dataPart = launchParams.substring(startIndex, endIndex);
        let decodedDataPart = decodeText(dataPart);

        if (decodedDataPart) {
            let userStart = decodedDataPart.indexOf("user=");
            if (userStart !== -1) {
                let userPart = decodedDataPart.substring(userStart);
                let userEnd = userPart.indexOf("&");
                if (userEnd !== -1) {
                    userPart = userPart.substring(0, userEnd);
                }

                copyToClipboard(userPart);
                console.log("User data copied to clipboard:", userPart);
            } else {
                console.log("User data not found in decoded tgWebAppData.");
            }
        } else {
            console.log("Failed to decode tgWebAppData.");
        }
    } else {
        console.log("Key 'tgWebAppData=' not found.");
    }
} else {
    console.log("Session storage key 'launchParams' not found.");
}
