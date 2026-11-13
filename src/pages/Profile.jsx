import Navbar from "../components/common/Navbar.jsx";
import SplitPage from "../components/layout/SplitPage";
import Avatar from "../components/ui/Avatar";
import Chip from "../components/ui/Chip";
import Diamond from "../components/ui/Diamond";
import RatingCard from "../components/profile/RatingCard";
import SessionList from "../components/profile/SessionList";
import StatGrid from "../components/profile/StatGrid";
import StudyStyle from "../components/profile/StudyStyle";
import { profile } from "../data/profile";
import { getUser, initialsOf } from "../api.js";
import { useI18n } from "../i18n.js";
import "./Profile.css";

export default function Profile() {
  const { t } = useI18n();
  const user = getUser();
  const name = user && user.name ? user.name : profile.name;
  const email = user && user.email ? user.email : profile.email;
  const initials = user && user.name ? initialsOf(user.name) : profile.initials;

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar active="/profile" />
      <SplitPage
        reverse
        asideWidth={376}
        aside={
          <>
            <div className="sm-profile__id">
              <Avatar initials={initials} size={78} />
              <div>
                <h2 className="sm-profile__name">{name}</h2>
                <div className="sm-profile__faculty">
                  {profile.faculty}
                  <br />
                  {profile.program}
                </div>
              </div>
            </div>

            <div className="sm-profile__badges">
              <Chip tone="outline" className="sm-profile__badge">{email}</Chip>
              <Chip tone="outline" className="sm-profile__badge">{t("Verified SDU student")}</Chip>
            </div>

            <RatingCard
              rating={profile.rating}
              sessionCount={profile.sessionCount}
              breakdown={profile.ratingBreakdown}
            />

            <div className="sm-profile__note">
              <Diamond size={8} style={{ marginTop: 5 }} />
              <span>
                {t("Ratings are given anonymously by members you actually studied with, and only after a session ends.")}
              </span>
            </div>
          </>
        }
      >
        <div className="sm-profile__main">
          <section>
            <div className="sm-eyebrow sm-profile__label">{t("Subjects I study")}</div>
            <div className="sm-profile__chips">
              {profile.subjects.map((subject) => (
                <Chip key={subject.label} tone={subject.active ? "active" : "default"}>
                  {t(subject.label)}
                </Chip>
              ))}
              <Chip as="button" type="button" tone="dashed" className="sm-profile__add">
                {t("+ Add subject")}
              </Chip>
            </div>
          </section>

          <StatGrid stats={profile.stats.map((s) => ({ ...s, label: t(s.label) }))} />

          <section>
            <div className="sm-eyebrow sm-profile__label">{t("How I like to study")}</div>
            <StudyStyle quietness={32} places={profile.places.map((p) => ({ ...p, label: t(p.label) }))} />
          </section>

          <section>
            <div className="sm-eyebrow sm-profile__label">{t("Recent sessions")}</div>
            <SessionList sessions={profile.recentSessions.map((s) => ({ ...s, title: t(s.title), role: t(s.role) }))} />
          </section>
        </div>
      </SplitPage>
    </div>
  );
}
