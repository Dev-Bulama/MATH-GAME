/**
 * 🏎️ MATH RACING GAME - LEVELS DATA (TRUE/FALSE ONLY)
 * All levels now use True/False format for streamlined racing experience
 */

const GAME_LEVELS = {
    1: {
        name: "Number Recognition",
        icon: "🔢",
        color: "#FF6B6B",
        description: "True or False number facts",
        badge: "🥉 Number Novice",
        questionCount: 8,
        questionGenerator: function() {
            const questions = [];
            for (let i = 0; i < this.questionCount; i++) {
                const num1 = Math.floor(Math.random() * 15) + 5;
                const num2 = Math.floor(Math.random() * 15) + 5;
                const isTrue = Math.random() > 0.5;

                let question, correctAns;
                if (isTrue) {
                    const comparison = num1 > num2 ? "greater than" : "less than";
                    question = `${num1} is ${comparison} ${num2}`;
                    correctAns = "True";
                } else {
                    const comparison = num1 < num2 ? "greater than" : "less than";
                    question = `${num1} is ${comparison} ${num2}`;
                    correctAns = "False";
                }

                questions.push({
                    type: "true_false",
                    question: question,
                    choices: ["True", "False"],
                    correctAnswer: correctAns
                });
            }
            return questions;
        }
    },

    2: {
        name: "Counting Practice",
        icon: "🍎",
        color: "#4ECDC4",
        description: "True or False counting",
        badge: "🍎 Counting Champion",
        questionCount: 8,
        questionGenerator: function() {
            const questions = [];

            for (let i = 0; i < this.questionCount; i++) {
                const count = Math.floor(Math.random() * 8) + 3; // 3-10
                const statedCount = Math.random() > 0.5 ? count : count + Math.floor(Math.random() * 3) + 1;
                const isCorrect = count === statedCount;

                questions.push({
                    type: "true_false",
                    question: `${count} + ${count} = ${count * 2}`,
                    choices: ["True", "False"],
                    correctAnswer: "True"
                });
            }
            return questions;
        }
    },

    3: {
        name: "Simple Addition",
        icon: "➕",
        color: "#95E1D3",
        description: "True or False addition",
        badge: "➕ Addition Ace",
        questionCount: 8,
        questionGenerator: function() {
            const questions = [];

            for (let i = 0; i < this.questionCount; i++) {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const correctAnswer = a + b;

                const isTrue = Math.random() > 0.3; // 70% true questions
                const statedAnswer = isTrue ? correctAnswer : correctAnswer + Math.floor(Math.random() * 5) + 1;

                questions.push({
                    type: "true_false",
                    question: `${a} + ${b} = ${statedAnswer}`,
                    choices: ["True", "False"],
                    correctAnswer: statedAnswer === correctAnswer ? "True" : "False"
                });
            }
            return questions;
        }
    },

    4: {
        name: "Simple Subtraction",
        icon: "➖",
        color: "#FFE66D",
        description: "True or False subtraction",
        badge: "➖ Subtraction Star",
        questionCount: 9,
        questionGenerator: function() {
            const questions = [];

            for (let i = 0; i < this.questionCount; i++) {
                const a = Math.floor(Math.random() * 15) + 6; // 6-20
                const b = Math.floor(Math.random() * (a - 1)) + 1; // 1 to a-1
                const correctAnswer = a - b;

                const isTrue = Math.random() > 0.3; // 70% true questions
                const statedAnswer = isTrue ? correctAnswer : correctAnswer + Math.floor(Math.random() * 5) - 2;

                questions.push({
                    type: "true_false",
                    question: `${a} − ${b} = ${statedAnswer}`,
                    choices: ["True", "False"],
                    correctAnswer: statedAnswer === correctAnswer ? "True" : "False"
                });
            }
            return questions;
        }
    },

    5: {
        name: "Mixed Operations",
        icon: "🔄",
        color: "#A8E6CF",
        description: "True or False mixed math",
        badge: "🔄 Math Mixer",
        questionCount: 9,
        questionGenerator: function() {
            const questions = [];

            for (let i = 0; i < this.questionCount; i++) {
                const operation = Math.random() > 0.5 ? '+' : '-';
                let a, b, correctAnswer;

                if (operation === '+') {
                    a = Math.floor(Math.random() * 15) + 1;
                    b = Math.floor(Math.random() * 15) + 1;
                    correctAnswer = a + b;
                } else {
                    a = Math.floor(Math.random() * 16) + 5;
                    b = Math.floor(Math.random() * (a - 1)) + 1;
                    correctAnswer = a - b;
                }

                const isTrue = Math.random() > 0.3;
                const statedAnswer = isTrue ? correctAnswer : correctAnswer + Math.floor(Math.random() * 6) - 3;

                questions.push({
                    type: "true_false",
                    question: `${a} ${operation} ${b} = ${statedAnswer}`,
                    choices: ["True", "False"],
                    correctAnswer: statedAnswer === correctAnswer ? "True" : "False"
                });
            }
            return questions;
        }
    },

    6: {
        name: "Multiplication & Division",
        icon: "✖️",
        color: "#FF8B94",
        description: "True or False × and ÷",
        badge: "🏆 Math Master",
        questionCount: 9,
        questionGenerator: function() {
            const questions = [];

            for (let i = 0; i < this.questionCount; i++) {
                const operation = Math.random() > 0.5 ? '×' : '÷';
                let a, b, correctAnswer;

                if (operation === '×') {
                    a = Math.floor(Math.random() * 10) + 2; // 2-11
                    b = Math.floor(Math.random() * 10) + 2; // 2-11
                    correctAnswer = a * b;
                } else {
                    b = Math.floor(Math.random() * 8) + 2; // 2-9
                    correctAnswer = Math.floor(Math.random() * 10) + 2; // 2-11
                    a = b * correctAnswer; // Ensure clean division
                }

                const isTrue = Math.random() > 0.3;
                const statedAnswer = isTrue ? correctAnswer : correctAnswer + Math.floor(Math.random() * 10) - 5;

                questions.push({
                    type: "true_false",
                    question: `${a} ${operation} ${b} = ${statedAnswer}`,
                    choices: ["True", "False"],
                    correctAnswer: statedAnswer === correctAnswer ? "True" : "False"
                });
            }
            return questions;
        }
    },

    7: {
        name: "Advanced Challenge",
        icon: "🏎️",
        color: "#87CEEB",
        description: "True/False advanced math",
        badge: "🏎️ Racing Champion",
        questionCount: 10,
        questionGenerator: function() {
            const questions = [
                {
                    type: "true_false",
                    question: "12 − 4 = 8",
                    choices: ["True", "False"],
                    correctAnswer: "True"
                },
                {
                    type: "true_false",
                    question: "24 ÷ 2 = 12",
                    choices: ["True", "False"],
                    correctAnswer: "True"
                },
                {
                    type: "true_false",
                    question: "16 × 3 = 45",
                    choices: ["True", "False"],
                    correctAnswer: "False" // Correct is 48
                },
                {
                    type: "true_false",
                    question: "18 − 15 = 3",
                    choices: ["True", "False"],
                    correctAnswer: "True"
                },
                {
                    type: "true_false",
                    question: "13 + 5 = 13",
                    choices: ["True", "False"],
                    correctAnswer: "False" // Correct is 18
                },
                {
                    type: "true_false",
                    question: "11 ÷ 2 = 5",
                    choices: ["True", "False"],
                    correctAnswer: "False" // Correct is 5.5
                }
            ];

            return questions;
        }
    }
};

