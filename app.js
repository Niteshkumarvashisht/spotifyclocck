document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('spotify_token');
    if (token) {
        initSpotifyPlayer(token);
    }
});

function initSpotifyPlayer(token) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('player-section').style.display = 'block';

    const player = new Spotify.Player({
        name: 'Spotify Clock Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => console.error(message));
    player.addListener('authentication_error', ({ message }) => console.error(message));
    player.addListener('account_error', ({ message }) => console.error(message));
    player.addListener('playback_error', ({ message }) => console.error(message));

    // Playback status updates
    player.addListener('player_state_changed', state => {
        if (!state) return;
        
        const { current_track } = state.track_window;
        if (current_track) {
            document.getElementById('now-playing').innerHTML = `
                <strong>${current_track.name}</strong><br>
                ${current_track.artists.map(a => a.name).join(', ')}
            `;
        }
    });

    // Ready handler
    player.addListener('ready', ({ device_id }) => {
        console.log('Player ready with Device ID:', device_id);
        transferPlayback(device_id, token);
    });

    // Connect to player
    player.connect();

    // Control buttons
    document.getElementById('play-btn').addEventListener('click', () => player.togglePlay());
    document.getElementById('prev-btn').addEventListener('click', () => player.previousTrack());
    document.getElementById('next-btn').addEventListener('click', () => player.nextTrack());
}

function transferPlayback(deviceId, token) {
    fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ device_ids: [deviceId], play: false })
    });
}