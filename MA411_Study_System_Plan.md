# MA411 Study System — Gamified Level-Based Learning App

## Context

6 sets of lecture notes for MA411 Probability & Measure Theory. Exam in ~2 months. The original notes are long and unstructured — the core problem is feeling overwhelmed by content. The goal is to **partition the material into levels**, gamify progression, and make daily study feel like a game rather than a chore.

## Core Concept: Levels

Each of the 6 note sets is broken into **3-5 levels** based on natural section boundaries. ~20-25 levels total across the course.

Each level contains three phases:
1. **📖 Read** — The relevant excerpt from the original notes (the actual content you need to learn)
2. **📋 Key Results** — Extracted definitions and theorem statements for that level, presented as a clean reference card
3. **⚔️ Exercises** — The exercises associated with that level's content, with progressive hints

You must complete all three phases to "clear" a level. This gives structure and a sense of progression.

### Proposed Level Breakdown

**Notes 1 — Foundations** (5 levels)
- Level 1: Discrete Probability recap (Defs 1-6, Exs 1-2)
- Level 2: Random variables & expectation in discrete case (Def 7, Thm 7-8, Exs 3-5)
- Level 3: σ-algebras & measure spaces (Defs 22-28, Exs 9-11)
- Level 4: Continuity of measure & completions (Thms 30-31, Exs 12-14)
- Level 5: Carathéodory Extension Theorem (Defs 32, Lemmas 33-35, Thms 36-40, Exs 15-17)

**Notes 2 — Random Variables** (3 levels)
- Level 6: Measurable functions & RV definition (Defs 1-4, Thm 2, Ex 1)
- Level 7: Algebra of measurable functions (Thm 5, Exs 2-3)
- Level 8: Simple functions & approximation (Thms 6-8, Exs 4-5)

**Notes 3 — Concentration of Measure** (3 levels)
- Level 9: Hoeffding's inequality (Thm 2, Lemmas 3-4, Exs 1-2)
- Level 10: Sub-Gaussian random variables & Chernoff method (Exs 3-5)
- Level 11: Applications of concentration (union bound + Hoeffding combo)

**Notes 4 — Conditional Expectation** (4 levels)
- Level 12: Conditional expectation on events (Def 1, Examples 2-3)
- Level 13: Formal definition on σ-algebras (Def 4, Ex 1)
- Level 14: Properties of conditional expectation (tower law, linearity)
- Level 15: Martingale connection & applications

**Notes 5 — Load Balancing** (3 levels)
- Level 16: Model setup & ODE approximation (Example 1, filtration setup)
- Level 17: Differential equations theorem & convergence
- Level 18: Analysis of queue length & practical implications

**Notes 6 — Martingales** (3 levels)
- Level 19: Martingale transforms (Def 1, Ex 1)
- Level 20: Representation theorem for simple random walk (Thm 2, Ex 2)
- Level 21: Stopping times & optional stopping

*Note: Exact level boundaries will be refined when processing each PDF in full. The above is based on the first 3 pages of each notes set.*

---

## The App: React-Based Learning Tool

A single-page React app (built as a Claude artifact or standalone) with these screens:

### 1. Home / Map Screen
- **Visual mastery map**: A node graph showing all ~21 levels as connected nodes
- Nodes are colored: 🔴 locked → 🟡 in-progress → 🟢 mastered
- Connections show dependencies (level 3 depends on level 2, etc.)
- **Stats bar**: Total XP, current streak, levels mastered count
- Tap a node to enter that level

### 2. Level Screen
Three tabs/phases for each level:

**📖 Read tab:**
- The relevant section of notes rendered with LaTeX (KaTeX)
- This is the actual teaching content — extracted from the PDFs
- Scrollable, mobile-friendly
- A "Mark as read" button at the bottom to unlock the next phase

**📋 Key Results tab:**
- Clean cards showing each definition and theorem for this level
- Each card: name, number, one-line plain-English summary, then formal statement
- Can be flipped through like flashcards
- Quick self-test: tap to hide/reveal the formal statement

**⚔️ Exercises tab:**
- One exercise at a time, full-screen
- Progressive reveal: Question → Hint 1 → Hint 2 → Solution (tap to advance)
- After seeing solution: rate yourself (Got it ✅ / Partial 🟡 / Needs work 🔴)
- Must attempt all exercises to complete the level

