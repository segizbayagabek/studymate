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
  });

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

export function getMyGroups(userId) {
  return request("GET", "/api/users/" + userId + "/groups");
}

export function getGroup(userId, groupId) {
  return request("GET", "/api/users/" + userId + "/groups/" + groupId);
}

export function getApplicants(userId, groupId) {
  return request("GET", "/api/users/" + userId + "/groups/" + groupId + "/requests");
}

export function acceptRequest(userId, requestId) {
  return request("PATCH", "/api/users/" + userId + "/requests/" + requestId + "/accept");
}

export function declineRequest(userId, requestId) {
  return request("PATCH", "/api/users/" + userId + "/requests/" + requestId + "/reject");
}

export function cancelRequest(userId, requestId) {
  return request("PATCH", "/api/users/" + userId + "/requests/" + requestId + "/cancel");
}

export function dayLabel(date) {
  const today = new Date();
  const meeting = new Date(date + "T00:00:00");
  const daysAway = Math.round((meeting - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);

  if (daysAway === 0) return "Today";
  if (daysAway === 1) return "Tomorrow";
  return meeting.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function timeRange(from, to) {
  return from.slice(0, 5) + " – " + to.slice(0, 5);
}

export function whenText(group) {
  return dayLabel(group.meetingDate) + ", " + timeRange(group.startTime, group.endTime);
}

export function isPast(group) {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return group.meetingDate < today.getFullYear() + "-" + month + "-" + day;
}
