import AppLayout from "../components/layout/AppLayout";
import SplitPage from "../components/layout/SplitPage";
import Avatar from "../components/ui/Avatar";
import Chip from "../components/ui/Chip";
import Diamond from "../components/ui/Diamond";
import RatingCard from "../components/profile/RatingCard";
import SessionList from "../components/profile/SessionList";
import StatGrid from "../components/profile/StatGrid";
import StudyStyle from "../components/profile/StudyStyle";
import { profile } from "../data/profile";
import "./Profile.css";

export default function Profile() {
  return (
    <AppLayout bleed>
      <SplitPage
        reverse
        asideWidth={376}
        aside={
          <>
            <div className="sm-profile__id">
              <Avatar initials={profile.initials} size={78} />
              <div>
                <h2 className="sm-profile__name">{profile.name}</h2>
                <div className="sm-profile__faculty">
                  {profile.faculty}
                  <br />
                  {profile.program}
                </div>
              </div>
            </div>

            <div className="sm-profile__badges">
              <Chip tone="outline" className="sm-profile__badge">{profile.email}</Chip>
              <Chip tone="outline" className="sm-profile__badge">Verified SDU student</Chip>
            </div>

            <RatingCard
              rating={profile.rating}
              sessionCount={profile.sessionCount}
              breakdown={profile.ratingBreakdown}
            />

            <div className="sm-profile__note">
              <Diamond size={8} style={{ marginTop: 5 }} />
              <span>
                Ratings are given anonymously by members you actually studied with, and only after a
                session ends.
              </span>
            </div>
          </>
        }
      >
        <div className="sm-profile__main">
          <section>
            <div className="sm-eyebrow sm-profile__label">Subjects I study</div>
            <div className="sm-profile__chips">
              {profile.subjects.map((subject) => (
                <Chip key={subject.label} tone={subject.active ? "active" : "default"}>
                  {subject.label}
                </Chip>
              ))}
              <Chip as="button" type="button" tone="dashed" className="sm-profile__add">
                + Add subject
              </Chip>
            </div>
          </section>

          <StatGrid stats={profile.stats} />

          <section>
            <div className="sm-eyebrow sm-profile__label">How I like to study</div>
            <StudyStyle quietness={32} places={profile.places} />
          </section>

          <section>
            <div className="sm-eyebrow sm-profile__label">Recent sessions</div>
            <SessionList sessions={profile.recentSessions} />
          </section>
        </div>
      </SplitPage>
    </AppLayout>
  );
}
