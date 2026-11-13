import { t } from "./i18n.js";

export function getUser() {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
}

export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem("user");
}

async function request(method, url, body) {
  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const fieldErrors = data && data.errors ? Object.values(data.errors).join(", ") : "";
    const error = new Error(fieldErrors || (data && data.detail) || "Something went wrong. Try again.");
    error.status = response.status; // e.g. 409 when a username is already taken
    throw error;
  }

  return data;
}

// Login is two steps: email a one-time code, then check the code
export function sendCode(studentId) {
  return request("POST", "/api/auth/send-code", { studentId });
}

export function verifyCode(studentId, code) {
  return request("POST", "/api/auth/verify-code", { studentId, code });
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

// "LIBRARY" -> "Library" (or "Кітапхана", "Библиотека" in the chosen language)
export function fromEnum(value) {
  return t("enums." + value);
}

export function initialsOf(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function getProfile(userId) {
  return request("GET", "/api/users/" + userId + "/profile");
}

// profile = { subjects, studyStyle, favouritePlaces }
export function updateProfile(userId, profile) {
  return request("PUT", "/api/users/" + userId + "/profile", profile);
}

export function changeUsername(userId, name) {
  return request("PUT", "/api/users/" + userId + "/name", { name: name });
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

  if (daysAway === 0) return t("common.today");
  if (daysAway === 1) return t("common.tomorrow");
  // e.g. "4 Nov". Month names come from our own texts, because not every browser knows Kazakh ones.
  return meeting.getDate() + " " + t("common.months")[meeting.getMonth()];
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