// Progress tracking
class ProgressManager {
    constructor() {
        this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem('mathRacingProgress');
        if (saved) {
            this.data = JSON.parse(saved);
        } else {
            this.data = {
                unlockedLevels: [1],
                completedLevels: [],
                badges: [],
                stars: {},
                totalStars: 0
            };
        }
    }

    saveProgress() {
        localStorage.setItem('mathRacingProgress', JSON.stringify(this.data));
    }

    isLevelUnlocked(levelNum) {
        // All levels unlocked for free play
        return levelNum >= 1 && levelNum <= 7;
    }

    isLevelCompleted(levelNum) {
        return this.data.completedLevels.includes(levelNum);
    }

    completeLevel(levelNum, stars) {
        if (!this.data.completedLevels.includes(levelNum)) {
            this.data.completedLevels.push(levelNum);
            this.data.badges.push(GAME_LEVELS[levelNum].badge);
        }

        // Update stars if better
        if (!this.data.stars[levelNum] || stars > this.data.stars[levelNum]) {
            const oldStars = this.data.stars[levelNum] || 0;
            this.data.stars[levelNum] = stars;
            this.data.totalStars += (stars - oldStars);
        }

        // Unlock next level
        const nextLevel = levelNum + 1;
        if (nextLevel <= 7 && !this.data.unlockedLevels.includes(nextLevel)) {
            this.data.unlockedLevels.push(nextLevel);
        }

        this.saveProgress();
    }

    getStarsForLevel(levelNum) {
        return this.data.stars[levelNum] || 0;
    }

    getTotalStars() {
        return this.data.totalStars;
    }

    reset() {
        this.data = {
            unlockedLevels: [1],
            completedLevels: [],
            badges: [],
            stars: {},
            totalStars: 0
        };
        this.saveProgress();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GAME_LEVELS, ProgressManager };
}
