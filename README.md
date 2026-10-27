# AI-Powered Career Readiness & Personalized Learning Platform

A modern, responsive, and client-side web application designed to bridge the gap between academic preparation and real-world tech industry requirements.

---

## 🚀 Key Features

1. **Authentication & Profile Management**
   - Clean registration and login interfaces.
   - 1-Click instant demo logins for Web Developer, Java Developer, and Data Analyst personas.
   - 100% persistent local storage without requiring external paid backends or API keys.

2. **Career Readiness Dashboard**
   - Personalized welcome banner and dynamic career readiness score metric (0–100%).
   - Daily study goals vs. completed time tracking with visual progress indicators.
   - Quick action center to jump directly into resumes, gap analysis, roadmaps, and focus mode.

3. **In-Browser Resume Analysis**
   - Drag-and-drop or file upload supporting **PDF**, **DOCX**, and **TXT** formats.
   - Client-side token extraction against a curated 30+ technical skill dictionary.
   - Built-in 1-click sample resume templates for instant evaluation.
   - Student confirmation workflow allowing manual addition or removal of skills.

4. **Skill Gap Analysis**
   - Benchmark confirmed competencies against target career requirements (Java, Python, Web Dev, Data Analyst, AI Engineer).
   - Categorized by Core Essential, Recommended, and Bonus skills.
   - **Student Fairness Principle**: Never assumes an absent resume skill means the student lacks it—includes a 1-click *"I already know this"* quick-verification checklist.

5. **Personalized Learning Roadmaps**
   - Structured curriculums tailored to each career track.
   - Interactive study modules with key concepts, code previews, and direct resource links.
   - Instant-grading 3-question mini-quizzes with detailed explanations.
   - Hands-on practical project briefs with required deliverables.
   - Progress saved continuously in `localStorage`.

6. **Flexible Study Planner**
   - Preset durations: 30 minutes, 1 hour, 2 hours, or custom minutes.
   - Interactive 7-day weekly study timetable (Monday to Sunday) with customizable topic assignments.

7. **Focus Mode (Deep Work Sprint)**
   - Working focus countdown timer with **Start**, **Pause**, and **Reset** controls.
   - Synthesized Web Audio API completion chimes.
   - Distraction blocker pledge with toggleable apps (Instagram, YouTube, TikTok, Reddit, etc.).
   - Explicit technical explanation on browser sandboxing constraints regarding Android applications.

8. **Voice Encouragement Coach**
   - Uses native browser `window.speechSynthesis` to speak encouraging feedback, focus milestone completions, and welcome greetings.
   - Full user control: voice selector, speech rate (0.75x–1.4x), pitch adjustment, and mute/unmute toggle.

9. **In-App Notifications & Reminders**
   - Notification drawer with study reminders, streak alerts, and milestone celebrations.

10. **Reports & Analytics**
    - Visual weekly progress SVG charts (Target vs. Actual minutes).
    - Status ledger tracking each module, estimated duration, and quiz accuracy.
    - Export options: Formatted printable summary (`window.print()`) and JSON download.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (with `@tailwindcss/vite`)
- **Icons**: Lucide React
- **Audio & Speech**: Browser Web Audio API & Web Speech Synthesis API
- **Persistence**: Browser `localStorage` (Zero external database required)

---

## 💻 Local Setup & Development Instructions

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your machine.

### 2. Opening in Visual Studio Code
1. Download or extract the project folder.
2. Open **Visual Studio Code**.
3. Select **File > Open Folder...** and choose this project directory.

### 3. Installation
Open the integrated terminal in VS Code (`Ctrl + ~` or `Cmd + ~`) and install dependencies:

```bash
npm install
```

### 4. Running the Development Server
Start the local Vite development server:

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```
*(or the port indicated in your terminal)*

### 5. Building for Production
To build the optimized static production bundle:

```bash
npm run build
```

---

## 📄 License
Apache-2.0
