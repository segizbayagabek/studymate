import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Diamond from "../common/Diamond.jsx";
import Label from "../common/Label.jsx";
import { fromEnum, initialsOf, whenText } from "../../api.js";
import { MAX_MESSAGE_LENGTH, messageDay, messageTime } from "../../chat.js";
import { useI18n } from "../../i18n.js";

function membersOfText(current, total, lang) {
  if (lang === "RU") return current + " из " + total + " участников";
  if (lang === "KZ") return total + "-тен " + current + " қатысушы";
  return current + " of " + total + " members";
}

function ownerLabel(name, lang) {
  if (lang === "RU") return "Организатор: " + name;
  if (lang === "KZ") return "Ұйымдастырушы: " + name;
  return "Owner: " + name;
}

function ChatHeader({ group, isOwner, lang, t }) {
  const membersText = membersOfText(group.memberCount + 1, group.groupSize, lang);

  return (
    <header className="flex items-center justify-between gap-6 bg-navy px-8 py-6 text-white">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-3">
          <span className="rounded-[7px] bg-peach px-2.5 py-1 text-[10.5px] font-bold tracking-wider text-navy">
            {group.courseCode}
          </span>
          <Label onDark>{isOwner ? t("You organize this group") : ownerLabel(group.organizer.name, lang)}</Label>
        </div>
        <h2 className="truncate font-serif text-[28px] leading-tight">
          {t(group.subjectName)} — {group.title}
        </h2>
        <div className="mt-2 flex flex-wrap gap-4 text-[12.5px] font-semibold text-white/75">
          <span className="flex items-center gap-2"><Diamond />{t(fromEnum(group.place))}</span>
          <span className="flex items-center gap-2"><Diamond />{whenText(group)}</span>
          <span className="flex items-center gap-2"><Diamond />{membersText}</span>
        </div>
      </div>

      <Link
        to={isOwner ? "/groups/" + group.id + "/applicants" : "/groups/" + group.id}
        className="shrink-0 rounded-full border border-white/30 px-5 py-2.5 text-[13px] font-bold hover:bg-white/10"
      >
        {t("Group details")}
      </Link>
    </header>
  );
}

function MessageBubble({ message, mine, isOwner, showAuthor, t }) {
  return (
    <div className={"flex items-end gap-3 " + (mine ? "flex-row-reverse" : "")}>
      <div className="w-9 shrink-0">
        {showAuthor && (
          <div
            className={
              "flex size-9 items-center justify-center rounded-full text-[11.5px] font-bold " +
              (mine ? "border border-navy/15 bg-paper text-navy" : "bg-navy text-white")
            }
          >
            {initialsOf(message.authorName)}
          </div>
        )}
      </div>

      <div className={"flex max-w-[65%] flex-col " + (mine ? "items-end" : "items-start")}>
        {showAuthor && (
          <div className="mb-1 flex items-center gap-2 px-1 text-[11.5px] font-bold">
            <span>{mine ? t("You") : message.authorName}</span>
            {isOwner && <span className="text-[9.5px] tracking-[0.14em] text-peach-dark">{t("OWNER")}</span>}
          </div>
        )}
        <div
          className={
            "rounded-[18px] px-4 py-2.5 text-[14.5px] leading-relaxed break-words whitespace-pre-wrap " +
            (mine ? "rounded-br-md bg-navy text-white" : "rounded-bl-md border border-navy/10 bg-warm text-navy")
          }
        >
          {message.text}
        </div>
        <span className="mt-1 px-1 text-[10.5px] font-semibold text-muted">{messageTime(message.sentAt)}</span>
      </div>
    </div>
  );
}

function Composer({ onSend, disabled, t }) {
  const [text, setText] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  }

  function onKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      submit(event);
    }
  }

  return (
    <form onSubmit={submit} className="flex items-end gap-3 border-t border-navy/10 bg-paper px-8 py-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        maxLength={MAX_MESSAGE_LENGTH}
        disabled={disabled}
        placeholder={disabled ? t("This group was cancelled — the chat is read-only") : t("Write a message…  (Enter to send, Shift+Enter for a new line)")}
        aria-label="Message"
        className="max-h-40 min-h-12 flex-1 resize-none rounded-[22px] border border-navy/15 bg-warm px-5 py-3 text-[14.5px] font-medium text-navy outline-none placeholder:text-muted focus:border-peach focus:bg-paper disabled:cursor-not-allowed disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="h-12 shrink-0 rounded-full bg-peach px-7 text-sm font-bold text-navy hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t("Send")}
      </button>
    </form>
  );
}

export default function ChatWindow({ group, user, messages, onSend }) {
  const { lang, t } = useI18n();
  const bottomRef = useRef(null);
  const isOwner = group.organizer.id === user.id;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, group.id]);

  return (
    <section className="flex min-h-0 flex-col bg-paper">
      <ChatHeader group={group} isOwner={isOwner} lang={lang} t={t} />

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-8 py-6">
        {messages.length === 0 && (
          <div className="m-auto max-w-sm text-center">
            <Label className="mb-3">{t("Start the conversation")}</Label>
            <p className="text-[15px] font-medium text-muted">
              {t("Agree on the exact spot, share notes or ask a question before you meet.")}
            </p>
          </div>
        )}

        {messages.map((message, index) => {
          const day = messageDay(message.sentAt);
          const previous = messages[index - 1];
          const showDay = !previous || messageDay(previous.sentAt) !== day;
          const showAuthor = showDay || !previous || previous.authorId !== message.authorId;

          return (
            <div key={message.id} className={showAuthor && index > 0 ? "mt-2" : ""}>
              {showDay && (
                <div className="my-3 flex items-center gap-4">
                  <span className="h-px flex-1 bg-navy/10" />
                  <span className="text-[10px] font-bold tracking-[0.18em] text-muted uppercase">{day}</span>
                  <span className="h-px flex-1 bg-navy/10" />
                </div>
              )}
              <MessageBubble
                message={message}
                mine={message.authorId === user.id}
                isOwner={message.authorId === group.organizer.id}
                showAuthor={showAuthor}
                t={t}
              />
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <Composer onSend={onSend} disabled={group.status === "CANCELLED"} t={t} key={group.id} />
    </section>
  );
}
