/**
 * 🏎️ MATH RACING GAME - 3D GAME ENGINE
 * Handles Three.js 3D rendering, car physics, and race mechanics
 */

class RacingGameEngine {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.playerCar = null;
        this.opponentCar = null;
        this.track = null;
        this.animationId = null;

        // Game state
        this.isPaused = false;
        this.isRacing = false;
        this.currentLevel = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;

        // Racing physics - TIME-BASED RACE (70 seconds)
        this.playerPosition = 0;
        this.opponentPosition = 0;
        this.playerSpeed = 0;
        this.trackLength = 100;
        this.targetCorrectAnswers = 6; // Need 6+ correct to win

        // Race timer
        this.raceTimer = 0;
        this.maxRaceTime = 70; // 70 seconds total
        this.raceStartTime = 0;

        // Speed constants - INCREASED FOR MORE EXCITING GAMEPLAY
        this.basePlayerSpeed = 4.0; // Base speed (was 2.5)
        this.computerSpeed = 2.2; // Computer speed (was 1.43)
        this.speedBoostCorrect = 7.0; // Speed boost for correct answer (was 4.0)
        this.speedBoostWrong = 1.5; // Slow speed for wrong answer (was 0.8)

        // Controls
        this.keys = {
            accelerate: false,
            brake: false
        };

