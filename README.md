# Roshni · روشنی

**An offline Windows app that takes an adult learner from the alphabet to Matric level in Urdu, English and Math.**

Roshni was built for a 19-year-old whose mother tongue is Saraiki, who left school early and is now preparing to pass Matric as a private candidate. It runs on a laptop with no internet, keeps the student to a fixed daily plan, and gives the teacher a password-protected panel to follow every lesson, test and weak spot.

![Student home: today's lessons](docs/screenshots/04-week-plan.png)

---

## The course

17 weeks, opened one day at a time. English and Urdu are the main goal; Math is secondary. A study day is long on purpose, about 6–7 hours.

| Weeks | Level | What the student does |
|---|---|---|
| 1–4 | Basic (PlayGroup – Class 5) | Alphabets, first words, reading short sentences, counting to times tables |
| 5–8 | Intermediate (Class 6 – 8) | Longer stories, grammar, letters and essays, fractions to simple algebra |
| 9–12 | Advanced (Class 9 – 10) | Matric essays, letters, applications, poetry, translation; equations, geometry, statistics, money |
| 13 | Advanced | **The 12 tenses** in English and Urdu, in very simple words (no Math) |
| 14–17 | Exam practice | **One 4-hour test every day**: Urdu, English and Math papers drawn from the whole course |

Every lesson is original writing that follows the order of the Punjab Textbook Board books (links to the books are shown in the teacher panel). Each study day also has four extra "daily pack" lessons: an English reading, a listen-and-speak lesson, an Urdu → English translation drill and an Urdu reading.

## Features

### For the student

- **Today only.** Lessons open day by day and in order; the next lesson stays locked until the one before it is finished.
- **A lesson counts as done** only when every quiz is passed (90%), the notebook writing is ticked and enough time has been spent on it.
- **Word-by-word Urdu** under every word of every English sentence, plus the full Urdu meaning below.
- **Everything speaks.** Tap any word, sentence or option to hear it: Urdu with Google's Urdu voice, English with Microsoft's Ava voice. All 18,000+ clips are bundled, so no internet is needed.
- **Urdu lessons are all Urdu**: titles, rules, questions and options, in Nastaliq.
- **Look-alike questions**: the options are the same sentence in different tenses (or with one helping verb changed), so guessing doesn't work and the score shows real understanding.
- **Weekly test**: a laptop test made fresh from the week's quizzes, then a written/oral part marked by the teacher. A failed test gives 2 revision days and a retest.
- **Exam weeks**: test passages appear in English only, without the Urdu help.

### For the teacher

Press **Ctrl + Shift + D** and enter the teacher password.

- **Overview**: current week, study time today and this week, a 21-day study chart and recent activity.
- **Tests**: every test result; enter the marks of the written part; print the week's written test sheet.
- **Lessons**: every lesson of any week with its status, time spent and best scores; open any lesson to check it.
- **Weak spots**: the questions the student gets wrong most.
- **Report**: a printable progress report.
- **Controls**: skip a week, open the test early, move the student to any week and day, a testing mode that unlocks everything, and a full reset.
- **Settings**: pass marks, minimum time per lesson, study days per week (and per week), idle timeout, student details and password.

## Screenshots

### Student

| | |
|---|---|
| ![First run](docs/screenshots/01-setup.png) **First run**: only the student's name and age | ![Home](docs/screenshots/02-student-home.png) **Home**: today's lessons, by day |
| ![Test checklist](docs/screenshots/03-test-checklist.png) **Before the weekly test**: what is still to do | ![English reading](docs/screenshots/05-english-word-by-word.png) **English reading** with word-by-word Urdu |
| ![Urdu story](docs/screenshots/06-urdu-story.png) **Urdu reading** as a flowing story; tap any sentence to hear it | ![Math](docs/screenshots/20-math-learn-card.png) **Math**: learn card, worked examples, quick sums |
| ![Tenses in English](docs/screenshots/07-tenses-english.png) **Week 13: tenses in English**, with positive, negative and question | ![Tenses in Urdu](docs/screenshots/08-tenses-urdu.png) **Week 13: tenses in Urdu** |
| ![Look-alike questions](docs/screenshots/09-look-alike-questions.png) **Look-alike questions**: the same sentence in three tenses | ![Exam week](docs/screenshots/21-exam-week.png) **Exam weeks**: one 4-hour test a day |
| ![Exam paper](docs/screenshots/22-exam-english-paper.png) **Exam paper**: translation and look-alike sections | ![Laptop test](docs/screenshots/23-weekly-laptop-test.png) **Weekly laptop test**: no going back |

### Teacher

| | |
|---|---|
| ![Teacher login](docs/screenshots/10-teacher-login.png) **Teacher login** (Ctrl + Shift + D) | ![Overview](docs/screenshots/11-teacher-overview.png) **Overview** |
| ![Tests](docs/screenshots/12-teacher-tests.png) **Tests** and marks entry | ![Printable test](docs/screenshots/17-teacher-printable-test.png) **Printable written test** |
| ![Lessons](docs/screenshots/13-teacher-lessons.png) **Lessons** of any week | ![Weak spots](docs/screenshots/14-teacher-weak-spots.png) **Weak spots** |
| ![Report](docs/screenshots/15-teacher-report.png) **Report** | ![Controls](docs/screenshots/18-teacher-controls.png) **Controls** |
| ![Settings](docs/screenshots/16-teacher-settings.png) **Settings** | |

## Install on Windows

1. Download `Roshni Setup x.y.z.exe` (from Releases, or build it as below).
2. Run it and follow the steps. It creates a desktop shortcut.
3. On first run, enter the student's name and age.
4. Open the teacher panel (**Ctrl + Shift + D**) and **change the default password** in Settings straight away. The default is set in `src/lib/db.ts`.

Progress is saved in a local file on the laptop; nothing is sent anywhere.

## Development

Requirements: Node.js 20+.

```bash
npm install
npm run dev      # the app in the browser at http://localhost:4000
npm run app      # the app in Electron
npm run build    # type-check and build
npm run dist     # build the Windows installer into release/
```

### Tech

Vite 7 · React 19 · TypeScript · Tailwind CSS v4 · Electron · Lucide icons · Twemoji · Lexend and Noto Nastaliq Urdu fonts.

### Project layout

```
electron/            Electron main and preload (saves progress to a local JSON file)
src/
  content/
    plan.ts          the 17 weeks: titles, goals, books, study days
    week1 … week12/  lessons per subject + daily packs + the weekly written test
    week13/          the 12 tenses, built from content/tenses.ts
    exams.ts         weeks 14–17: daily 4-hour tests drawn from the whole course
    tenses.ts        14 sentence sets, each written in all 12 tenses (English + Urdu)
    helpers.ts       quiz builders, daily packs
    glossary-words.ts  English → Urdu meanings for word-by-word translation
  lib/               schedule (weeks, tests, revision), test generator, storage, audio
  screens/           Home, Lesson, Test, PrintTest, Admin, Setup
  components/        lesson blocks, quizzes, readings, UI
public/audio/        one mp3 per spoken phrase
scripts/             content tools (below)
```

### Adding or changing content

Lessons are TypeScript data. After changing content:

```bash
npx tsx scripts/missing-words.ts --list   # English words with no Urdu meaning yet → add to glossary-words.ts
npm run speech                            # collect every phrase to speak into scripts/speech.json
python scripts/gen_audio.py               # record the missing audio (pip install edge-tts gTTS)
npm run emoji                             # copy the emoji images used by lessons
```

`gen_audio.py` skips clips that already exist, so it only records what is new.

---

Made with ❤️ by Aqeel Ahmed.
