const btn = document.querySelector('.showTitle');

btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getTitle,
    }, (results) => {
        if (results && results[0] && results[0].result) {
            document.getElementById('titleDisplay').textContent = results[0].result;
        }
    });
});

function getTitle() {
    try {
        return document.title;
    } catch (error) {
        console.error(error);
        return "Error retrieving title";
    }
}
