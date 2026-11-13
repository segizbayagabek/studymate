import { Link } from "react-router-dom";
import CourseTag from "../common/CourseTag.jsx";
import Label from "../common/Label.jsx";
import { getMessages, unreadCount } from "../../chat.js";
import { useI18n } from "../../i18n.js";

function preview(group, userId, t) {
  const messages = getMessages(group.id);
  if (messages.length === 0) return t("No messages yet — say hi");
  const last = messages[messages.length - 1];
  return (last.authorId === userId ? t("You") : last.authorName.split(" ")[0]) + ": " + last.text;
}

export default function ChatList({ groups, activeId, userId, loading }) {
  const { t } = useI18n();

  return (
    <aside className="flex min-h-0 flex-col border-r border-navy/10 bg-warm">
      <div className="px-7 pt-8 pb-5">
        <Label className="mb-3">{t("Group chat")}</Label>
        <h1 className="text-[26px] font-semibold">{t("Your groups")}</h1>
        <p className="mt-1 text-[13px] font-medium text-muted">{t("Groups you organize or were accepted into")}</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-6">
        {loading && <p className="px-3 text-[13px] font-medium text-muted">{t("Loading groups…")}</p>}

        {!loading && groups.length === 0 && (
          <div className="mx-3 rounded-2xl border border-dashed border-navy/20 p-5 text-[13px] font-medium text-muted">
            {t("You're not in any group yet.")}{" "}
            <Link to="/browse" className="font-bold text-peach-dark hover:underline">
              {t("Find one")}
            </Link>{" "}
            {t("or")}{" "}
            <Link to="/create" className="font-bold text-peach-dark hover:underline">
              {t("create your own")}
            </Link>
            .
          </div>
        )}

        {groups.map((group) => {
          const active = group.id === activeId;
          const unread = active ? 0 : unreadCount(userId, group.id);

          return (
            <Link
              key={group.id}
              to={"/chat/" + group.id}
              className={
                "flex flex-col gap-2 rounded-l-md rounded-r-[16px] border border-l-[3px] px-4 py-3.5 transition-colors " +
                (active
                  ? "border-navy/10 border-l-peach bg-paper shadow-[0_2px_10px_rgba(38,42,84,0.06)]"
                  : "border-transparent border-l-navy/20 hover:bg-paper/60")
              }
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CourseTag code={group.courseCode} dark={active} />
                  {group.organizer.id === userId && (
                    <span className="text-[9.5px] font-bold tracking-[0.14em] text-peach-dark">{t("OWNER")}</span>
                  )}
                </div>
                {unread > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-peach px-1.5 text-[10.5px] font-bold text-navy">
                    {unread}
                  </span>
                )}
              </div>
              <div className="truncate text-[14.5px] font-semibold">
                {t(group.subjectName)} — {group.title}
              </div>
              <div className="truncate text-[12.5px] font-medium text-muted">{preview(group, userId, t)}</div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
