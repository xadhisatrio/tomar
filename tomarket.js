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

        // Use URLSearchParams directly on the raw dataPart (not decoded)
        const params = new URLSearchParams(dataPart);
        const user = params.get('user');  // Get the value of the 'user' key

        // Copy the user to clipboard if it exists
        if (user) {
            copyToClipboard(user);
            console.log("User copied to clipboard:", user);
        } else {
            console.log("User not found in tgWebAppData.");
        }
    } else {
        console.log("Key '#tgWebAppData=' not found.");
    }
} else {
    console.log("Session storage key 'SourceTarget' not found.");
}
