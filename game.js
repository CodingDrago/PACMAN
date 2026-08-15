window.onload = () => {
    const canvas = document.getElementById('game-canvas');
    const renderer = new Renderer(canvas);

    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const startScreen = document.getElementById('start-screen');
    const playBtn = document.getElementById('play-btn');

    // Spawn Pac-Man at row 15, column 18 (centered below ghost house)
    const pacman = new PacMan(19, 17);

    // Global game state reference
    window.game = {
        renderer: renderer,
        pacman: pacman,
        isRunning: false
    };

    // Keyboard Event Listener (Arrow Keys & WASD)
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                pacman.setDirection(0, -1);
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                pacman.setDirection(0, 1);
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                pacman.setDirection(-1, 0);
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                pacman.setDirection(1, 0);
                break;
        }
    });

    // Simulated Loading Sequence
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += 5;
        loadingBar.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                startScreen.classList.remove('hidden');
            }, 250);
        }
    }, 40);

    // Main 60 FPS Game Loop
    function gameLoop() {
        if (window.game.isRunning) {
            pacman.update();
            renderer.render(pacman);
            requestAnimationFrame(gameLoop);
        }
    }

    // Click to Play Action
    playBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        renderer.gameStarted = true;
        window.game.isRunning = true;

        // Start 60fps loop
        requestAnimationFrame(gameLoop);
        console.log("▶ Pac-Man Game Loop Started!");
    });
};