import { useMemo, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import SplitPage from "../components/layout/SplitPage";
import PageHeading from "../components/layout/PageHeading";
import Chip from "../components/ui/Chip";
import FilterBar from "../components/browse/FilterBar";
import RequestCard from "../components/browse/RequestCard";
import FullRequestCard from "../components/browse/FullRequestCard";
import BrowseSidebar from "../components/browse/BrowseSidebar";
import { requests, fullRequest, suggestions, filters } from "../data/requests";
import "./Browse.css";

export default function Browse() {
  const [range, setRange] = useState("Today");
  const [matchFirst, setMatchFirst] = useState(true);

  const list = useMemo(
    () => (matchFirst ? [...requests].sort((a, b) => b.match - a.match) : requests),
    [matchFirst]
  );

  return (
    <AppLayout bleed>
      <SplitPage
        asideWidth={316}
        aside={<BrowseSidebar sessionsJoined={3} suggestions={suggestions} />}
      >
        <PageHeading
          eyebrow="Open requests · today"
          title="14 groups forming on campus"
          actions={["Today", "This week"].map((label) => (
            <Chip
              as="button"
              type="button"
              key={label}
              tone={range === label ? "active" : "outline"}
              onClick={() => setRange(label)}
              className="sm-browse__range"
            >
              {label}
            </Chip>
          ))}
        />

        <FilterBar
          filters={filters}
          matchFirst={matchFirst}
          onToggleMatchFirst={() => setMatchFirst((v) => !v)}
        />

        <div className="sm-browse__list">
          {list.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
          <FullRequestCard request={fullRequest} />
        </div>
      </SplitPage>
    </AppLayout>
  );
}
