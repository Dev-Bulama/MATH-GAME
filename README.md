# 🎓 Dyscalculia-Friendly Math Learning Games

**Two complete games in one repository!** Both specifically designed for learners with dyscalculia.

## 🎮 Choose Your Game

### 1. 🏎️ **3D Math Racing Game** (NEW!)
A standalone 3D racing game where **correct answers boost your car's speed**! Built with Three.js, works on all devices.

- ✨ **Full 3D graphics** with realistic cars and tracks
- 📱 **Mobile-optimized** with touch controls
- 🎯 **All 7 levels** in racing format
- 🚀 **Deploy anywhere** (Netlify, Vercel, GitHub Pages)
- 🆓 **No setup needed** - Pure HTML/CSS/JavaScript

👉 **[Quick Start: 3D Racing Game](#-3d-racing-game)** | **[View Guide](RACING_GAME_GUIDE.md)**

### 2. 📚 **Streamlit Learning Game** (Original)
A comprehensive educational platform with 7 progressive levels, including a racing game level.

- 🎨 **Streamlit-powered** web interface
- 📊 **Detailed progress tracking**
- 🎓 **Educational focus** with visual aids
- ☁️ **Cloud deploy** (Streamlit, Railway, Render)
- 🐍 **Python-based**

👉 **[Quick Start: Streamlit Game](#-streamlit-learning-game)**

---

## 📊 Which Game Should I Use?

| Feature | 3D Racing Game | Streamlit Game |
|---------|----------------|----------------|
| **Best For** | Public websites, viral sharing | Educational institutions, controlled environments |
| **Setup** | ✅ Zero setup - just HTML files | ⚙️ Requires Python installation |
| **Deployment** | ✅ Free (Netlify, Vercel, GitHub Pages) | ⚙️ Streamlit Cloud, Railway, Render |
| **Mobile** | ✅ Excellent - Touch controls | ✅ Good - Responsive design |
| **Graphics** | 🎮 3D racing environment | 📚 Clean educational interface |
| **Engagement** | 🏎️ High - Racing game format | 📊 Moderate - Traditional quiz format |
| **All Levels** | ✅ Yes - All 7 levels as races | ✅ Yes - All 7 levels + racing level |
| **Offline** | ✅ Can add PWA support | ❌ Needs server |
| **Cost** | 💰 Free forever | 💰 Free tier available |
| **Customization** | 🛠️ Easy - Edit JS files | 🛠️ Easy - Edit Python code |
| **File Size** | 📦 ~150KB total | 📦 ~50KB + Python dependencies |

**Recommendation:**
- 🏎️ **Use 3D Racing Game** if you want maximum engagement, mobile experience, and easy deployment
- 📚 **Use Streamlit Game** if you prefer traditional learning interface or need Python customization

---

## 🚀 Quick Deploy (One-Click)

Deploy this game instantly to get a public URL you can share:

[![Deploy on Streamlit](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://share.streamlit.io/)

**Alternative Free Platforms:**
- **Railway:** [Deploy to Railway](https://railway.app/new) → Connect GitHub → Select this repo
- **Render:** [Deploy to Render](https://render.com/deploy) → Connect GitHub → Select this repo
- **Fly.io:** [Deploy to Fly.io](https://fly.io/docs/hands-on/install-flyctl/) → `fly launch` in terminal

> **Note:** For Streamlit Cloud (recommended), you'll need to sign in with GitHub, select this repository (`Dev-Bulama/MATH-GAME`), branch (`claude/dyscalculia-math-game-v3Jsi`), and main file (`app.py`).

## 🌟 Features

### ✨ Dyscalculia-Optimized Design
- **Large, readable fonts** throughout the interface
- **High contrast colors** for better visibility
- **One concept per screen** to minimize cognitive overload
- **No time pressure** - learn at your own pace
- **Immediate positive feedback** for every action
- **Visual cues** using emojis, colors, and icons
- **Error-tolerant design** with encouraging messages

### 🎮 Game Features
- **6 Progressive Levels** from number recognition to real-life math
- **Sequential Level Unlocking** - must pass each level to progress
- **5 Stages per Level** with increasing difficulty
- **70% Pass Threshold** - fair and achievable
- **Replay System** - try again without penalty
- **Visual Rewards** - badges, stars, and celebrations
- **Progress Tracking** - see your achievements

---

## 🏎️ 3D Racing Game

### Quick Deploy (5 Minutes!)

**Netlify (Recommended):**
1. Go to [Netlify](https://www.netlify.com/) and sign up
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Set base directory: `racing-game`
5. Deploy!

**Local Testing:**
```bash
cd racing-game
python -m http.server 8000
# Open http://localhost:8000
```

### Features
- 🎮 **3D Racing Environment** - Realistic cars, track, and scenery
- 📱 **Mobile Touch Controls** - Gas and Brake buttons
- 🎯 **Racing Mechanics** - Correct answers = speed boost
- 🏆 **7 Progressive Levels** - All math topics in racing format
- ⭐ **Star System** - Earn 1-3 stars per level
- 🎖️ **Badges** - Collect rewards for completing levels
- 💾 **Auto-Save** - Progress saved to browser localStorage

### How to Play
1. Answer math questions
2. Correct answer → Your car speeds up 🚀
3. Wrong answer → Your car slows down (but keeps moving!)
4. Get 5 correct answers to WIN the race!

📖 **[Full 3D Racing Game Guide →](RACING_GAME_GUIDE.md)**

---

## 📚 Streamlit Learning Game

### Level Overview

1. **🔢 Number Recognition** - Identify numbers with multiple choice
2. **🍎 Counting Objects** - Count visual objects (emojis)
3. **➕ Simple Addition** - Add numbers with visual support
4. **➖ Simple Subtraction** - Subtract with visual support
5. **🔄 Mixed Operations** - Combine addition and subtraction
6. **🛒 Real-life Math** - Apply math to everyday scenarios
7. **🏎️ Math Racing Game** - True/False racing challenge

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Clone or download this repository**

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Run the game:**
```bash
streamlit run app.py
```

4. **Open your browser** to `http://localhost:8501`

## 🌐 Deployment

### Streamlit Cloud (Recommended)

1. Push this repository to GitHub
2. Go to [streamlit.io/cloud](https://streamlit.io/cloud)
3. Create a new app and point to your repository
4. Deploy! ✨

The app is fully configured for Streamlit Cloud deployment.

### Other Platforms

The app can be deployed on:
- **Heroku** - Use the Streamlit buildpack
- **Google Cloud Run** - Containerize with Docker
- **AWS/Azure** - Use their app hosting services

## 🎯 How to Play

1. **Start at Level 1** - Number Recognition
2. **Answer 5 questions** per level
3. **Get 70% or higher** to pass and unlock the next level
4. **Earn badges and stars** for completing levels
5. **Replay levels** anytime to improve your score

## 🏆 Scoring System

- **⭐ One Star:** 70-79% correct
- **⭐⭐ Two Stars:** 80-89% correct
- **⭐⭐⭐ Three Stars:** 90%+ correct

## 🎨 Design Principles

This game follows evidence-based principles for supporting learners with dyscalculia:

### Cognitive Load Reduction
- Minimal distractions
- Clear visual hierarchy
- One task at a time
- Ample white space

### Visual Support
- Emoji-based counting
- Color-coded levels
- Progress indicators
- Large, clear numbers

### Emotional Support
- No punishment language
- Encouraging feedback always
- Celebration of achievements
- Safe to make mistakes

### Structured Progression
- Sequential unlocking prevents overwhelm
- Gradual difficulty increase
- Repetition through replay
- Clear goals

## 🛠️ Technical Details

### Built With
- **Python 3.8+**
- **Streamlit** - Web framework
- **Session State** - Progress tracking

### Project Structure
```
MATH-GAME/
├── app.py                      # Streamlit main application
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── RACING_GAME_GUIDE.md       # 3D Racing Game complete guide
├── .streamlit/
│   └── config.toml            # Streamlit configuration
├── racing-game/                # 3D Racing Game (NEW!)
│   ├── index.html             # Main game page
│   ├── css/
│   │   └── styles.css         # Responsive styling
│   ├── js/
│   │   ├── levels.js          # All 7 levels
│   │   ├── game-engine.js     # 3D engine & physics
│   │   ├── ui-controller.js   # UI management
│   │   └── main.js            # Initialization
│   ├── netlify.toml           # Netlify config
│   ├── vercel.json            # Vercel config
│   └── README.md              # Racing game docs
```

### Key Components

- **Level System:** Sequential progression with unlock mechanism
- **Question Generators:** Randomized questions for each level
- **Scoring Engine:** Fair assessment with 70% pass threshold
- **Reward System:** Badges and stars for motivation
- **Session State:** Persistent progress during gameplay

## 🔧 Customization

### Adjusting Difficulty

Edit `app.py` to customize:

```python
PASS_THRESHOLD = 0.70    # Change pass percentage
STAGES_PER_LEVEL = 5     # Change questions per level
```

### Adding New Levels

1. Add level to `LEVELS` dictionary
2. Create a question generator function
3. Add to `LEVEL_GENERATORS` mapping
4. Create a badge in `BADGES`

### Modifying Question Types

Each level has its own generator function:
- `generate_level_1_questions()` - Number recognition
- `generate_level_2_questions()` - Counting
- etc.

Modify these to change question content and difficulty.

## 🎓 Educational Value

### Skills Developed
- Number recognition and identification
- Visual counting abilities
- Basic arithmetic (addition/subtraction)
- Problem-solving skills
- Real-world math application
- Confidence with numbers

### Target Audience
- Children with dyscalculia (ages 6+)
- Teens needing math support
- Adults improving numeracy
- Anyone wanting stress-free math practice

## 🤝 Accessibility Features

- **Screen reader friendly** (semantic HTML)
- **Keyboard navigable** (all buttons accessible)
- **High contrast mode** (theme configuration)
- **No time limits** (self-paced learning)
- **Clear feedback** (visual and textual)

## 📝 License

This project is provided as-is for educational purposes.

## 🙏 Acknowledgments

Designed with input from:
- Educational psychology research on dyscalculia
- Accessibility guidelines (WCAG)
- User experience best practices
- Evidence-based learning principles

## 📞 Support

If you encounter any issues:
1. Check that all dependencies are installed
2. Ensure Python 3.8+ is being used
3. Try clearing browser cache
4. Restart the Streamlit server

## 🎯 Common Use Cases

### For Teachers
- **In Classroom**: Use Streamlit game on shared computer
- **Remote Learning**: Deploy 3D racing game and share link
- **Homework**: Students can play 3D racing game on phones
- **Progress Tracking**: Both games track progress automatically

### For Parents
- **Home Practice**: Install Streamlit game or use deployed 3D racing game
- **On-the-Go Learning**: 3D racing game works on tablets and phones
- **Multiple Children**: Each uses their own browser profile

### For Tutors
- **Session Tool**: Streamlit game for structured lessons
- **Fun Rewards**: 3D racing game as achievement reward
- **Mobile Practice**: Share 3D racing game link for home practice

## 🌈 Future Enhancements

Potential additions:
- Sound effects (with toggle)
- Multiple difficulty modes
- Printable progress reports
- Multiplayer racing mode
- More level types
- Custom car skins
- Leaderboards
- Parent/teacher dashboard

## 🎓 Educational Research

Both games are based on:
- **Dyscalculia research** - Understanding number processing difficulties
- **Cognitive load theory** - Reducing mental burden
- **Visual learning principles** - Supporting multiple learning styles
- **Gamification research** - Motivation through engagement
- **Accessibility standards** - WCAG compliance

## 📈 Success Metrics

What makes these games effective:
- ✅ **Positive Reinforcement**: Encouraging messages only
- ✅ **Progressive Difficulty**: Build skills gradually
- ✅ **Immediate Feedback**: Know right away if correct
- ✅ **Visual Support**: See the math, not just numbers
- ✅ **No Pressure**: Learn at your own pace
- ✅ **Achievement System**: Celebrate every success

---

**Made with ❤️ for accessible learning**

*Remember: Everyone learns at their own pace. These games are safe, supportive spaces for building math confidence!*

## 🚀 Get Started Now!

**Want the 3D Racing Game?**
1. Go to [Netlify](https://www.netlify.com/)
2. Deploy from this repository (folder: `racing-game`)
3. Share the URL with learners!

**Want the Streamlit Game?**
1. Clone this repository
2. Run `streamlit run app.py`
3. Or deploy to [Streamlit Cloud](https://streamlit.io/cloud)

**Questions?** Check out:
- 📖 [3D Racing Game Full Guide](RACING_GAME_GUIDE.md)
- 📖 [Deployment Instructions](DEPLOYMENT.md)
- 📖 [Usage Guide](USAGE_GUIDE.md)
