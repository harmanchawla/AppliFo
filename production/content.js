function handleSheetsLink() {
    chrome.storage.sync.get(['key'], function (result) {
        if (result.key === undefined) {
            chrome.tabs.create({ url: "https://docs.google.com/spreadsheets"})
        } else {
            console.log('URL value is ' + result.key);
            chrome.tabs.create({ url: result.key });
        }
        
    });
}

var save_sheets_url = (e) => {
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


var firstLetterCap = (str) => {
    try {
        return str.charAt(0).toUpperCase() + str.slice(1);
    } catch(e) {
        return str;
    }
   
}

var getOrganizatin = (url) => {

    if (url.includes("boards.greenhouse.io") || url.includes("jobs.lever.co")) {
        var parse = url.split("/");
        return firstLetterCap(parse[3]);
    }
    if (url.includes("myworkdayjobs")) {
        var parse = url.split("/");
        var org = parse[2].split(".")[0];
        return firstLetterCap(org);
    }
    if (url.includes("taleo")) {
        var parse = url.split("/");
        var org = parse[1].split(".")[0];
        return firstLetterCap(org);
    }
    
    var parse = url.split(".");
    return firstLetterCap(parse[1]);
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
            const organization = getOrganizatin(tabs[0].url);
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
    document.getElementById('display-url');
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
        chrome.storage.sync.get(['key'], function (result) {
            document.getElementById('display-url').value = result.key;
        });

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
        if (settingBtn) {
            settingBtn.addEventListener('click', openSettingPanel);
            
        }

        const sheet_url_field = document.getElementById('sheets-url');
        if (sheet_url_field) {
            sheet_url_field.addEventListener('click', save_sheets_url);
        }
    }
});

