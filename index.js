document.getElementById('download-btn').addEventListener('click', function () {
    const url = document.getElementById('youtube-url').value;
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        displayThumbnail(thumbnailUrl);
        document.getElementById('save-btn').style.display = 'block'; // Show the download button
        document.getElementById('save-btn').setAttribute('data-url', thumbnailUrl); // Set the thumbnail URL
    } else {
        alert('Invalid YouTube URL');
    }
});

document.getElementById('save-btn').addEventListener('click', function () {
    const thumbnailUrl = document.getElementById('save-btn').getAttribute('data-url');
    downloadThumbnail(thumbnailUrl);
});

function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
}

function displayThumbnail(url) {
    const thumbnailContainer = document.getElementById('thumbnail-container');
    thumbnailContainer.innerHTML = `<img src="${url}" alt="YouTube Thumbnail">`;
}

function downloadThumbnail(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thumbnail.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Show notification
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Hide notification after 3 seconds
}
