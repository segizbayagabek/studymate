import { useEffect, useState, useSyncExternalStore } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import Label from "../components/common/Label.jsx";
import ChatList from "../components/chat/ChatList.jsx";
import ChatWindow from "../components/chat/ChatWindow.jsx";
import { getGroup, getMyGroups, getMyRequests, getUser } from "../api.js";
import { getChatVersion, getMessages, markRead, sendMessage, subscribeToChats } from "../chat.js";
import { useI18n } from "../i18n.js";

/** Groups the user organizes plus the groups where their join request was accepted. */
function loadChatGroups(userId) {
  const organized = getMyGroups(userId);
  const joined = getMyRequests(userId).then((requests) =>
    Promise.all(requests.filter((r) => r.status === "ACCEPTED").map((r) => getGroup(userId, r.groupId)))
  );

  return Promise.all([organized, joined]).then(([mine, accepted]) => {
    const byId = new Map();
    [...mine, ...accepted].forEach((group) => byId.set(group.id, group));
    return [...byId.values()].sort((a, b) =>
      (b.meetingDate + b.startTime).localeCompare(a.meetingDate + a.startTime)
    );
  });
}

function EmptyPanel({ title, children }) {
  const { t } = useI18n();
  return (
    <section className="flex items-center justify-center bg-paper px-10">
      <div className="max-w-md rounded-2xl border border-dashed border-navy/20 p-8 text-center">
        <Label className="mb-3">{t("Group chat")}</Label>
        <h2 className="mb-2 text-[22px] font-semibold">{title}</h2>
        <div className="text-[14px] font-medium text-muted">{children}</div>
      </div>
    </section>
  );
}

export default function GroupChat() {
  const { t } = useI18n();
  const user = getUser();
  const userId = user ? user.id : null;
  const { groupId } = useParams();
  const [groups, setGroups] = useState(null);
  const [error, setError] = useState("");
  const chatVersion = useSyncExternalStore(subscribeToChats, getChatVersion, getChatVersion);

  useEffect(() => {
    if (!userId) return;
    loadChatGroups(userId)
      .then(setGroups)
      .catch((e) => {
        setError(e.message);
        setGroups([]);
      });
  }, [userId]);

  const activeGroup = groups && groupId ? groups.find((g) => String(g.id) === groupId) : null;

  useEffect(() => {
    if (userId && activeGroup) markRead(userId, activeGroup.id);
  }, [userId, activeGroup, chatVersion]);

  if (!user) {
    return <Navigate to="/" />;
  }

  // On /chat, open the first group automatically.
  if (!groupId && groups && groups.length > 0) {
    return <Navigate to={"/chat/" + groups[0].id} replace />;
  }

  const messages = activeGroup ? getMessages(activeGroup.id) : [];

  function renderPanel() {
    if (groups === null) return <EmptyPanel title={t("Loading chats…")}>{t("One moment.")}</EmptyPanel>;
    if (activeGroup) {
      return (
        <ChatWindow
          group={activeGroup}
          user={user}
          messages={messages}
          onSend={(text) => sendMessage(activeGroup.id, user, text)}
        />
      );
    }
    if (groupId) {
      return (
        <EmptyPanel title={t("This chat isn't available")}>
          {t("Only the owner and accepted members can read a group's chat.")}{" "}
          <Link to={"/groups/" + groupId} className="font-bold text-peach-dark hover:underline">
            {t("Open group")}
          </Link>
        </EmptyPanel>
      );
    }
    return (
      <EmptyPanel title={t("No chats yet")}>
        {t("Once you create a group or get accepted into one, its chat shows up here.")}
      </EmptyPanel>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-paper">
      <Navbar active="/chat" />

      {error && <p className="px-10 pt-4 text-[13px] font-semibold text-red-600">{error}</p>}

      <div className="grid min-h-0 flex-1 grid-cols-[360px_1fr]">
        <ChatList groups={groups || []} activeId={activeGroup ? activeGroup.id : null} userId={userId} loading={groups === null} />
        {renderPanel()}
      </div>
    </div>
  );
}
