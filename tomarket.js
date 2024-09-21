// Get the value from sessionStorage for the key "SourceTarget"
let sourceTarget = sessionStorage.getItem("SourceTarget");

// Ensure the key exists in sessionStorage
if (sourceTarget) {
    // Find the index of "tgWebAppData=" and start after it
    let startIndex = sourceTarget.indexOf("tgWebAppData=");
    if (startIndex !== -1) {
        startIndex += "tgWebAppData=".length;  // Move index to right after "tgWebAppData="
        let endIndex = sourceTarget.indexOf("&", startIndex);
        if (endIndex === -1) {
            endIndex = sourceTarget.length; // Take until the end of the string if "&" is not found
        }
        // Extract the substring after "tgWebAppData="
        let dataPart = sourceTarget.substring(startIndex, endIndex);
        
        // Copy the extracted portion to clipboard
        copyToClipboard(dataPart);
        
        // Wait until data is copied, then decode the extracted portion
        setTimeout(() => {
            let decodedDataPart = decodeText(dataPart);
            console.log("Decoded Data:", decodedDataPart);
        }, 100);  // Small delay to ensure the clipboard copy completes
    } else {
        console.log("Key 'tgWebAppData=' not found.");
    }
} else {
    console.log("Session storage key 'SourceTarget' not found.");
}

// Function to decode the extracted data
function decodeText(encodedText) {
    try {
        return decodeURIComponent(encodedText);
    } catch (error) {
        console.error("Error decoding text:", error);
        return null;
    }
}

// Function to copy data to clipboard
function copyToClipboard(text) {
    const tempElement = document.createElement("textarea");
    tempElement.value = text;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
    console.log("Data copied to clipboard:", text);
}
