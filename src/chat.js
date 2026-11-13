// Group chat storage.
// The Spring Boot backend has no chat endpoints yet, so messages are kept in
// localStorage (one key per group). Other open tabs receive updates through the
// "storage" event, so two tabs signed in as different students can talk.
// To move to a real backend, replace these functions and keep the same shapes.

import { getLang, tr } from "./i18n.js";

const PREFIX = "studymate:chat:";
const READ_PREFIX = "studymate:chat-read:";
const CHANGE_EVENT = "studymate-chat-change";
export const MAX_MESSAGE_LENGTH = 1000;

let version = 0;

function notify() {
  version += 1;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function onStorage(event) {
  if (event.key === null || event.key.startsWith(PREFIX) || event.key.startsWith(READ_PREFIX)) {
    notify();
  }
}

/** For useSyncExternalStore: re-render whenever any chat changes. */
export function subscribeToChats(callback) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function getChatVersion() {
  return version;
}

export function getMessages(groupId) {
  try {
    const saved = localStorage.getItem(PREFIX + groupId);
    const list = saved ? JSON.parse(saved) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function sendMessage(groupId, user, text) {
  const clean = text.trim().slice(0, MAX_MESSAGE_LENGTH);
  if (!clean) return null;

  const message = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    authorId: user.id,
    authorName: user.name,
    text: clean,
    sentAt: new Date().toISOString(),
  };

  localStorage.setItem(PREFIX + groupId, JSON.stringify([...getMessages(groupId), message]));
  notify();
  return message;
}

export function getLastRead(userId, groupId) {
  return localStorage.getItem(READ_PREFIX + userId + ":" + groupId) || "";
}

export function markRead(userId, groupId) {
  const messages = getMessages(groupId);
  const last = messages.length ? messages[messages.length - 1].sentAt : "";
  if (!last || getLastRead(userId, groupId) >= last) return;
  localStorage.setItem(READ_PREFIX + userId + ":" + groupId, last);
  notify();
}

export function unreadCount(userId, groupId) {
  const lastRead = getLastRead(userId, groupId);
  return getMessages(groupId).filter((m) => m.authorId !== userId && m.sentAt > lastRead).length;
}

export function messageTime(iso) {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function messageDay(iso) {
  const date = new Date(iso);
  const today = new Date();
  const startOf = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const daysAgo = Math.round((startOf(today) - startOf(date)) / 86400000);

  if (daysAgo === 0) return tr("Today");
  if (daysAgo === 1) return tr("Yesterday");
  const locale = getLang() === "RU" ? "ru-RU" : getLang() === "KZ" ? "kk-KZ" : "en-GB";
  return date.toLocaleDateString(locale, { day: "numeric", month: "long" });
}