        this.init();
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLights();
        this.createTrack();
        this.createCars();
        this.setupControls();
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        // Sky gradient background
        this.scene.background = new THREE.Color(0x87CEEB);
        this.scene.fog = new THREE.Fog(0x87CEEB, 50, 200);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            60, // Slightly narrower FOV for better depth perception
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        // Chase camera - positioned behind and above the player car
        this.camera.position.set(0, 8, 18);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Directional light (sun)
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(50, 50, 50);
        dirLight.castShadow = true;
        dirLight.shadow.camera.left = -50;
        dirLight.shadow.camera.right = 50;
        dirLight.shadow.camera.top = 50;
        dirLight.shadow.camera.bottom = -50;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);

        // Hemisphere light for more realistic lighting
        const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x228B22, 0.4);
        this.scene.add(hemiLight);
    }

    createTrack() {
        const trackGroup = new THREE.Group();

        // Ground/grass
        const groundGeometry = new THREE.PlaneGeometry(50, 200);
        const groundMaterial = new THREE.MeshLambertMaterial({
            color: 0x228B22,
            side: THREE.DoubleSide
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        trackGroup.add(ground);

        // Race track (asphalt)
        const trackGeometry = new THREE.PlaneGeometry(12, 180);
        const trackMaterial = new THREE.MeshLambertMaterial({
            color: 0x333333,
            side: THREE.DoubleSide
        });
        const trackMesh = new THREE.Mesh(trackGeometry, trackMaterial);
        trackMesh.rotation.x = -Math.PI / 2;
        trackMesh.position.y = 0.01;
        trackMesh.position.z = -40;
        trackMesh.receiveShadow = true;
        trackGroup.add(trackMesh);

        // Track lane markings
        for (let i = 0; i < 40; i++) {
            const lineGeometry = new THREE.BoxGeometry(0.3, 0.05, 3);
            const lineMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.position.set(0, 0.05, -i * 4.5 - 5);
            trackGroup.add(line);
        }

        // Side barriers (left and right)
        const barrierGeometry = new THREE.BoxGeometry(1, 2, 180);
        const barrierMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000 });

        const leftBarrier = new THREE.Mesh(barrierGeometry, barrierMaterial);
        leftBarrier.position.set(-7, 1, -40);
        leftBarrier.castShadow = true;
        trackGroup.add(leftBarrier);

        const rightBarrier = new THREE.Mesh(barrierGeometry, barrierMaterial);
        rightBarrier.position.set(7, 1, -40);
        rightBarrier.castShadow = true;
        trackGroup.add(rightBarrier);

        // START LINE - Green checkered pattern
        const startGeometry = new THREE.PlaneGeometry(12, 3);
        const startMaterial = new THREE.MeshLambertMaterial({
            color: 0x00FF00,
            side: THREE.DoubleSide
        });
        const startLine = new THREE.Mesh(startGeometry, startMaterial);
        startLine.rotation.x = -Math.PI / 2;
        startLine.position.y = 0.02;
        startLine.position.z = 12;
        trackGroup.add(startLine);

        // START checkered pattern
        for (let i = 0; i < 12; i++) {
            const checkSize = 1;
            const checkGeometry = new THREE.PlaneGeometry(checkSize, checkSize);
            const checkMaterial = new THREE.MeshLambertMaterial({
                color: i % 2 === 0 ? 0x00CC00 : 0xFFFFFF,
                side: THREE.DoubleSide
            });
            const check = new THREE.Mesh(checkGeometry, checkMaterial);
            check.rotation.x = -Math.PI / 2;
            check.position.y = 0.03;
            check.position.x = (i % 4 - 1.5) * 3;
            check.position.z = 12 + Math.floor(i / 4) * checkSize;
            trackGroup.add(check);
        }

        // FINISH LINE - Classic black/white checkered pattern
        const finishGeometry = new THREE.PlaneGeometry(12, 3);
        const finishMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            side: THREE.DoubleSide
        });
        const finish = new THREE.Mesh(finishGeometry, finishMaterial);
        finish.rotation.x = -Math.PI / 2;
        finish.position.y = 0.02;
        finish.position.z = -120;
        trackGroup.add(finish);

        // FINISH checkered pattern
        for (let i = 0; i < 12; i++) {
            const checkSize = 1;
            const checkGeometry = new THREE.PlaneGeometry(checkSize, checkSize);
            const checkMaterial = new THREE.MeshLambertMaterial({
                color: i % 2 === 0 ? 0x000000 : 0xFFFFFF,
                side: THREE.DoubleSide
            });
            const check = new THREE.Mesh(checkGeometry, checkMaterial);
            check.rotation.x = -Math.PI / 2;
            check.position.y = 0.03;
            check.position.x = (i % 4 - 1.5) * 3;
            check.position.z = -120 + Math.floor(i / 4) * checkSize;
            trackGroup.add(check);
        }

        // START/FINISH banners
        const startBannerGeo = new THREE.PlaneGeometry(10, 2);
        const startBannerMat = new THREE.MeshLambertMaterial({ color: 0x00FF00, side: THREE.DoubleSide });
        const startBanner = new THREE.Mesh(startBannerGeo, startBannerMat);
        startBanner.position.set(0, 4, 12);
        trackGroup.add(startBanner);

        const finishBannerGeo = new THREE.PlaneGeometry(10, 2);
        const finishBannerMat = new THREE.MeshLambertMaterial({ color: 0xFF0000, side: THREE.DoubleSide });
        const finishBanner = new THREE.Mesh(finishBannerGeo, finishBannerMat);
        finishBanner.position.set(0, 4, -120);
        trackGroup.add(finishBanner);

        // Banner supports
        for (let side of [-5, 5]) {
            const poleGeo = new THREE.CylinderGeometry(0.2, 0.2, 4, 8);
            const poleMat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
            const startPole = new THREE.Mesh(poleGeo, poleMat);
            startPole.position.set(side, 2, 12);
            trackGroup.add(startPole);

            const finishPole = new THREE.Mesh(poleGeo, poleMat);
            finishPole.position.set(side, 2, -120);
            trackGroup.add(finishPole);
        }

        // Trees/scenery along the track
        for (let i = 0; i < 30; i++) {
            const treeGroup = new THREE.Group();

            // Trunk
            const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 3, 8);
            const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.y = 1.5;
            trunk.castShadow = true;
            treeGroup.add(trunk);

            // Leaves
            const leavesGeometry = new THREE.SphereGeometry(1.5, 8, 8);
            const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
            const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
            leaves.position.y = 3.5;
            leaves.castShadow = true;
            treeGroup.add(leaves);

            // Position trees alternating on left and right
            const side = i % 2 === 0 ? -15 : 15;
            treeGroup.position.set(side, 0, -i * 6 - 10);
            trackGroup.add(treeGroup);
        }

        this.track = trackGroup;
        this.scene.add(this.track);
    }

    createCars() {
        // Player car (blue)
        this.playerCar = this.createCar(0x0066FF);
        this.playerCar.position.set(-3, 0.5, 10);
        this.scene.add(this.playerCar);

        // Opponent car (red)
        this.opponentCar = this.createCar(0xFF0000);
        this.opponentCar.position.set(3, 0.5, 10);
        this.scene.add(this.opponentCar);
    }

    createCar(color) {
        const carGroup = new THREE.Group();

        // Car body
        const bodyGeometry = new THREE.BoxGeometry(2, 1, 4);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.7,
            roughness: 0.3
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.5;
        body.castShadow = true;
        carGroup.add(body);

        // Car cabin
        const cabinGeometry = new THREE.BoxGeometry(1.8, 0.8, 2);
        const cabinMaterial = new THREE.MeshStandardMaterial({
            color: 0x111111,
            metalness: 0.2,
            roughness: 0.8,
            transparent: true,
            opacity: 0.6
        });
        const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
        cabin.position.y = 1.1;
        cabin.position.z = -0.3;
        cabin.castShadow = true;
        carGroup.add(cabin);

        // Wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
        const wheelMaterial = new THREE.MeshStandardMaterial({
            color: 0x222222,
            metalness: 0.8,
            roughness: 0.4
        });

        const wheelPositions = [
            [-1, 0, 1.2],   // front left
            [1, 0, 1.2],    // front right
            [-1, 0, -1.2],  // back left
            [1, 0, -1.2]    // back right
        ];

        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.rotation.z = Math.PI / 2;
            wheel.position.set(...pos);
            wheel.castShadow = true;
            carGroup.add(wheel);
        });

        // Spoiler
        const spoilerGeometry = new THREE.BoxGeometry(2, 0.1, 0.5);
        const spoilerMaterial = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.7,
            roughness: 0.3
        });
        const spoiler = new THREE.Mesh(spoilerGeometry, spoilerMaterial);
        spoiler.position.y = 1.2;
        spoiler.position.z = -2;
        carGroup.add(spoiler);

        return carGroup;
    }

    setupControls() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w') this.keys.accelerate = true;
            if (e.key === 'ArrowDown' || e.key === 's') this.keys.brake = true;
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'w') this.keys.accelerate = false;
            if (e.key === 'ArrowDown' || e.key === 's') this.keys.brake = false;
        });

        // Touch controls for mobile
        const accelerateBtn = document.getElementById('accelerate-btn');
        const brakeBtn = document.getElementById('brake-btn');

        if (accelerateBtn) {
            accelerateBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.keys.accelerate = true;
            });
            accelerateBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keys.accelerate = false;
            });
            accelerateBtn.addEventListener('mousedown', () => this.keys.accelerate = true);
            accelerateBtn.addEventListener('mouseup', () => this.keys.accelerate = false);
        }

        if (brakeBtn) {
            brakeBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.keys.brake = true;
            });
            brakeBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keys.brake = false;
            });
            brakeBtn.addEventListener('mousedown', () => this.keys.brake = true);
            brakeBtn.addEventListener('mouseup', () => this.keys.brake = false);
        }
    }

    startRace(level, questions) {
        this.currentLevel = level;
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.playerPosition = 0;
        this.opponentPosition = 0;
        this.playerSpeed = this.basePlayerSpeed; // Start with base speed
        this.isRacing = true;
        this.isPaused = false;

        // Initialize race timer
        this.raceTimer = 0;
        this.raceStartTime = Date.now();

        // Reset car positions
        this.playerCar.position.z = 10;
        this.opponentCar.position.z = 10;

        this.showNextQuestion();
    }

    showNextQuestion() {
        if (this.currentQuestionIndex < this.questions.length) {
            const question = this.questions[this.currentQuestionIndex];
            if (window.uiController) {
                window.uiController.displayQuestion(question, this.currentQuestionIndex + 1, this.questions.length);
            }
        } else {
            this.endRace();
        }
    }

    answerQuestion(userAnswer, correctAnswer) {
        const isCorrect = String(userAnswer) === String(correctAnswer);

        if (isCorrect) {
            this.correctAnswers++;
            this.playerSpeed = this.speedBoostCorrect; // Speed boost for correct answer
            this.showFeedback('Correct! Speed Boost! 🚀', true);
        } else {
            this.playerSpeed = this.speedBoostWrong; // Slower for wrong answer
            this.showFeedback('Keep trying! Keep racing! 💪', false);
        }

        this.currentQuestionIndex++;

        // Show next question after delay
        setTimeout(() => {
            // Check win conditions
            if (this.correctAnswers >= this.targetCorrectAnswers) {
                this.endRace(true); // Player wins with 6+ correct
            } else if (this.raceTimer >= this.maxRaceTime) {
                this.endRace(false); // Time's up - computer wins
            } else if (this.opponentPosition >= this.trackLength) {
                this.endRace(false); // Computer reached finish
            } else if (this.playerPosition >= this.trackLength) {
                this.endRace(true); // Player reached finish
            } else {
                this.showNextQuestion();
            }
        }, 1500);
    }

    showFeedback(message, isCorrect) {
        // This will be handled by UI controller
        if (window.uiController) {
            window.uiController.showFeedback(message, isCorrect);
        }
    }

    update(deltaTime) {
        if (!this.isRacing || this.isPaused) return;

        // Update race timer
        this.raceTimer = (Date.now() - this.raceStartTime) / 1000; // Convert to seconds

        // Computer car moves at constant speed (completes in 70 seconds)
        this.opponentPosition += this.computerSpeed * deltaTime;

        // Player car moves at current speed (adjusted by answers)
        this.playerPosition += this.playerSpeed * deltaTime;

        // Clamp positions to track length
        this.playerPosition = Math.min(this.playerPosition, this.trackLength);
        this.opponentPosition = Math.min(this.opponentPosition, this.trackLength);

        // Update car Z positions on track
        const maxZ = -120; // Finish line
        const startZ = 10;
        const range = startZ - maxZ;

        this.playerCar.position.z = startZ - (this.playerPosition / this.trackLength) * range;
        this.opponentCar.position.z = startZ - (this.opponentPosition / this.trackLength) * range;

        // Wheel rotation animation
        if (this.playerCar && this.opponentCar) {
            this.playerCar.children.forEach((child, i) => {
                if (i >= 2 && i <= 5) { // Wheels
                    child.rotation.x -= this.playerSpeed * deltaTime * 2;
                }
            });
            this.opponentCar.children.forEach((child, i) => {
                if (i >= 2 && i <= 5) { // Wheels
                    child.rotation.x -= this.computerSpeed * deltaTime * 2;
                }
            });
        }

        // Update UI with progress and timer
        if (window.uiController) {
            window.uiController.updateRaceProgress(
                (this.playerPosition / this.trackLength) * 100,
                (this.opponentPosition / this.trackLength) * 100,
                this.correctAnswers,
                this.targetCorrectAnswers,
                this.raceTimer,
                this.maxRaceTime
            );
        }

        // Check win/lose conditions
        if (this.correctAnswers >= this.targetCorrectAnswers) {
            this.endRace(true); // Won with 6+ correct answers
        } else if (this.raceTimer >= this.maxRaceTime) {
            this.endRace(false); // Time's up!
        } else if (this.opponentPosition >= this.trackLength) {
            this.endRace(false); // Computer finished first
        } else if (this.playerPosition >= this.trackLength) {
            this.endRace(true); // Player finished first
        }

        // Chase camera - smooth follow behind player car
        const cameraOffset = 18; // Distance behind car
        const cameraHeight = 8; // Height above ground
        const targetZ = this.playerCar.position.z;

        // Smooth camera movement
        this.camera.position.z += (targetZ + cameraOffset - this.camera.position.z) * 0.1;
        this.camera.position.y = cameraHeight;
        this.camera.position.x = -3; // Slightly offset to match player car lane

        // Look at point ahead of the car
        const lookAtZ = targetZ - 15;
        this.camera.lookAt(-3, 1, lookAtZ);
    }

    endRace(playerWon) {
        this.isRacing = false;

        const totalQuestions = this.questions.length;
        const accuracy = Math.round((this.correctAnswers / totalQuestions) * 100);

        let stars = 0;
        if (playerWon) {
            if (accuracy >= 90) stars = 3;
            else if (accuracy >= 75) stars = 2;
            else stars = 1;
        }

        if (window.uiController) {
            window.uiController.showResults(playerWon, this.correctAnswers, totalQuestions, accuracy, stars, this.currentLevel);
        }
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        const deltaTime = 0.016; // ~60 FPS
        this.update(deltaTime);

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.renderer.dispose();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RacingGameEngine;
}
