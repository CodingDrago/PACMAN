window.onload = () => {
    const canvas = document.getElementById('game-canvas');
    const renderer = new Renderer(canvas);

    // Initial draw
    renderer.clear();
    renderer.drawMap();

    console.log("Game board rendered successfully!");
};