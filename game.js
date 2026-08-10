window.onload = () => {
    const canvas = document.getElementById('game-canvas');
    const renderer = new Renderer(canvas);

    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const startScreen = document.getElementById('start-screen');
    const playBtn = document.getElementById('play-btn');

    // Simulated Loading Sequence (0% -> 100%)
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += 5;
        loadingBar.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                // Hide loading screen, show start title screen
                loadingScreen.classList.add('hidden');
                startScreen.classList.remove('hidden');
            }, 250);
        }
    }, 40);

    // Click to Play Event
    playBtn.addEventListener('click', () => {
        // Hide start overlay completely
        startScreen.classList.add('hidden');

        // Mark game as started and draw the maze
        renderer.gameStarted = true;
        renderer.render();

        console.log("▶ Pac-Man Game Started!");
    });
};