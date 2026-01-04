"""
🎓 DYSCALCULIA-FRIENDLY MATH LEARNING GAME
Built with Python + Streamlit

DESIGN PRINCIPLES FOR DYSCALCULIA:
- Large, readable fonts
- High contrast colors
- One concept per screen
- No time pressure
- Immediate positive feedback
- Visual cues (colors, icons, emojis)
- Error-tolerant design
- Clear progress indicators
"""

import streamlit as st
import random
from typing import List, Dict, Tuple

# ============================================================================
# 🎨 PAGE CONFIGURATION - High contrast, clean design
# ============================================================================

st.set_page_config(
    page_title="Math Learning Game",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# ============================================================================
# 🎨 CUSTOM CSS - Dyscalculia-friendly styling
# ============================================================================

st.markdown("""
<style>
    /* Large, readable fonts throughout */
    .main {
        padding: 2rem;
    }

    /* High contrast, large buttons */
    .stButton button {
        font-size: 24px !important;
        padding: 1rem 2rem !important;
        border-radius: 12px !important;
        font-weight: bold !important;
        min-height: 60px;
    }

    /* Large text inputs for answers */
    .stNumberInput input {
        font-size: 32px !important;
        padding: 1rem !important;
        text-align: center !important;
    }

    /* Clear spacing between elements */
    .element-container {
        margin-bottom: 1.5rem;
    }

    /* High contrast progress bar */
    .stProgress > div > div {
        background-color: #00cc66 !important;
    }

    /* Large headers */
    h1 {
        font-size: 3rem !important;
        margin-bottom: 2rem !important;
    }

    h2 {
        font-size: 2.5rem !important;
        margin-bottom: 1.5rem !important;
    }

    h3 {
        font-size: 2rem !important;
    }
</style>
""", unsafe_allow_html=True)

# ============================================================================
# 🎯 GAME CONSTANTS
# ============================================================================

PASS_THRESHOLD = 0.70  # 70% to pass a level
STAGES_PER_LEVEL = 5   # Number of questions per level

# Level definitions with emoji icons for visual recognition
LEVELS = {
    1: {"name": "Number Recognition", "icon": "🔢", "color": "#FF6B6B"},
    2: {"name": "Counting Objects", "icon": "🍎", "color": "#4ECDC4"},
    3: {"name": "Simple Addition", "icon": "➕", "color": "#95E1D3"},
    4: {"name": "Simple Subtraction", "icon": "➖", "color": "#FFE66D"},
    5: {"name": "Mixed Operations", "icon": "🔄", "color": "#A8E6CF"},
    6: {"name": "Real-life Math", "icon": "🛒", "color": "#FF8B94"},
}

# Badge system for visual rewards
BADGES = {
    1: "🥉 Number Novice",
    2: "🍎 Counting Champion",
    3: "➕ Addition Ace",
    4: "➖ Subtraction Star",
    5: "🔄 Math Mixer",
    6: "🏆 Math Master",
}

# ============================================================================
# 🧠 SESSION STATE INITIALIZATION
# ============================================================================

def initialize_session_state():
    """
    Initialize all game state variables.
    Using session_state ensures progress persists during the session.
    """
    if 'initialized' not in st.session_state:
        st.session_state.initialized = True
        st.session_state.current_level = 1
        st.session_state.unlocked_levels = [1]  # Only level 1 unlocked initially
        st.session_state.completed_levels = []
        st.session_state.badges = []
        st.session_state.current_stage = 0
        st.session_state.stage_answers = []
        st.session_state.questions = []
        st.session_state.game_mode = "menu"  # menu, playing, results
        st.session_state.total_stars = 0

# ============================================================================
# 🎮 LEVEL CONTENT GENERATORS
# ============================================================================

def generate_level_1_questions() -> List[Dict]:
    """
    Level 1: Number Recognition
    - Shows numbers and asks for identification
    - Uses multiple choice to reduce anxiety
    - Large, clear numbers
    """
    questions = []
    for _ in range(STAGES_PER_LEVEL):
        target_number = random.randint(1, 20)

        # Generate wrong answers that are close but distinct
        wrong_answers = []
        while len(wrong_answers) < 3:
            wrong = random.randint(max(1, target_number - 5), target_number + 5)
            if wrong != target_number and wrong not in wrong_answers:
                wrong_answers.append(wrong)

        choices = [target_number] + wrong_answers
        random.shuffle(choices)

        questions.append({
            "type": "multiple_choice",
            "question": f"Which number is this?",
            "display_number": target_number,
            "choices": choices,
            "correct_answer": target_number
        })

    return questions

def generate_level_2_questions() -> List[Dict]:
    """
    Level 2: Counting Objects
    - Visual counting with emojis
    - Builds foundation for arithmetic
    - Uses familiar objects
    """
    objects = ["🍎", "⭐", "🌸", "🐶", "🎈", "🍪", "🎁", "🌟"]
    questions = []

    for _ in range(STAGES_PER_LEVEL):
        obj = random.choice(objects)
        count = random.randint(3, 10)

        questions.append({
            "type": "counting",
            "question": f"How many {obj} do you see?",
            "objects": obj * count,  # Repeat emoji
            "correct_answer": count
        })

    return questions

def generate_level_3_questions() -> List[Dict]:
    """
    Level 3: Simple Addition
    - Small numbers (1-10)
    - Visual representation with emojis
    - Builds confidence before complexity
    """
    questions = []
    emojis = ["🍎", "⭐", "🌸", "🎈"]

    for _ in range(STAGES_PER_LEVEL):
        a = random.randint(1, 10)
        b = random.randint(1, 10)
        emoji = random.choice(emojis)

        questions.append({
            "type": "addition",
            "question": f"Add these numbers:",
            "visual": f"{emoji * a} + {emoji * b}",
            "num1": a,
            "num2": b,
            "correct_answer": a + b
        })

    return questions

def generate_level_4_questions() -> List[Dict]:
    """
    Level 4: Simple Subtraction
    - Ensures result is always positive (less confusing)
    - Visual representation
    - Clear, simple language
    """
    questions = []
    emojis = ["🍎", "⭐", "🌸", "🎈"]

    for _ in range(STAGES_PER_LEVEL):
        a = random.randint(5, 15)
        b = random.randint(1, a)  # Ensure positive result
        emoji = random.choice(emojis)

        questions.append({
            "type": "subtraction",
            "question": f"Subtract these numbers:",
            "visual": f"{emoji * a} (take away {b})",
            "num1": a,
            "num2": b,
            "correct_answer": a - b
        })

    return questions

def generate_level_5_questions() -> List[Dict]:
    """
    Level 5: Mixed Operations
    - Combines addition and subtraction
    - Clearly marked operations
    - Prepares for real-world scenarios
    """
    questions = []

    for _ in range(STAGES_PER_LEVEL):
        operation = random.choice(["+", "-"])

        if operation == "+":
            a = random.randint(1, 15)
            b = random.randint(1, 15)
            answer = a + b
        else:
            a = random.randint(5, 20)
            b = random.randint(1, a)
            answer = a - b

        questions.append({
            "type": "mixed",
            "question": f"Solve this problem:",
            "num1": a,
            "num2": b,
            "operation": operation,
            "correct_answer": answer
        })

    return questions

def generate_level_6_questions() -> List[Dict]:
    """
    Level 6: Real-life Math Scenarios
    - Practical applications
    - Story-based problems
    - Reinforces learning with context
    """
    scenarios = [
        {"context": "You have {a} apples 🍎. Your friend gives you {b} more.", "op": "+"},
        {"context": "You have {a} candies 🍬. You eat {b} of them.", "op": "-"},
        {"context": "There are {a} birds 🐦 on a tree. {b} more birds join them.", "op": "+"},
        {"context": "You have {a} stickers ⭐. You give {b} to your friend.", "op": "-"},
        {"context": "You collected {a} shells 🐚 at the beach. You find {b} more.", "op": "+"},
    ]

    questions = []

    for _ in range(STAGES_PER_LEVEL):
        scenario = random.choice(scenarios)

        if scenario["op"] == "+":
            a = random.randint(1, 20)
            b = random.randint(1, 20)
            answer = a + b
            question_text = scenario["context"].format(a=a, b=b) + " How many in total?"
        else:
            a = random.randint(5, 25)
            b = random.randint(1, a)
            answer = a - b
            question_text = scenario["context"].format(a=a, b=b) + " How many are left?"

        questions.append({
            "type": "real_life",
            "question": question_text,
            "correct_answer": answer
        })

    return questions

# Map levels to their question generators
LEVEL_GENERATORS = {
    1: generate_level_1_questions,
    2: generate_level_2_questions,
    3: generate_level_3_questions,
    4: generate_level_4_questions,
    5: generate_level_5_questions,
    6: generate_level_6_questions,
}

# ============================================================================
# 🎯 GAME LOGIC FUNCTIONS
# ============================================================================

def start_level(level_num: int):
    """
    Start a specific level by generating questions and resetting stage progress.
    """
    st.session_state.current_level = level_num
    st.session_state.current_stage = 0
    st.session_state.stage_answers = []
    st.session_state.questions = LEVEL_GENERATORS[level_num]()
    st.session_state.game_mode = "playing"

def submit_answer(user_answer, correct_answer):
    """
    Process user's answer and move to next stage.
    Stores results for final scoring.
    """
    is_correct = (user_answer == correct_answer)
    st.session_state.stage_answers.append({
        "correct": is_correct,
        "user_answer": user_answer,
        "correct_answer": correct_answer
    })

    st.session_state.current_stage += 1

    # If all stages complete, show results
    if st.session_state.current_stage >= STAGES_PER_LEVEL:
        st.session_state.game_mode = "results"

def calculate_score() -> Tuple[int, int, float]:
    """
    Calculate score from stage answers.
    Returns: (correct_count, total_count, percentage)
    """
    correct = sum(1 for ans in st.session_state.stage_answers if ans["correct"])
    total = len(st.session_state.stage_answers)
    percentage = (correct / total) if total > 0 else 0
    return correct, total, percentage

def pass_level(level_num: int):
    """
    Mark level as passed, unlock next level, award badge.
    """
    if level_num not in st.session_state.completed_levels:
        st.session_state.completed_levels.append(level_num)

        # Award badge
        if BADGES[level_num] not in st.session_state.badges:
            st.session_state.badges.append(BADGES[level_num])

        # Unlock next level
        next_level = level_num + 1
        if next_level <= len(LEVELS) and next_level not in st.session_state.unlocked_levels:
            st.session_state.unlocked_levels.append(next_level)

        # Award stars based on performance
        correct, total, percentage = calculate_score()
        if percentage >= 0.90:
            st.session_state.total_stars += 3
        elif percentage >= 0.80:
            st.session_state.total_stars += 2
        else:
            st.session_state.total_stars += 1

def reset_game():
    """
    Reset all progress - useful for testing or starting fresh.
    """
    for key in list(st.session_state.keys()):
        del st.session_state[key]
    st.rerun()

# ============================================================================
# 🎨 UI RENDERING FUNCTIONS
# ============================================================================

def render_main_menu():
    """
    Main menu with level selection.
    Shows locked/unlocked status clearly.
    """
    st.markdown("# 🎓 Math Learning Game")
    st.markdown("### *Learn math at your own pace, with no pressure!*")
    st.markdown("---")

    # Show player stats
    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown(f"### ⭐ Stars: {st.session_state.total_stars}")
    with col2:
        st.markdown(f"### 🏅 Badges: {len(st.session_state.badges)}")
    with col3:
        st.markdown(f"### ✅ Completed: {len(st.session_state.completed_levels)}/6")

    st.markdown("---")
    st.markdown("## 📚 Choose a Level")

    # Display levels in a clean grid
    for level_num, level_info in LEVELS.items():
        is_unlocked = level_num in st.session_state.unlocked_levels
        is_completed = level_num in st.session_state.completed_levels

        # Create a container with color coding
        with st.container():
            col1, col2, col3 = st.columns([1, 3, 1])

            with col1:
                st.markdown(f"## {level_info['icon']}")

            with col2:
                status_text = ""
                if is_completed:
                    status_text = "✅ Completed"
                elif is_unlocked:
                    status_text = "🔓 Unlocked"
                else:
                    status_text = "🔒 Locked"

                st.markdown(f"### Level {level_num}: {level_info['name']}")
                st.markdown(f"*{status_text}*")

            with col3:
                if is_unlocked:
                    button_text = "Play" if not is_completed else "Replay"
                    if st.button(button_text, key=f"level_{level_num}", use_container_width=True):
                        start_level(level_num)
                        st.rerun()
                else:
                    st.button("🔒 Locked", key=f"level_{level_num}", disabled=True, use_container_width=True)

            st.markdown("---")

    # Badges section
    if st.session_state.badges:
        st.markdown("## 🏆 Your Badges")
        badge_text = " ".join(st.session_state.badges)
        st.markdown(f"### {badge_text}")

    # Reset button (small, at bottom)
    st.markdown("")
    st.markdown("")
    if st.button("🔄 Reset All Progress", help="Start completely fresh"):
        reset_game()

def render_question():
    """
    Render current question based on type.
    Large, clear display with minimal distractions.
    """
    question = st.session_state.questions[st.session_state.current_stage]
    level_info = LEVELS[st.session_state.current_level]

    # Header with level info
    st.markdown(f"# {level_info['icon']} {level_info['name']}")

    # Progress bar - visual indicator of stage progress
    progress = (st.session_state.current_stage + 1) / STAGES_PER_LEVEL
    st.progress(progress)
    st.markdown(f"### Question {st.session_state.current_stage + 1} of {STAGES_PER_LEVEL}")
    st.markdown("---")

    # Large question display
    st.markdown(f"## {question['question']}")
    st.markdown("")

    user_answer = None

    # Render based on question type
    if question["type"] == "multiple_choice":
        # Level 1: Number Recognition
        st.markdown(f"# {question['display_number']}", unsafe_allow_html=True)
        st.markdown("### Pick the correct number:")

        # Large buttons for choices
        cols = st.columns(4)
        for idx, choice in enumerate(question["choices"]):
            with cols[idx]:
                if st.button(f"{choice}", key=f"choice_{idx}", use_container_width=True):
                    user_answer = choice

    elif question["type"] == "counting":
        # Level 2: Counting Objects
        st.markdown(f"### {question['objects']}")
        st.markdown("")
        user_answer = st.number_input("Your answer:", min_value=0, max_value=50, step=1, key="count_input")
        if st.button("✅ Submit Answer", use_container_width=True):
            submit_answer(user_answer, question["correct_answer"])
            st.rerun()
        return  # Early return to prevent double submission

    elif question["type"] == "addition":
        # Level 3: Addition with visual
        st.markdown(f"### {question['visual']}")
        st.markdown(f"## {question['num1']} + {question['num2']} = ?")
        user_answer = st.number_input("Your answer:", min_value=0, max_value=100, step=1, key="add_input")
        if st.button("✅ Submit Answer", use_container_width=True):
            submit_answer(user_answer, question["correct_answer"])
            st.rerun()
        return

    elif question["type"] == "subtraction":
        # Level 4: Subtraction with visual
        st.markdown(f"### {question['visual']}")
        st.markdown(f"## {question['num1']} - {question['num2']} = ?")
        user_answer = st.number_input("Your answer:", min_value=0, max_value=100, step=1, key="sub_input")
        if st.button("✅ Submit Answer", use_container_width=True):
            submit_answer(user_answer, question["correct_answer"])
            st.rerun()
        return

    elif question["type"] == "mixed":
        # Level 5: Mixed operations
        st.markdown(f"## {question['num1']} {question['operation']} {question['num2']} = ?")
        user_answer = st.number_input("Your answer:", min_value=0, max_value=100, step=1, key="mixed_input")
        if st.button("✅ Submit Answer", use_container_width=True):
            submit_answer(user_answer, question["correct_answer"])
            st.rerun()
        return

    elif question["type"] == "real_life":
        # Level 6: Real-life scenarios
        user_answer = st.number_input("Your answer:", min_value=0, max_value=100, step=1, key="real_input")
        if st.button("✅ Submit Answer", use_container_width=True):
            submit_answer(user_answer, question["correct_answer"])
            st.rerun()
        return

    # For multiple choice, process immediately when clicked
    if user_answer is not None:
        submit_answer(user_answer, question["correct_answer"])
        st.rerun()

def render_results():
    """
    Show results after completing all stages.
    Encouraging feedback regardless of performance.
    Clear pass/fail status with replay option.
    """
    correct, total, percentage = calculate_score()
    passed = percentage >= PASS_THRESHOLD

    level_info = LEVELS[st.session_state.current_level]

    # Celebratory header
    st.markdown(f"# {level_info['icon']} {level_info['name']}")
    st.markdown("## 🎉 Level Complete!")
    st.markdown("---")

    # Score display - large and clear
    st.markdown(f"### Your Score: {correct} out of {total}")
    st.progress(percentage)
    st.markdown(f"## {int(percentage * 100)}%")
    st.markdown("")

    # Stars earned
    if passed:
        if percentage >= 0.90:
            st.markdown("### ⭐⭐⭐ Amazing! Three stars!")
        elif percentage >= 0.80:
            st.markdown("### ⭐⭐ Great job! Two stars!")
        else:
            st.markdown("### ⭐ Well done! One star!")

    st.markdown("---")

    # Encouraging feedback
    if passed:
        st.success("### 🎊 Congratulations! You passed this level!")

        # Award badge if first time
        if st.session_state.current_level not in st.session_state.completed_levels:
            pass_level(st.session_state.current_level)
            st.balloons()  # Celebration animation
            st.markdown(f"### 🏆 Badge Earned: {BADGES[st.session_state.current_level]}")

            # Check if next level unlocked
            next_level = st.session_state.current_level + 1
            if next_level <= len(LEVELS):
                st.info(f"🔓 **Level {next_level} unlocked!**")

        st.markdown("")
        st.markdown("#### You did great! Keep up the excellent work! 💪")

    else:
        st.warning("### 💪 Not quite there yet, but you're learning!")
        st.markdown(f"#### You need {int(PASS_THRESHOLD * 100)}% to pass. You got {int(percentage * 100)}%.")
        st.markdown("")
        st.markdown("#### Don't worry! Every try helps you learn. Try again! 🌟")

    st.markdown("---")

    # Detailed feedback
    with st.expander("📊 See detailed answers"):
        for idx, answer in enumerate(st.session_state.stage_answers):
            if answer["correct"]:
                st.success(f"Question {idx + 1}: ✅ Correct! (Answer: {answer['correct_answer']})")
            else:
                st.error(f"Question {idx + 1}: Your answer: {answer['user_answer']}, Correct answer: {answer['correct_answer']}")

    st.markdown("")

    # Action buttons
    col1, col2 = st.columns(2)

    with col1:
        if st.button("🔄 Try This Level Again", use_container_width=True):
            start_level(st.session_state.current_level)
            st.rerun()

    with col2:
        if st.button("🏠 Back to Menu", use_container_width=True):
            st.session_state.game_mode = "menu"
            st.rerun()

# ============================================================================
# 🎮 MAIN APPLICATION
# ============================================================================

def main():
    """
    Main application entry point.
    Routes to appropriate screen based on game_mode.
    """
    initialize_session_state()

    # Route to appropriate screen
    if st.session_state.game_mode == "menu":
        render_main_menu()
    elif st.session_state.game_mode == "playing":
        render_question()
    elif st.session_state.game_mode == "results":
        render_results()

if __name__ == "__main__":
    main()
