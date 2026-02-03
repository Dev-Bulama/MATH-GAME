/**
 * 🏎️ MATH RACING GAME - MAIN ENTRY POINT
 * Initializes the game engine, UI controller, and progress manager
 */

// Global game instances
let gameEngine;
let progressManager;
let uiController;
let soundManager;

// Initialize game on page load
window.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
    console.log('🏎️ Initializing Math Racing Game...');

    // Show loading progress
    simulateLoading();

    // Wait for Three.js to load
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded!');
        alert('Error loading 3D engine. Please refresh the page.');
        return;
    }

    // Initialize game components
    try {
        soundManager = new SoundManager();
        progressManager = new ProgressManager();
        gameEngine = new RacingGameEngine();
        uiController = new UIController(gameEngine, progressManager, soundManager);

        // Make available globally for cross-component communication
        window.gameEngine = gameEngine;
        window.progressManager = progressManager;
        window.uiController = uiController;
        window.soundManager = soundManager;

        console.log('✅ Game initialized successfully!');
    } catch (error) {
        console.error('Error initializing game:', error);
        alert('Error starting game. Please refresh the page.');
    }
}

function simulateLoading() {
    const progressBar = document.getElementById('loading-progress');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
        }
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }, 200);
}

// Handle visibility change (page hidden/shown)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause game when tab is not visible
        if (gameEngine && gameEngine.isRacing) {
            gameEngine.pause();
            if (uiController) {
                uiController.showPauseMenu();
            }
        }
    }
});

// Prevent context menu on long press (mobile)
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Prevent default touch behaviors that might interfere
document.addEventListener('touchmove', (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
    }
}, { passive: false });

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (gameEngine) {
            gameEngine.onWindowResize();
        }
    }, 200);
});

// Service Worker for PWA (optional - can be enabled for offline play)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed:', err));
    });
}

console.log('🏎️ Math Racing Game loaded and ready!');
