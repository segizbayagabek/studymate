export function getUser() {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
}

export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

async function request(method, url, body) {
  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  }).catch(() => { throw new Error("Cannot connect to backend. Start Spring Boot on localhost:8080."); });

  const data = await response.json().catch(() => null);

  if (response.status === 401) {
    throw new Error("Wrong student ID or password.");
  }

  if (!response.ok) {
    const fieldErrors = data && data.errors ? Object.values(data.errors).join(", ") : "";
    throw new Error(fieldErrors || (data && data.detail) || "Something went wrong. Try again.");
  }

  return data;
}

export function login(studentId, password) {
  return request("POST", "/api/auth/login", { studentId, password });
}

export function getGroups() {
  return request("GET", "/api/groups");
}

export function getMyRequests(userId) {
  return request("GET", "/api/users/" + userId + "/requests");
}

export function createGroup(userId, group) {
  return request("POST", "/api/users/" + userId + "/groups", group);
}

export function joinGroup(userId, group) {
  return request("POST", "/api/users/" + userId + "/groups/" + group.id + "/requests", {
    courseCode: group.courseCode,
    level: group.level,
    availableFrom: group.startTime,
    availableTo: group.endTime,
    preferences: group.preferences,
  });
}

export function toEnum(label) {
  return label.toUpperCase().replaceAll(" ", "_");
}

export function fromEnum(value) {
  const text = value.toLowerCase().replaceAll("_", " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function initialsOf(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
