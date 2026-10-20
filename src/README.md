# Study Mate — `src/`

Drop-in React source for the SDU Study Mate platform. Plain JSX + CSS, no UI library.

## Install

```bash
npm install react react-dom react-router-dom
```

Entry point: `src/main.jsx` (expects `<div id="root">` in `index.html`).
If your app already has a router, import `src/App.jsx` routes or the pages directly and
delete `main.jsx`.

## Structure

```
src/
├── main.jsx                 mount + BrowserRouter
├── App.jsx                  routes
├── styles/
│   ├── tokens.css           colors, radii, type, layout vars (--sm-*)
│   └── global.css           font import, resets, shared utilities
├── data/                    mock content — swap for your API
├── components/
│   ├── ui/                  primitives: Button, Chip, Panel, Avatar, Diamond,
│   │                        CourseTag, ScoreBadge, Meter, Field, Toggle, Stepper
│   ├── layout/              AppHeader (nav + language), AppLayout, SplitPage,
│   │                        PageHeading, FactGrid
│   ├── browse/              FilterBar, RequestCard, FullRequestCard, BrowseSidebar
│   ├── applicants/          ApplicantCard, LowMatchRow
│   ├── group/               GroupHero, MemberRow, GroupSidebar, PrivacyNote
│   └── profile/             RatingCard, StatGrid, SessionList, StudyStyle
├── pages/                   SignIn, Browse, CreateRequest, Applicants,
│                            GroupDetail, Profile
└── assets/                  sdu-crest.png, sdu-logo.png, sdu-campus.png
```

## Routes

| Path | Screen |
| --- | --- |
| `/` | Sign in (SDU email only) |
| `/browse` | Browse feed |
| `/create` | Create a study request |
| `/applicants` | Applicants + compatibility scores |
| `/groups` | Group detail (accepted member view) |
| `/profile` | Profile with social rating |

## Design system

Every color, radius and font lives in `styles/tokens.css`. Re-theming is one file.

- Navy `--sm-navy` #262A54 — chrome and type
- Peach `--sm-peach` #E9A87C — accent only (diamond bullets, active nav, score badges)
- Warm paper `--sm-paper` #FDFBF7 / `--sm-warm` #F5F2EC — surfaces
- Type: Manrope (UI) + Newsreader (wordmark, group titles, quotes)

Components carry `sm-` prefixed classes so they won't collide with existing styles.

## Viewport

Laptop / desktop only — the shell is full-bleed (`min-height: 100vh`, no max-width, no
rounded frame) and the layouts are fixed two-column. There are no tablet or phone
breakpoints; if you need them later, add media queries per component CSS file.

## Notes

- `data/*.js` holds the placeholder content; the components are prop-driven so you can
  wire real endpoints without touching markup.
- Static fields in the create flow are read-only `<Field>` displays — replace with your
  inputs/selects, keeping the `.sm-field` classes for the styling.
- The campus map in the group sidebar is a placeholder tile; drop your map embed into
  `.sm-gs__mapImage`.
