import {keys} from "./keys.js"

$(document).ready(function() {
    const uploadBtn = $('#upload-btn');
    const input = $('#user-input');

    const client = filestack.init(keys.fileStack);
    uploadBtn.on('click', function () {
        console.log("opened")
        client.picker({
            accept: ['image/*', 'video/*'], // Allow only photos and videos to be uploaded
            fromSources: ['local_file_system', 'url'], // Limit the upload sources
            onUploadDone: function(res) {
                const url = res.filesUploaded[0].url;
                input.attr('value', url);
            }
        }).open();
    });
});

