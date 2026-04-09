# App Breakdown: GitConfidence (DevSkill MVP)

**GitConfidence** is a gamified skill assessment platform designed for developers. It combines professional technical evaluations with RPG-style progression, all wrapped in a high-fidelity Cyberpunk / Sci-Fi aesthetic.

---

## 1. Core Identity & Aesthetic
The application follows a **"Hacker-Noir"** design philosophy:
- **Visuals**: Sleek dark mode (with white light mode support), high-contrast accent colors (Cyber-Blue), and mono-spaced typography for a terminal feel.
- **Tone**: Professional yet immersive, using technical jargon for UI labels (e.g., `Initialize_Protocol`, `Diagnostic_Engine`).
- **Animations**: Heavy use of Framer Motion for smooth transitions between "Views", pulsing loaders, and dynamic state changes.

---

## 2. User Flow & Onboarding

### Phase A: Identification (Landing)
Users start at a terminal-like landing page where they enter:
- **Project Credentials**: Full Name and Email.
- **Domain Selection**: Their primary stack (Frontend, Backend, etc.).
- **Initial Baseline**: Choosing a skill level (Junior, Senior, etc.).

### Phase B: Archetype Initialization (Character Selection)
Before accessing the hub, users must select 1 of 6 character classes, each with unique base stats:
- **CyberSmith**: Balanced (Fullstack focus).
- **NeonNinja**: High Speed/DEX (Frontend focus).
- **QuantumMage**: High INT (Backend focus).
- **ByteBerserker**: High STR (DevOps focus).
- **CircuitSorcerer**: High DEX (Mobile focus).
- **DataDruid**: High INT (Data Science focus).

### Phase C: The Hub (Dashboard)
The main home base where users can:
- View their **Level**, **XP**, and **Gold**.
- Track **Primary Stats** (STR for Problem Solving, INT for Theory, DEX for Speed).
- Access the **Tech Market** (Store) to buy items.
- Review **Session History Logs** (Past quiz results).
- Initiate a **New Diagnostic** (Start Quiz).

---

## 3. Gamification Mechanics

### RPG Progression
- **XP System**: Earned by completing quizzes. Gaining 1000 XP triggers a **Level Up**, automatically boosting STR, INT, and DEX.
- **Gold System**: Earned based on precision. 80%+ scores yield significantly more gold.
- **Inventory/Market**: A shop system where users spend Gold on "Technical Assets" (e.g., *Speed Potion*, *React Mastery Book*). These items provide permanent or temporary stat boosts.

### Stats Breakdown
- **STR (Strength)**: Represents algorithmic prowess and raw problem-solving power.
- **INT (Intelligence)**: Represents theoretical depth and architectural knowledge.
- **DEX (Dexterity)**: Represents execution speed and visual/interaction precision.

---

## 4. Assessment Engine (The Quiz)

### Intelligence Filtering
The quiz system (`useQuiz.ts`) automatically filters questions based on the user's selected **Stack/Domain**. If a user is a "Frontend" specialist, they receive relevant React and JavaScript questions.

### Category Analysis
Every quiz evaluates users across 5 key dimensions:
1. **Algorithms**: Performance on logical/data structure questions.
2. **React**: Knowledge of modern UI frameworks and hooks.
3. **Async**: Handling asynchronous behavior and the event loop.
4. **APIs**: Integration and protocol knowledge.
5. **Testing**: Quality assurance and verification skills.

### Results Report
At completion, the user receives an **ELITE**, **AVERAGE**, or **SUBOPTIMAL** diagnostic rating. A radar/pie chart visualizes the "Archetype Breakdown" using Recharts.

---

## 5. Technical Architecture

### Tech Stack
- **Framework**: React 19 (Functional components, Hooks).
- **Build Tool**: Vite.
- **Styling**: Tailwind CSS v4 (Custom color tokens, high-perf CSS variables).
- **Animations**: Framer Motion v12.
- **Icons**: Lucide React.
- **Charts**: Recharts.
- **Effects**: Canvas Confetti.

### State Management
- **Persistence**: `AuthContext` provides a centralized state that syncs with `localStorage`. All user progress, inventory, and history survive browser refreshes.
- **Modularity**: Data logic is separated into `hooks/useQuiz.ts` and static data lives in `data/questions.ts`.

---

## 6. Project Structure (Key Directories)
```
src/
├── components/          # React Components (Quiz, Dashboard, Results, etc.)
│   └── ui/              # Atomized UI components (Button, Card, Input)
├── context/             # React Context (Auth, Theme)
├── data/                # Static Datasets (Questions, Constants)
├── hooks/               # Custom Logic (useQuiz, useLocalStorage)
├── assets/              # Static assets (SVGs, Images)
├── App.tsx              # View Controller & Routing Logic
├── main.tsx             # Entry point
└── types.ts             # Global Type Definitions
```

---

## 7. Data Models (Key Interfaces)
- **User**: Tracks identity, XP, Gold, Stats, Inventory, and Test History.
- **Question**: ID, Text, Options, Correct Answer, Stack/Category metadata.
- **TestAttempt**: Snapshot of a specific quiz session (Score, Yield, Date).
- **QuizResult**: Calculated analytics passed from the Quiz engine to the Results view.
