import AppLayout from "../components/layout/AppLayout";
import SplitPage from "../components/layout/SplitPage";
import FactGrid from "../components/layout/FactGrid";
import GroupHero from "../components/group/GroupHero";
import GroupSidebar from "../components/group/GroupSidebar";
import MemberRow from "../components/group/MemberRow";
import PrivacyNote from "../components/group/PrivacyNote";
import { group } from "../data/group";
import "./GroupDetail.css";

export default function GroupDetail() {
  return (
    <AppLayout bleed>
      <GroupHero group={group} />
      <SplitPage asideWidth={352} aside={<GroupSidebar group={group} />}>
        <FactGrid facts={group.facts} />

        <PrivacyNote aside="Hidden from the public feed">
          Exact table number and the owner's phone are visible because you were accepted.
        </PrivacyNote>

        <div className="sm-eyebrow sm-group__label">Members</div>
        <div className="sm-group__members">
          {group.members.map((member) => (
            <MemberRow key={member.initials} member={member} />
          ))}
        </div>
      </SplitPage>
    </AppLayout>
  );
}
