export const applicants = [
  {
    id: "nurislam",
    score: 94,
    tier: "strong",
    tierLabel: "Strong match",
    initials: "NB",
    name: "Nurislam B.",
    faculty: "Engineering & Natural Sciences · Year 2",
    note:
      "I've done chapters 5–6 already and can explain u-substitution. Weak on trig substitution.",
    tags: ["Quiet work", "4.9 social rating", "12 sessions"],
    breakdown: [
      { label: "Subject", value: 100 },
      { label: "Time", value: 95 },
      { label: "Level", value: 88 },
      { label: "Preferences", value: 92, accent: true },
    ],
  },
  {
    id: "aisulu",
    score: 81,
    tier: "good",
    tierLabel: "Good match",
    initials: "AZ",
    name: "Aisulu Zh.",
    faculty: "Business School · Year 1",
    note:
      "First time taking Calculus. I learn best when someone walks me through the first example.",
    tags: ["Quiet work", "4.7 social rating", "3 sessions"],
    breakdown: [
      { label: "Subject", value: 100 },
      { label: "Time", value: 82 },
      { label: "Level", value: 54 },
      { label: "Preferences", value: 90, accent: true },
    ],
    hint: "Level gap is wide — a good chance to teach.",
  },
];

export const lowApplicant = {
  id: "timur",
  score: 62,
  initials: "TO",
  name: "Timur O.",
  faculty: "Law & Social Sciences · Year 3 · 4.4 social rating",
  reason: "Time overlap only 40 min · prefers talkative groups",
};
