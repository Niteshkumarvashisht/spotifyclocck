
document.getElementById('login-btn').addEventListener('click', () => {
    const CLIENT_ID = 'c2a56c8619af49fea91a155f4d32752b';
    const REDIRECT_URI = encodeURIComponent('https://niteshkumarvashisht.github.io/spotifyclock/auth.html');
    const SCOPES = encodeURIComponent([
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-modify-playback-state',
        'user-read-playback-state'
    ].join(' '));

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
    window.location.href = authUrl;
});