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

        // Decode the extracted portion (this will convert user%3D into user=)
        let decodedDataPart = decodeText(dataPart);

        // Now, extract the 'user' parameter from the decoded string
        if (decodedDataPart) {
            const userStart = decodedDataPart.indexOf("user=");
            if (userStart !== -1) {
                // Extract the substring starting from "user="
                let userPart = decodedDataPart.substring(userStart);
                let userEnd = userPart.indexOf("&"); // Look for an "&" if present
                if (userEnd !== -1) {
                    userPart = userPart.substring(0, userEnd);
                }

                // Copy the user data to clipboard
                copyToClipboard(userPart);
                console.log("User data copied to clipboard:", userPart);
            } else {
                console.log("User data not found in decoded tgWebAppData.");
            }
        } else {
            console.log("Failed to decode tgWebAppData.");
        }
    } else {
        console.log("Key '#tgWebAppData=' not found.");
    }
} else {
    console.log("Session storage key 'SourceTarget' not found.");
}
