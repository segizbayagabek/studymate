# StudyMate — Frontend

The React web app for **StudyMate**, a tool that helps SDU students find people for group study.

Project documentation (SRS, ERD, Figma designs) lives on the [`main`](https://github.com/aliwer-qanadil/studymate/tree/main) branch.

---

## Tech Stack

* React
* Vite
* Tailwind CSS
* React Router

---

## Running the App

```bash
git clone https://github.com/aliwer-qanadil/studymate.git
cd studymate
git checkout frontend
npm install
npm run dev
```

Then open the local URL that Vite prints in your browser.

Other commands:

```bash
npm run build   # production build into dist/
npm run lint    # check the code with ESLint
```

---

## Folder Structure

```
src/
├── main.jsx            app entry point
├── App.jsx             routes and shared state
├── index.css           global styles (Tailwind)
├── assets/             images (SDU logo, crest, campus photo)
├── data/               sample data (study requests)
├── pages/              one file per page: Login, Browse, Create
└── components/
    ├── common/         used on several pages (Navbar, Label, Diamond, CourseTag)
    ├── login/          sections of the Login page
    ├── browse/         sections of the Browse page
    └── create/         sections of the Create page
```

## Pages

| Route     | Page   | What it does                          |
| --------- | ------ | ------------------------------------- |
| `/`       | Login  | Sign in with an SDU account           |
| `/browse` | Browse | See open study groups and filter them |
| `/create` | Create | Post a new study request              |
