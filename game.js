window.onload = () => {
    const canvas = document.getElementById('game-canvas');
    const renderer = new Renderer(canvas);

    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const startScreen = document.getElementById('start-screen');
    const playBtn = document.getElementById('play-btn');

    // Simulated Loading Sequence
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += 10;
        loadingBar.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                // Transition from Loading Screen to Title Screen
                loadingScreen.classList.add('hidden');
                startScreen.classList.remove('hidden');
            }, 300);
        }
    }, 100);

    // Click to Play Action
    playBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');

        // Draw initial map state
        renderer.render();
        console.log("Game started!");
    });
};