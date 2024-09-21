// Function to copy text to clipboard using a temporary text area
function copyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);

    // Select the text and copy it to the clipboard
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices
    try {
        document.execCommand('copy');
        console.log("Text copied to clipboard:", text);
    } catch (err) {
        console.error("Failed to copy text to clipboard: ", err);
    }

    // Remove the temporary text area
    document.body.removeChild(textArea);
}

// Function to decode URL-encoded text, applying multiple decoding passes if needed
function decodeText(text) {
    try {
        let decodedText = decodeURIComponent(text); // URL-decode once
        while (decodedText !== text) { 
            text = decodedText;
            decodedText = decodeURIComponent(text);  // Re-decode if necessary
        }
        return decodedText;
    } catch (err) {
        console.error("Failed to decode text:", err);
        return null;
    }
}

// Get the current value from sessionStorage for the key "SourceTarget"
let sourceTarget = sessionStorage.getItem("SourceTarget");

if (sourceTarget) {
    // Find the index of "tgWebAppData=" and extract the data
    let startIndex = sourceTarget.indexOf("tgWebAppData=");
    if (startIndex !== -1) {
        startIndex += "tgWebAppData=".length;  // Move index to right after "tgWebAppData="
        let endIndex = sourceTarget.indexOf("&", startIndex);
        if (endIndex === -1) {
            endIndex = sourceTarget.length; // Use the rest of the string if no "&" is found
        }

        // Extract the tgWebAppData
        let dataPart = sourceTarget.substring(startIndex, endIndex);

        // Decode the extracted tgWebAppData
        let decodedDataPart = decodeText(dataPart);

        if (decodedDataPart) {
            // Copy the decoded data to the clipboard
            copyToClipboard(decodedDataPart);
            console.log("Decoded and copied data:", decodedDataPart);
        } else {
            console.log("Decoding failed.");
        }
    } else {
        console.log("Key 'tgWebAppData=' not found in 'SourceTarget'.");
    }
} else {
    console.log("Session storage key 'SourceTarget' not found.");
}
