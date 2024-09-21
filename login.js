// Get the current value from sessionStorage for the key "telegram-apps/launch-params"
let launchParams = sessionStorage.getItem("telegram-apps/launch-params");

// Replace 'tdesktop' with 'ios'
if (launchParams) {
    let newLaunchParams = launchParams.replace("tgWebAppPlatform=tdesktop", "tgWebAppPlatform=ios");
    sessionStorage.setItem("telegram-apps/launch-params", newLaunchParams);

    // Refresh the page after a 1-second delay
    setTimeout(() => {
        location.reload();
    }, 1000);  // 1000 milliseconds = 1 second
} else {
    console.log("Session storage key 'telegram-apps/launch-params' not found.");
}
