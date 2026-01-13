/**
 * 🏎️ MATH RACING GAME - LEVELS DATA
 * Contains all math questions for 7 progressive levels
 * Each level adapted for the racing game format
 */

const GAME_LEVELS = {
    1: {
        name: "Number Recognition",
        icon: "🔢",
        color: "#FF6B6B",
        description: "Identify numbers 1-20",
        badge: "🥉 Number Novice",
        questionCount: 5,
        questionGenerator: function() {
            const questions = [];
            for (let i = 0; i < this.questionCount; i++) {
                const targetNumber = Math.floor(Math.random() * 20) + 1;

                // Generate 3 wrong answers
                const wrongAnswers = [];
                while (wrongAnswers.length < 3) {
                    const wrong = Math.floor(Math.random() * 20) + 1;
                    if (wrong !== targetNumber && !wrongAnswers.includes(wrong)) {
                        wrongAnswers.push(wrong);
                    }
                }

                const choices = [targetNumber, ...wrongAnswers].sort(() => Math.random() - 0.5);

                questions.push({
                    type: "multiple_choice",
                    question: `Which number is this?`,
                    displayNumber: targetNumber,
                    choices: choices,
                    correctAnswer: targetNumber
                });
            }
            return questions;
        }
    },

    2: {
        name: "Counting Objects",
        icon: "🍎",
        color: "#4ECDC4",
        description: "Count visual objects",
        badge: "🍎 Counting Champion",
        questionCount: 5,
        questionGenerator: function() {
            const objects = ["🍎", "⭐", "🌸", "🐶", "🎈", "🍪", "🎁", "🌟"];
            const questions = [];

            for (let i = 0; i < this.questionCount; i++) {
                const obj = objects[Math.floor(Math.random() * objects.length)];
                const count = Math.floor(Math.random() * 8) + 3; // 3-10

                // Generate wrong answers
                const wrongAnswers = [];
                while (wrongAnswers.length < 3) {
                    const wrong = Math.floor(Math.random() * 8) + 3;
                    if (wrong !== count && !wrongAnswers.includes(wrong)) {
                        wrongAnswers.push(wrong);
                    }
                }

                const choices = [count, ...wrongAnswers].sort(() => Math.random() - 0.5);

                questions.push({
                    type: "counting",
                    question: `How many ${obj} do you see?`,
                    objects: obj.repeat(count),
                    choices: choices,
                    correctAnswer: count
                });
            }
            return questions;
        }
    },

    3: {
        name: "Simple Addition",
        icon: "➕",
        color: "#95E1D3",
        description: "Add numbers 1-10",
        badge: "➕ Addition Ace",
        questionCount: 5,
        questionGenerator: function() {
            const emojis = ["🍎", "⭐", "🌸", "🎈"];
            const questions = [];

            for (let i = 0; i < this.questionCount; i++) {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const answer = a + b;
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];

                // Generate wrong answers
                const wrongAnswers = [];
                while (wrongAnswers.length < 3) {
                    const wrong = answer + (Math.floor(Math.random() * 6) - 3);
                    if (wrong > 0 && wrong !== answer && !wrongAnswers.includes(wrong)) {
                        wrongAnswers.push(wrong);
                    }
                }

                const choices = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

                questions.push({
                    type: "addition",
                    question: `${a} + ${b} = ?`,
                    visual: `${emoji.repeat(a)} + ${emoji.repeat(b)}`,
                    num1: a,
                    num2: b,
                    choices: choices,
                    correctAnswer: answer
                });
            }
            return questions;
        }
    },

    4: {
        name: "Simple Subtraction",
        icon: "➖",
        color: "#FFE66D",
        description: "Subtract with positives only",
        badge: "➖ Subtraction Star",
        questionCount: 5,
        questionGenerator: function() {
            const emojis = ["🍎", "⭐", "🌸", "🎈"];
            const questions = [];

            for (let i = 0; i < this.questionCount; i++) {
                const a = Math.floor(Math.random() * 11) + 5; // 5-15
                const b = Math.floor(Math.random() * a) + 1; // 1 to a
                const answer = a - b;
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];

                // Generate wrong answers
                const wrongAnswers = [];
                while (wrongAnswers.length < 3) {
                    const wrong = answer + (Math.floor(Math.random() * 6) - 3);
                    if (wrong >= 0 && wrong !== answer && !wrongAnswers.includes(wrong)) {
                        wrongAnswers.push(wrong);
                    }
                }

                const choices = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

                questions.push({
                    type: "subtraction",
                    question: `${a} − ${b} = ?`,
                    visual: `${emoji.repeat(a)} (take away ${b})`,
                    num1: a,
                    num2: b,
                    choices: choices,
                    correctAnswer: answer
                });
            }
            return questions;
        }
    },

    5: {
        name: "Mixed Operations",
        icon: "🔄",
        color: "#A8E6CF",
        description: "Addition and subtraction",
        badge: "🔄 Math Mixer",
        questionCount: 5,
        questionGenerator: function() {
            const questions = [];

            for (let i = 0; i < this.questionCount; i++) {
                const operation = Math.random() > 0.5 ? '+' : '-';
                let a, b, answer;

                if (operation === '+') {
                    a = Math.floor(Math.random() * 15) + 1;
                    b = Math.floor(Math.random() * 15) + 1;
                    answer = a + b;
                } else {
                    a = Math.floor(Math.random() * 16) + 5; // 5-20
                    b = Math.floor(Math.random() * a) + 1;
                    answer = a - b;
                }

                // Generate wrong answers
                const wrongAnswers = [];
                while (wrongAnswers.length < 3) {
                    const wrong = answer + (Math.floor(Math.random() * 8) - 4);
                    if (wrong > 0 && wrong !== answer && !wrongAnswers.includes(wrong)) {
                        wrongAnswers.push(wrong);
                    }
                }

                const choices = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

                questions.push({
                    type: "mixed",
                    question: `${a} ${operation} ${b} = ?`,
                    num1: a,
                    num2: b,
                    operation: operation,
                    choices: choices,
                    correctAnswer: answer
                });
            }
            return questions;
        }
    },

    6: {
        name: "Real-life Math",
        icon: "🛒",
        color: "#FF8B94",
        description: "Story-based problems",
        badge: "🏆 Math Master",
        questionCount: 5,
        questionGenerator: function() {
            const scenarios = [
                { context: "You have {a} apples 🍎. Your friend gives you {b} more. How many apples do you have?", op: "+" },
                { context: "You have {a} candies 🍬. You eat {b} of them. How many are left?", op: "-" },
                { context: "There are {a} birds 🐦 on a tree. {b} more birds join them. How many birds in total?", op: "+" },
                { context: "You have {a} stickers ⭐. You give {b} to your friend. How many do you have now?", op: "-" },
                { context: "You collected {a} shells 🐚 at the beach. You find {b} more. How many shells now?", op: "+" },
                { context: "You baked {a} cookies 🍪. You gave {b} to neighbors. How many cookies left?", op: "-" },
            ];

            const questions = [];

            for (let i = 0; i < this.questionCount; i++) {
                const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
                let a, b, answer;

                if (scenario.op === '+') {
                    a = Math.floor(Math.random() * 20) + 1;
                    b = Math.floor(Math.random() * 20) + 1;
                    answer = a + b;
                } else {
                    a = Math.floor(Math.random() * 21) + 5; // 5-25
                    b = Math.floor(Math.random() * a) + 1;
                    answer = a - b;
                }

                const questionText = scenario.context.replace('{a}', a).replace('{b}', b);

                // Generate wrong answers
                const wrongAnswers = [];
                while (wrongAnswers.length < 3) {
                    const wrong = answer + (Math.floor(Math.random() * 8) - 4);
                    if (wrong > 0 && wrong !== answer && !wrongAnswers.includes(wrong)) {
                        wrongAnswers.push(wrong);
                    }
                }

                const choices = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

                questions.push({
                    type: "real_life",
                    question: questionText,
                    choices: choices,
                    correctAnswer: answer
                });
            }
            return questions;
        }
    },

    7: {
        name: "Math Racing Challenge",
        icon: "🏎️",
        color: "#87CEEB",
        description: "True/False racing challenge",
        badge: "🏎️ Racing Champion",
        questionCount: 6,
        questionGenerator: function() {
            // Fixed questions for Math Racing Game (Medium Level 1)
            return [
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
        return this.data.unlockedLevels.includes(levelNum);
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
