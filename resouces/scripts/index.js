function handleSheetsLink() {
    const sheets_url = "https://www.google.com";
    document.getElementById('open-sheet').href = sheets_url;
    return false;
}

// function save_options() {
//     var color = document.getElementById('color').value;
//     var likesColor = document.getElementById('like').checked;
//     chrome.storage.sync.set({
//         favoriteColor: color,
//         likesColor: likesColor
//     }, function () {
//         // Update status to let user know options were saved.
//         var status = document.getElementById('status');
//         status.textContent = 'Options saved.';
//         setTimeout(function () {
//             status.textContent = '';
//         }, 750);
//     });
// }

function handleChange() {

    const result_string = "";

    if (document.getElementById('input-date').checked) {
        const datetime = new Date();
        const date = datetime.getMonth() + '-' + datetime.getDate() + '-' + datetime.getYear();
        result_string += date + '\t';

        console.log(result_string);
    }
    
    if (document.getElementById('input-time').checked) {
        const datetime = new Date();
        const time = datetime.getHours() + ':' + datetime.getMinutes();
        result_string += time + '\t';

        console.log(result_string);
    }

    if (document.getElementById('input-id').checked) {
        const organization = "Google";
        result_string += organization + "\t";

        console.log(result_string);
    }
    
    if (document.getElementById('get-page-link').checked) {
        const currURL = window.location.href;
        result_string += currURL + '\t';

        console.log(result_string);
    }

    if (document.getElementById('get-previous-link').checked) {
        const prevURL = document.referrer;
        result_string += prevURL + '\t';

        console.log(result_string);
    }

    console.log(result_string);
    copyString();

    async function copyString() {
        try {
            await navigator.clipboard.writeText(result_string);
            console.log('String copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    return copyString;
    
}

document.getElementbyID('main-form').addEventListener('change', (event) => {
    const clipboardString = handleChange();
    document.getElementById('message').textContent = clipboardString

})