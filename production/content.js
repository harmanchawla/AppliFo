function handleSheetsLink() {
    chrome.storage.sync.get(['key'], function (result) {
        console.log('URL value is ' + result.key);
        chrome.tabs.create({ url: result.key });
        return true;
    });
    return false;
}

var save_sheets_url = (e) => {
    document.getElementById('typed-url').value = e.target.value;
    chrome.storage.sync.set({ key : e.target.value }, function () {
        console.log('URL is set to ' + value);
    });
}

var addZero = (num) => {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}


var constructString = () => {

    // Get current active tab
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            var result = document.getElementById("data-string");
            var result_string = "";

            // Add date
            const datetime = new Date();
            const date = addZero(datetime.getDate()) + '-' + addZero(datetime.getMonth() + 1) + '-' + datetime.getFullYear();
            result_string += date + '\t';

            // Add time
            const time = addZero(datetime.getHours()) + ':' + addZero(datetime.getMinutes());
            result_string += time + '\t';

            // Add organization 
            //const organization = getOrganizatin();
            const organization = "Google";
            result_string += organization + '\t';

            // Add URL
            const url = tabs[0].url;
            result_string += url;

            result.value = result_string;
            copyString();
    });
}

async function copyString() {
    try {
        const result_string = document.getElementById("data-string").value;
        await navigator.clipboard.writeText(result_string);

        document.getElementById('message').textContent = "Copied to clipboard.";
    } catch (err) {
        document.getElementById('message').textContent = "Sorry! We couldn't copy the string.";
    }
}

var openSettingPanel = () => {
    var panel = document.getElementsByClassName('panel')[0];
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM was loaded.")

    window.onload = function() {
        const textField = document.getElementById('data-string');
        if (textField) {
             constructString();
        }

        const openBtn = document.getElementById('open-sheets');
        if (openBtn) {
            openBtn.addEventListener('click', handleSheetsLink);
        }

        const copyBtn = document.getElementById('copy-icon');
        if (copyBtn) {
            copyBtn.addEventListener('click', copyString);
        }     

        const settingBtn = document.getElementById('setting-btn');
        const sheet_url_field = document.getElementById('sheets-url');
        if (settingBtn) {
            settingBtn.addEventListener('click', openSettingPanel);
            
        }
        if (sheet_url_field) {
            sheet_url_field.addEventListener('input', save_sheets_url);
        }
    }
});


console.log("Loaded Javascript File.")

