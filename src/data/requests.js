export const requests = [
  {
    id: "math-161-integration",
    code: "MATH 161",
    match: 92,
    featured: true,
    title: "Calculus II — integration techniques before Friday's quiz",
    description:
      "Working through the practice set together, then explaining solutions out loud to each other. Bring your own paper.",
    facts: ["Library · 2nd floor", "Today, 14:00 – 16:00", "Quiet work"],
    seatsLeft: 2,
    size: 4,
    owner: {
      initials: "DS",
      name: "Dana S.",
      faculty: "Engineering & Natural Sciences · Year 2",
      rating: 4.8,
    },
  },
  {
    id: "cs-204-graphs",
    code: "CS 204",
    match: 78,
    title: "Data structures — pair-explaining graph traversal",
    description:
      "Whiteboard session. Everyone teaches one algorithm to the group — BFS, DFS, Dijkstra.",
    facts: ["Top floor · study pods", "Today, 17:30 – 19:00", "Talkative"],
    seatsLeft: 3,
    size: 4,
    owner: {
      initials: "AB",
      name: "Arman B.",
      faculty: "Engineering & Natural Sciences · Year 3",
      rating: 4.6,
    },
  },
  {
    id: "eng-102-essay",
    code: "ENG 102",
    match: 71,
    title: "Academic English — essay peer review over coffee",
    description:
      "Bring a draft. We read each other's introductions and thesis statements aloud.",
    facts: ["Canteen · window side", "Tomorrow, 12:30 – 13:30", "Women only"],
    seatsLeft: 1,
    size: 3,
    owner: {
      initials: "MK",
      name: "Madina K.",
      faculty: "Education & Humanities · Year 1",
      rating: 4.9,
    },
  },
];

export const fullRequest = {
  id: "phys-121-mechanics",
  code: "PHYS 121",
  title: "Mechanics problem set — Chapter 6 & 7",
  facts: ["Library · group room B", "Today, 19:00 – 20:30", "4 of 4 joined"],
};

export const suggestions = [
  { title: "Discrete Math — proof drills", meta: "Library · 15:00 · 94% match" },
  { title: "Kazakh History — seminar prep", meta: "Canteen · 13:00 · 87% match" },
];

export const filters = [
  { label: "Subject", value: "All" },
  { label: "Place", value: "Any" },
  { label: "Time", value: "Afternoon" },
];
