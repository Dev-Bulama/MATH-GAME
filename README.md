# 🎓 Dyscalculia-Friendly Math Learning Game

A fully accessible, visual-first educational math game built with Python and Streamlit, specifically designed for learners with dyscalculia.

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

## 📚 Level Overview

1. **🔢 Number Recognition** - Identify numbers with multiple choice
2. **🍎 Counting Objects** - Count visual objects (emojis)
3. **➕ Simple Addition** - Add numbers with visual support
4. **➖ Simple Subtraction** - Subtract with visual support
5. **🔄 Mixed Operations** - Combine addition and subtraction
6. **🛒 Real-life Math** - Apply math to everyday scenarios

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
├── app.py                 # Main application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── .streamlit/
│   └── config.toml       # Streamlit configuration
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

## 🌈 Future Enhancements

Potential additions:
- Sound effects (with toggle)
- Multiple difficulty modes
- Printable progress reports
- Multiplayer options
- More level types
- Custom avatars

---

**Made with ❤️ for accessible learning**

*Remember: Everyone learns at their own pace. This game is a safe, supportive space for building math confidence!*
