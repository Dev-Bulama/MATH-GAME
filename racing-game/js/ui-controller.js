/**
 * 🏎️ MATH RACING GAME - UI CONTROLLER
 * Manages all UI screens, transitions, and user interactions
 */

class UIController {
    constructor(gameEngine, progressManager) {
        this.gameEngine = gameEngine;
        this.progressManager = progressManager;

        // Screens
        this.loadingScreen = document.getElementById('loading-screen');
        this.mainMenu = document.getElementById('main-menu');
        this.gameScreen = document.getElementById('game-screen');
        this.resultsScreen = document.getElementById('results-screen');
        this.pauseMenu = document.getElementById('pause-menu');

        // UI Elements
        this.levelsGrid = document.getElementById('levels-grid');
        this.questionPanel = document.getElementById('question-panel');
        this.questionText = document.getElementById('question-text');
        this.answerOptions = document.getElementById('answer-options');
        this.questionNum = document.getElementById('question-num');
        this.totalQuestions = document.getElementById('total-questions');

        this.currentQuestion = null;
        this.init();
    }

    init() {
        this.setupMenuButtons();
        this.renderLevelSelect();
        this.updateStats();

        // Simulate loading
        setTimeout(() => {
            this.showMainMenu();
        }, 1500);
    }

    setupMenuButtons() {
        // Pause button
        document.getElementById('pause-btn')?.addEventListener('click', () => {
            this.showPauseMenu();
        });

        // Resume button
        document.getElementById('resume-btn')?.addEventListener('click', () => {
            this.hidePauseMenu();
        });

        // Quit button
        document.getElementById('quit-btn')?.addEventListener('click', () => {
            this.hidePauseMenu();
            this.showMainMenu();
        });

        // Results screen buttons
        document.getElementById('retry-btn')?.addEventListener('click', () => {
            if (this.currentLevel) {
                this.startLevel(this.currentLevel);
            }
        });

        document.getElementById('menu-btn')?.addEventListener('click', () => {
            this.showMainMenu();
        });

        // Reset progress
        document.getElementById('reset-progress')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
                this.progressManager.reset();
                this.updateStats();
                this.renderLevelSelect();
            }
        });
    }

    renderLevelSelect() {
        this.levelsGrid.innerHTML = '';

        for (let levelNum = 1; levelNum <= 7; levelNum++) {
            const level = GAME_LEVELS[levelNum];
            const isUnlocked = this.progressManager.isLevelUnlocked(levelNum);
            const isCompleted = this.progressManager.isLevelCompleted(levelNum);
            const stars = this.progressManager.getStarsForLevel(levelNum);

            const card = document.createElement('div');
            card.className = `level-card ${!isUnlocked ? 'locked' : ''}`;

            let statusText = '';
            let statusClass = '';
            if (isCompleted) {
                statusText = '✅ Completed';
                statusClass = 'completed';
            } else if (isUnlocked) {
                statusText = '🔓 Unlocked';
                statusClass = 'unlocked';
            } else {
                statusText = '🔒 Locked';
                statusClass = 'locked';
            }

            const starsHTML = stars > 0 ? '⭐'.repeat(stars) : '';

            card.innerHTML = `
                <div class="level-header">
                    <div class="level-icon">${level.icon}</div>
                    <div class="level-details">
                        <h3>Level ${levelNum}</h3>
                        <div class="level-status ${statusClass}">${statusText}</div>
                    </div>
                </div>
                <div class="level-description">${level.description}</div>
                <div class="level-stars">${starsHTML}</div>
            `;

            if (isUnlocked) {
                card.addEventListener('click', () => {
                    this.startLevel(levelNum);
                });
            }

            this.levelsGrid.appendChild(card);
        }
    }

    updateStats() {
        const totalStars = this.progressManager.getTotalStars();
        const totalBadges = this.progressManager.data.badges.length;
        const completedLevels = this.progressManager.data.completedLevels.length;

        document.getElementById('total-stars').textContent = totalStars;
        document.getElementById('total-badges').textContent = totalBadges;
        document.getElementById('completed-levels').textContent = `${completedLevels}/7`;
    }

    startLevel(levelNum) {
        this.currentLevel = levelNum;
        const level = GAME_LEVELS[levelNum];

        // Generate questions
        const questions = level.questionGenerator();

        // Update HUD
        document.getElementById('current-level-icon').textContent = level.icon;
        document.getElementById('current-level-name').textContent = level.name;

        // Show game screen
        this.showScreen(this.gameScreen);

        // Start the race
        this.gameEngine.startRace(levelNum, questions);
    }

    displayQuestion(question, questionNumber, totalQuestions) {
        this.currentQuestion = question;
        this.questionNum.textContent = questionNumber;
        this.totalQuestions.textContent = totalQuestions;

        // All questions are now True/False format - simple display
        this.questionText.innerHTML = question.question;

        // Render True/False buttons only
        this.answerOptions.innerHTML = '';

        // True button (green)
        const trueBtn = document.createElement('button');
        trueBtn.className = 'answer-btn true-btn';
        trueBtn.textContent = '✓ TRUE';
        trueBtn.style.background = '#00cc66';
        trueBtn.addEventListener('click', () => {
            this.handleAnswer('True', question.correctAnswer);
        });
        this.answerOptions.appendChild(trueBtn);

        // False button (red)
        const falseBtn = document.createElement('button');
        falseBtn.className = 'answer-btn false-btn';
        falseBtn.textContent = '✗ FALSE';
        falseBtn.style.background = '#ff6b6b';
        falseBtn.addEventListener('click', () => {
            this.handleAnswer('False', question.correctAnswer);
        });
        this.answerOptions.appendChild(falseBtn);

        // Show question panel
        this.questionPanel.style.display = 'block';
    }

    handleAnswer(userAnswer, correctAnswer) {
        // Disable buttons to prevent multiple clicks
        const buttons = this.answerOptions.querySelectorAll('.answer-btn');
        buttons.forEach(btn => btn.disabled = true);

        // Hide question panel
        setTimeout(() => {
            this.questionPanel.style.display = 'none';
        }, 500);

        // Send answer to game engine
        this.gameEngine.answerQuestion(userAnswer, correctAnswer);
    }

    updateRaceProgress(playerPercent, opponentPercent, correctCount, targetCorrect) {
        document.getElementById('player-car-progress').style.width = `${playerPercent}%`;
        document.getElementById('opponent-car-progress').style.width = `${opponentPercent}%`;
        document.getElementById('player-percentage').textContent = `${Math.round(playerPercent)}%`;
        document.getElementById('opponent-percentage').textContent = `${Math.round(opponentPercent)}%`;
        document.getElementById('correct-count').textContent = correctCount;
        document.getElementById('target-correct').textContent = targetCorrect;
    }

    showFeedback(message, isCorrect) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${isCorrect ? 'rgba(0, 204, 102, 0.95)' : 'rgba(255, 107, 107, 0.95)'};
            color: white;
            padding: 2rem 3rem;
            border-radius: 20px;
            font-size: 2rem;
            font-weight: bold;
            z-index: 9999;
            animation: fadeInOut 1.5s ease;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        `;
        feedback.textContent = message;
        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
        }, 1500);
    }

    showResults(playerWon, correctAnswers, totalQuestions, accuracy, stars, levelNum) {
        const resultIcon = document.getElementById('result-icon');
        const resultTitle = document.getElementById('result-title');
        const resultMessage = document.getElementById('result-message');
        const badgeEarned = document.getElementById('badge-earned');
        const badgeDisplay = document.getElementById('badge-display');

        if (playerWon) {
            resultIcon.textContent = '🏆';
            resultTitle.textContent = 'Victory!';
            resultMessage.textContent = 'You won the race! Amazing driving!';

            // Save progress
            const isFirstTime = !this.progressManager.isLevelCompleted(levelNum);
            this.progressManager.completeLevel(levelNum, stars);

            // Show badge if first time
            if (isFirstTime) {
                badgeEarned.style.display = 'block';
                badgeDisplay.textContent = GAME_LEVELS[levelNum].badge;
            } else {
                badgeEarned.style.display = 'none';
            }
        } else {
            resultIcon.textContent = '😊';
            resultTitle.textContent = 'Keep Trying!';
            resultMessage.textContent = 'Don\'t worry! Every race makes you better!';
            badgeEarned.style.display = 'none';
        }

        // Update stats
        document.getElementById('final-correct').textContent = correctAnswers;
        document.getElementById('final-accuracy').textContent = `${accuracy}%`;
        document.getElementById('stars-earned').textContent = stars > 0 ? '⭐'.repeat(stars) : 'Try again!';

        // Update menu stats
        this.updateStats();
        this.renderLevelSelect();

        // Show results screen
        this.showScreen(this.resultsScreen);
    }

    showPauseMenu() {
        this.pauseMenu.classList.add('active');
        this.gameEngine.pause();
    }

    hidePauseMenu() {
        this.pauseMenu.classList.remove('active');
        this.gameEngine.resume();
    }

    showMainMenu() {
        this.showScreen(this.mainMenu);
        this.gameEngine.isRacing = false;

        // Reset cars to start position
        if (this.gameEngine.playerCar && this.gameEngine.opponentCar) {
            this.gameEngine.playerCar.position.z = 10;
            this.gameEngine.opponentCar.position.z = 10;
            this.gameEngine.playerPosition = 0;
            this.gameEngine.opponentPosition = 0;
            this.gameEngine.camera.position.set(0, 15, 20);
            this.gameEngine.camera.lookAt(0, 0, -10);
        }
    }

    showScreen(screen) {
        // Hide all screens
        [this.loadingScreen, this.mainMenu, this.gameScreen, this.resultsScreen].forEach(s => {
            s.classList.remove('active');
        });

        // Show target screen
        setTimeout(() => {
            screen.classList.add('active');
        }, 50);
    }
}

// Add fade in/out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIController;
}
