# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SPOT (우리동네 SPOT) is a static landing page for a B2B food logistics and consulting platform. The project is intentionally simple - a zero-build static site focused on frontend UX/design with no backend except form submission.

**Language**: Korean (한국어) - All content and UI text is in Korean.

## Development

**No build process required.** Open `index.html` directly in a browser.

To run a local server (optional):
```bash
npx serve .
# or
python -m http.server 8000
```

## Technology Stack

- **Vanilla JavaScript (ES6 Modules)** - No framework
- **Tailwind CSS** (via CDN) - Utility-first styling
- **GSAP 3.12.2 + ScrollTrigger** (via CDN) - Scroll animations
- **Lucide Icons** (via CDN) - Icon library
- **Pretendard Font** (Google Fonts) - Korean-optimized typography

All dependencies are loaded from CDN - no npm/yarn required.

## Architecture

```
spot-project2/
├── index.html    # Main HTML - layout & semantic markup
├── main.js       # Core JavaScript - DOM manipulation, event handlers, GSAP animations
├── data.js       # Data constants - PERSONAS, SETTLEMENT_STEPS, USER_FLOW, FAQS, PARTNERS
└── style.css     # Custom CSS - variables, animations, responsive adjustments
```

### Data Flow

Content is data-driven: `data.js` exports arrays that `main.js` uses to dynamically populate HTML containers on DOMContentLoaded:
- `PERSONAS` → `#persona-grid`
- `SETTLEMENT_STEPS` → `#settlement-steps`
- `USER_FLOW` → `#user-timeline`
- `FAQS` → `#faq-container`

### Key Patterns

1. **Dynamic Content Injection**: Data arrays in `data.js` are iterated to create DOM elements in `main.js`
2. **Modal System**: `window.openModal()` / `window.closeModal()` functions toggle visibility
3. **GSAP Animations**: Hero animations on load, ScrollTrigger batch animations for cards
4. **Audio Player**: HTML5 Audio API for founder message playback with progress tracking
5. **FAQ Accordion**: Click-to-expand with CSS max-height transitions

### CSS Variables

```css
:root {
    --blue-spot: #2563eb;    /* Primary brand color */
    --zinc-100: #f4f4f5;
    --zinc-900: #18181b;
}
```

## Page Sections

| Section | ID | Description |
|---------|-----|-------------|
| Hero | `#hero` | Main value proposition with 3 chip tags |
| Story | `#story` | Brand philosophy, founder message audio |
| Weapons | `#weapons` | Settlement steps system |
| Personas | `#personas` | 3 target customer types (cards) |
| Catalog | `#catalog` | Secret brand list (locked) |
| Process | `#process` | 4-step user flow timeline |
| FAQ | `#faq` | Accordion Q&A for objection handling |
| Modal | `#modal` | Contact form overlay |

## Modifying Content

- **Text/Data**: Edit `data.js` for personas, FAQs, process steps, partners
- **Layout/Structure**: Edit `index.html` for hero sections and static content
- **Styling**: Edit `style.css` for custom animations; use Tailwind classes in HTML for most styling
- **Interactions**: Edit `main.js` for event handlers and animation logic

## Form Submission

Currently shows a success alert only. Backend integration needed for actual form persistence (recommended: Formspree, Google Forms, or serverless function).

## Parent Project Context

The parent directory `spot-project/` contains:
- `agents/` - AI agent prompts for brand/design/dev workflow
- `context/` - Business analysis and research documents
- `outputs/` - AI-generated brand strategy and design assets
- `readme.md` - Comprehensive project documentation with business goals
