export const profile = {
  initials: "AT",
  name: "Aliya Tursyn",
  faculty: "Engineering & Natural Sciences",
  program: "Computer Science · Year 2",
  email: "aliya.tursyn@sdu.edu.kz",
  rating: 4.7,
  sessionCount: 23,
  ratingBreakdown: [
    { label: "Reliability", value: 4.9 },
    { label: "Behaviour", value: 4.8 },
    { label: "Helpfulness", value: 4.5 },
  ],
  subjects: [
    { label: "Calculus II", active: true },
    { label: "Data Structures" },
    { label: "Discrete Math" },
    { label: "Academic English" },
    { label: "Kazakh History" },
  ],
  stats: [
    { value: 23, label: "Sessions attended" },
    { value: 14, label: "Times you taught" },
    { value: 31, label: "Students met" },
  ],
  places: [
    { label: "Library", active: true },
    { label: "Top floor", active: true },
    { label: "Canteen" },
  ],
  recentSessions: [
    { title: "Discrete Math — proof drills", meta: "Library · 12 Sep", role: "You taught", taught: true },
    { title: "Data Structures — graph traversal", meta: "Top floor · 9 Sep", role: "Attended" },
    { title: "Academic English — essay review", meta: "Canteen · 5 Sep", role: "Attended" },
  ],
};
