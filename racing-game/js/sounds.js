/**
 * 🔊 MATH RACING GAME - SOUND MANAGER
 * Handles all game sounds and music with Web Audio API
 */

class SoundManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.isMuted = false;
        this.musicVolume = 0.3;
        this.sfxVolume = 0.5;

        // Initialize audio context on first user interaction
        this.initialized = false;
        this.initOnUserGesture();
    }

    initOnUserGesture() {
        const init = () => {
            if (!this.initialized) {
                try {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    this.initialized = true;
                    console.log('🔊 Sound system initialized');
                } catch (e) {
                    console.warn('Web Audio API not supported', e);
                }
            }
            // Remove listeners after first interaction
            document.removeEventListener('click', init);
            document.removeEventListener('touchstart', init);
            document.removeEventListener('keydown', init);
        };

        document.addEventListener('click', init);
        document.addEventListener('touchstart', init);
        document.addEventListener('keydown', init);
    }

    // Play a simple tone
    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.initialized || this.isMuted || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;
            gainNode.gain.setValueAtTime(volume * this.sfxVolume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.warn('Error playing tone:', e);
        }
    }

    // Sound effects using tones
    playCorrectSound() {
        // Happy ascending notes
        this.playTone(523.25, 0.1, 'sine', 0.4); // C5
        setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.4), 100); // E5
        setTimeout(() => this.playTone(783.99, 0.2, 'sine', 0.5), 200); // G5
    }

    playWrongSound() {
        // Descending tone
        this.playTone(392.00, 0.15, 'triangle', 0.3); // G4
        setTimeout(() => this.playTone(349.23, 0.25, 'triangle', 0.3), 150); // F4
    }

    playEngineSound() {
        // Engine revving sound
        if (!this.initialized || this.isMuted || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = 80;
            oscillator.type = 'sawtooth';
            gainNode.gain.value = 0.1 * this.sfxVolume;

            oscillator.start();

            // Vary the frequency for engine effect
            oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(120, this.audioContext.currentTime + 0.5);
            oscillator.stop(this.audioContext.currentTime + 0.5);
        } catch (e) {
            console.warn('Error playing engine sound:', e);
        }
    }

    playVictorySound() {
        // Victory fanfare
        const notes = [
            { freq: 523.25, time: 0 },    // C5
            { freq: 659.25, time: 0.15 },  // E5
            { freq: 783.99, time: 0.3 },   // G5
            { freq: 1046.50, time: 0.45 }  // C6
        ];

        notes.forEach(note => {
            setTimeout(() => this.playTone(note.freq, 0.3, 'sine', 0.5), note.time * 1000);
        });
    }

    playDefeatSound() {
        // Sad descending notes
        const notes = [
            { freq: 392.00, time: 0 },     // G4
            { freq: 349.23, time: 0.2 },   // F4
            { freq: 293.66, time: 0.4 }    // D4
        ];

        notes.forEach(note => {
            setTimeout(() => this.playTone(note.freq, 0.4, 'triangle', 0.4), note.time * 1000);
        });
    }

    playStartSound() {
        // Race start countdown sound
        this.playTone(440, 0.2, 'square', 0.4); // A4
        setTimeout(() => this.playTone(440, 0.2, 'square', 0.4), 300);
        setTimeout(() => this.playTone(440, 0.2, 'square', 0.4), 600);
        setTimeout(() => this.playTone(880, 0.3, 'square', 0.6), 900); // A5 - GO!
    }

    playClickSound() {
        // UI click sound
        this.playTone(800, 0.05, 'sine', 0.2);
    }

    playSpeedBoostSound() {
        // Whoosh sound for speed boost
        if (!this.initialized || this.isMuted || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.3);
            oscillator.type = 'sawtooth';

            gainNode.gain.setValueAtTime(0.3 * this.sfxVolume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.3);
        } catch (e) {
            console.warn('Error playing boost sound:', e);
        }
    }

    // Background music - simple loop
    startBackgroundMusic() {
        if (!this.initialized || this.isMuted || !this.audioContext) return;

        // Simple melody loop for racing
        const playMusicLoop = () => {
            if (this.isMuted) return;

            const melody = [
                { freq: 261.63, duration: 0.2 }, // C4
                { freq: 293.66, duration: 0.2 }, // D4
                { freq: 329.63, duration: 0.2 }, // E4
                { freq: 392.00, duration: 0.3 }, // G4
                { freq: 329.63, duration: 0.2 }, // E4
                { freq: 293.66, duration: 0.3 }  // D4
            ];

            let time = 0;
            melody.forEach(note => {
                setTimeout(() => {
                    this.playTone(note.freq, note.duration, 'sine', 0.15);
                }, time * 1000);
                time += note.duration + 0.1;
            });

            // Loop the music
            if (!this.isMuted) {
                this.musicTimeout = setTimeout(playMusicLoop, (time + 1) * 1000);
            }
        };

        playMusicLoop();
    }

    stopBackgroundMusic() {
        if (this.musicTimeout) {
            clearTimeout(this.musicTimeout);
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopBackgroundMusic();
        }
        return this.isMuted;
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
    }

    setSfxVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SoundManager;
}
