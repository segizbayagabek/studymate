import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import PageHeading from "../components/layout/PageHeading";
import Chip from "../components/ui/Chip";
import CourseTag from "../components/ui/CourseTag";
import Diamond from "../components/ui/Diamond";
import ApplicantCard from "../components/applicants/ApplicantCard";
import LowMatchRow from "../components/applicants/LowMatchRow";
import { applicants, lowApplicant } from "../data/applicants";
import "./Applicants.css";

const SORTS = ["Compatibility", "Social rating", "Newest"];

export default function Applicants() {
  const [sort, setSort] = useState("Compatibility");
  const [showLow, setShowLow] = useState(true);

  return (
    <AppLayout bleed>
      <div className="sm-applicants">
        <PageHeading
          eyebrow={
            <span className="sm-applicants__eyebrow">
              <CourseTag>MATH 161</CourseTag>
              <span>Your request · 3 seats left</span>
            </span>
          }
          title="5 students want to join your Calculus II group"
          sub="Library · 2nd floor · Today, 14:00 – 16:00"
          actions={SORTS.map((label) => (
            <Chip
              as="button"
              type="button"
              key={label}
              tone={sort === label ? "active" : "outline"}
              onClick={() => setSort(label)}
              className="sm-applicants__sort"
            >
              {sort === label && <Diamond size={7} />}
              {label}
            </Chip>
          ))}
        />

        <div className="sm-applicants__list">
          {applicants.map((applicant) => (
            <ApplicantCard key={applicant.id} applicant={applicant} />
          ))}
          {showLow && <LowMatchRow applicant={lowApplicant} />}
          <button
            type="button"
            className="sm-applicants__more"
            onClick={() => setShowLow((v) => !v)}
          >
            <Diamond size={7} />
            {showLow ? "Hide applicants under 60%" : "Show 2 more applicants under 60%"}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
