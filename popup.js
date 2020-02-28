function changePreviewMode(isImagePreviewMode){
   chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
       chrome.tabs.sendMessage(tabs[0].id, {action: "update_imagePreviewMode", isImagePreviewMode: isImagePreviewMode})
   });
   chrome.runtime.sendMessage({action: "bg_update_imagePreviewMode", detail: isImagePreviewMode}, function(response) {

   });
}

document.addEventListener('DOMContentLoaded', function () {

    chrome.runtime.sendMessage({action: "bg_popup_opened", detail: "popup.html"}, function(response) {

    });

    var checkbox = document.getElementById('TP_popup_preview_mode_checkbox');
    chrome.storage.sync.get('isImagePreviewMode', function(result) {
        checkbox.checked = typeof result.isImagePreviewMode == 'undefined' ? false : !result.isImagePreviewMode;
    });

    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            changePreviewMode(false);
        } else {
            changePreviewMode(true);
        }
    });
});
