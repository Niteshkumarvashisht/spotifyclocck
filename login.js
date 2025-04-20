document.getElementById('login-btn').addEventListener('click', () => {
    // 1. Configuration
    const CLIENT_ID = 'c2a56c8619af49fea91a155f4d32752b';
    const REDIRECT_URI = 'https://niteshkumarvashisht.github.io/spotifyclocck/auth.html';
    const SCOPES = 'streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state';
    
    // 2. URL Construction (using URL API for perfect formatting)
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('client_id', CLIENT_ID);
    authUrl.searchParams.append('response_type', 'token'); // Must be 'token'
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('scope', SCOPES);
    
    // 3. Debugging output
    console.log('Final Auth URL:', authUrl.toString());
    
    // 4. Redirect
    window.location.href = authUrl.toString();
});