### 3. Daily Review Screen
- Pulls exercises from completed levels based on spaced repetition schedule
- Shows: "You have N exercises to review today"
- Same hint-reveal + self-rating flow as in levels
- Earning XP for reviews keeps the streak alive

### Gamification Details

**XP System:**
| Action | XP |
|--------|-----|
| Complete a reading | 10 |
| Review all key results in a level | 15 |
| Exercise rated "Got it" (first time) | 25 |
| Exercise rated "Got it" (review) | 10 |
| Exercise rated "Partial" | 5 |
| Complete a full level | 50 bonus |
| Daily streak maintained | 10 × streak_day |

**Streak:**
- Maintained by completing at least 1 exercise or review per day
- Displayed prominently with fire icon
- Streak freeze: 1 free skip stored (earned every 7-day streak)

**Mastery map coloring:**
- Locked (grey): prerequisites not met
- Available (red outline): ready to start
- In progress (yellow): started but not all phases complete
- Mastered (green): all exercises attempted, ≥50% rated "Got it"
- Perfected (gold): all exercises rated "Got it"

**Spaced review schedule** (same as v2, it's sensible):
```
Rating          Next review after
"Needs work"    Next session
"Partial"       3 sessions
"Got it" (1st)  5 sessions
"Got it" (2nd)  10 sessions
"Got it" (3rd+) Mastered — exits queue
```

### Persistent Storage

All state stored in `localStorage` (works offline, persists across sessions):

```javascript
{
  levels: {
    "level_1": {
      readComplete: true,
      keyResultsReviewed: true,
      exercises: {
        "ex1": { rating: "got_it", ratingHistory: ["partial", "got_it"], nextReview: 15 },
        "ex2": { rating: "needs_work", ratingHistory: ["needs_work"], nextReview: 6 }
      },
      status: "mastered" // locked | available | in_progress | mastered | perfected
    }
  },
  global: {
    xp: 450,
    currentSession: 5,
    streakDays: 7,
    lastPracticeDate: "2026-03-10",
    streakFreezes: 1
  }
}
```

---

## Content Architecture: Markdown-First

All course content lives in **markdown files** with a specific tagging format. The app reads and parses these files at load time. This means you can edit any content (fix a typo, improve a hint, add a note) by just editing a `.md` file — no code changes needed.

### Markdown Format Spec

Each level is a single `.md` file following this structure:

```markdown
---
level: 3
title: "σ-algebras & Measure Spaces"
notes: 1
prerequisites: [1, 2]
---

# Level 3: σ-algebras & Measure Spaces

## Reading

The purpose of this section is to move from finite/discrete probability
to the general case. The key question: can we assign probabilities to
*all* subsets of an uncountable $\Omega$? The answer is no (Vitali), so
we need $\sigma$-algebras to specify which sets are "measurable."

[Full teaching content here, written in markdown with LaTeX math...]

## Key Results

### definition: σ-algebra
**Number:** Definition 22
**Plain English:** A collection of sets that's closed under complements and countable unions — the sets we're "allowed" to measure.
**Formal:** A collection $\mathcal{F} \subseteq \mathcal{P}(\Omega)$ is a $\sigma$-algebra if: (i) $\Omega \in \mathcal{F}$, (ii) $A \in \mathcal{F} \Rightarrow A^c \in \mathcal{F}$, (iii) $A_1, A_2, \ldots \in \mathcal{F} \Rightarrow \bigcup_{i=1}^{\infty} A_i \in \mathcal{F}$.
**Load-bearing:** yes

### definition: Probability space (general)
**Number:** Definition 23
**Plain English:** The triple $(\Omega, \mathcal{F}, \mathbb{P})$ where we now require $\mathcal{F}$ to be a $\sigma$-algebra and $\mathbb{P}$ to be countably additive.
**Formal:** ...
**Load-bearing:** yes

### theorem: Continuity of measure
**Number:** Theorem 31
**Plain English:** If sets grow (or shrink) to a limit, the measure converges too.
**Formal:** ...
**Proof sketch:**
1. Write the increasing union as a telescoping disjoint union
2. Apply countable additivity
3. The partial sums are the measures of the finite unions
**Key technique:** Telescoping to make unions disjoint
**Depends on:** Definition 22, Definition 28
**Used by:** Carathéodory proof (Level 5), Exercise 11

## Exercises

### exercise: Union Bound
**Number:** Exercise 10(c)
**Difficulty:** standard
**Tags:** union-bound, countable-additivity, monotonicity

**Question:**
For any countable $I$ and sets $A_i \in \mathcal{F}$ for $i \in I$, prove that
$$\mu\left(\bigcup_{i \in I} A_i\right) \leq \sum_{i \in I} \mu(A_i).$$

**Hint 1:** Make the union disjoint
Define $B_i = A_i \setminus (A_1 \cup \cdots \cup A_{i-1})$. Now you have a disjoint union with $B_i \subseteq A_i$.

**Hint 2:** Finish with monotonicity
Apply countable additivity to the $B_i$, then monotonicity $\mu(B_i) \leq \mu(A_i)$.

**Solution:**
WLOG $I = \mathbb{N}$. Let $B_i = A_i \setminus (A_1 \cup \cdots \cup A_{i-1})$.
Then $\bigcup A_i = \bigsqcup B_i$ (disjoint), so by countable additivity...
[full solution]

### exercise: Another Exercise
...
```

### Parsing Rules for the App

The app uses a lightweight markdown parser (e.g., `marked` + front matter extraction):
- **Front matter** (`---` block): parsed as YAML → level metadata (id, title, prerequisites)
- **`## Reading`**: everything until next `##` → reading content
- **`### definition:` / `### theorem:`**: parsed into key result cards
- **`### exercise:`**: parsed into exercise objects with hints/solution
- **Hint N:** / **Solution:** markers within exercises → progressive reveal stages

This format is:
- Human-readable and editable in any text editor
- Parseable by the app with simple regex/string splitting
- Version-controllable with git (you can see diffs when content changes)

---

## Implementation Plan

### Phase 1: App Build (~2 hours)

Build the React app with:
- Markdown parser that reads level `.md` files
- Home screen with mastery map (grid or force-directed graph)
- Level screen with 3-tab layout (Read / Key Results / Exercises)
- Daily review screen
- XP/streak system
- localStorage persistence for progress (content stays in markdown)
- KaTeX for math rendering
- Responsive design (phone + desktop)

### Phase 2: Content Extraction (~3 hours)

For each of the 6 note sets, Claude processes the full PDF and produces level `.md` files following the format spec above. Done 1-2 note sets per session.

### Phase 3: Test & Iterate (~30 min)

- Test on mobile browser
- Check KaTeX rendering on all levels
- Verify hint/solution collapsing
- Check localStorage persistence

**Total: ~5-6 hours setup, then daily use for 2 months**

---

## Repo Structure

```
prob_measure_study/
├── app/
│   ├── index.html
│   ├── App.jsx
│   ├── components/
│   │   ├── HomeScreen.jsx
│   │   ├── LevelScreen.jsx
│   │   ├── ReviewScreen.jsx
│   │   ├── MasteryMap.jsx
│   │   └── ExerciseCard.jsx
│   ├── hooks/
│   │   ├── useProgress.js       (localStorage state)
│   │   └── useSpacedReview.js   (review scheduling)
│   ├── utils/
│   │   └── markdownParser.js    (parses level .md files into structured data)
│   └── styles/
│       └── app.css
├── content/                     (ALL course content lives here as markdown)
│   ├── level-01.md
│   ├── level-02.md
│   ├── ...
│   └── level-21.md
├── 01Note.pdf ... 06Note.pdf   (original PDFs, kept for reference)
└── MA411_Study_System_Plan_v2.md
```

**Key separation:** `content/` is pure markdown (easy to edit). `app/` is pure code (never needs content changes).

## Verification

- [ ] App loads on mobile browser (Chrome/Safari) with no errors
- [ ] KaTeX renders all mathematical notation from the notes correctly
- [ ] Collapsible hints work via tap on mobile
- [ ] XP increments correctly on exercise completion
- [ ] Streak counter tracks daily practice
- [ ] Mastery map updates node colors as levels are completed
- [ ] localStorage persists data across browser sessions
- [ ] Spaced review queue surfaces the right exercises at the right time
- [ ] All 6 notes' content is loaded and accessible
- [ ] App is usable on both phone and desktop (responsive layout)
