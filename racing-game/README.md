# 🏎️ Math Racing Game - 3D Edition

A **dyscalculia-friendly** 3D math racing game where correct answers power your car to victory! Built with Three.js and vanilla JavaScript, this educational game makes learning math fun and engaging through competitive racing.

## 🎮 Game Concept

Race against a computer opponent on a 3D track. Answer math questions correctly to boost your car's speed. Get 5 correct answers to win the race!

### Key Features

- **3D Graphics**: Beautiful Three.js-powered racing environment
- **7 Progressive Levels**: From number recognition to complex word problems
- **Mobile-Responsive**: Touch controls for phones and tablets
- **Dyscalculia-Friendly**: Large text, high contrast, no time pressure
- **Progressive Learning**: Unlock levels by completing previous ones
- **Star System**: Earn 1-3 stars based on performance
- **Badges & Rewards**: Collect badges for each completed level
- **Local Progress Saving**: Your progress is saved automatically

## 🎯 Game Mechanics

### Racing System
- **Correct Answer**: Speed boost! Your car accelerates
- **Wrong Answer**: Your car slows down (but keeps moving!)
- **Win Condition**: Get 5 correct answers before opponent finishes
- **Lose Condition**: Opponent reaches finish line first

### Controls

**Desktop:**
- `↑` or `W` - Accelerate
- `↓` or `S` - Brake

**Mobile/Touch:**
- Touch the **Gas** button to accelerate
- Touch the **Brake** button to slow down

## 📚 Levels

1. **🔢 Number Recognition** - Identify numbers 1-20
2. **🍎 Counting Objects** - Count visual emoji objects
3. **➕ Simple Addition** - Add numbers 1-10 with visual aids
4. **➖ Simple Subtraction** - Subtract (positive results only)
5. **🔄 Mixed Operations** - Addition and subtraction combined
6. **🛒 Real-life Math** - Story-based practical problems
7. **🏎️ Math Racing Challenge** - True/False racing questions

## 🚀 Deployment

### Quick Deploy

**Netlify:**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/math-racing-game)

**Vercel:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/math-racing-game)

**GitHub Pages:**
1. Push to GitHub
2. Go to Settings → Pages
3. Select `main` branch and `/racing-game` folder
4. Save and your site will be live!

### Local Development

1. Clone the repository
2. Navigate to the `racing-game` directory
3. Serve with any static server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

4. Open http://localhost:8000 in your browser

## 🛠️ Tech Stack

- **Three.js** - 3D graphics and rendering
- **Vanilla JavaScript** - No framework dependencies
- **HTML5 Canvas** - WebGL rendering
- **CSS3** - Responsive design with modern features
- **LocalStorage** - Progress persistence

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

**Requirements:**
- WebGL support (99% of modern browsers)
- JavaScript enabled
- Screen resolution: 320px minimum width

## ♿ Accessibility Features

### Dyscalculia-Friendly Design
- **Large, readable fonts** - Minimum 1rem, up to 3rem for headings
- **High contrast colors** - Easy to distinguish elements
- **No time pressure** - Answer at your own pace
- **Visual feedback** - Icons and colors indicate progress
- **One concept per screen** - Reduced cognitive load
- **Positive reinforcement** - Encouraging messages only

### Additional Accessibility
- **Keyboard navigation** - Full keyboard support
- **Touch-friendly** - Large buttons (minimum 60px height)
- **Responsive design** - Works on all screen sizes
- **Reduced motion support** - Respects user preferences

## 📊 Progress Tracking

Player progress is saved locally using browser LocalStorage:
- Unlocked levels
- Completed levels
- Stars earned per level
- Badges collected
- Total stars

**Note:** Progress is tied to your browser. Clearing browser data will reset progress.

## 🎓 Educational Value

Designed by educators for learners with:
- Dyscalculia
- Math anxiety
- Learning difficulties
- Anyone wanting a fun way to practice math!

### Learning Principles
1. **Gamification** - Makes learning fun and engaging
2. **Immediate Feedback** - Instant response to answers
3. **Progressive Difficulty** - Gradual skill building
4. **Positive Reinforcement** - Focus on encouragement
5. **Visual Learning** - Icons and images support understanding
6. **Low Pressure** - No timers or harsh penalties

## 🔒 Privacy

- **No server communication** - Runs entirely in your browser
- **No data collection** - We don't track or collect any data
- **No cookies** - Only localStorage for progress saving
- **No ads** - Pure educational experience

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- **Three.js** - Amazing 3D library
- **Dyscalculia resources** - Educational research
- **Beta testers** - Feedback from learners and educators

## 📞 Support

Found a bug? Have a suggestion?
- Open an issue on GitHub
- Contact: [your-email@example.com]

---

Made with ❤️ for learners everywhere

**Happy Racing! 🏎️💨**
