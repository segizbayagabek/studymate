# StudyMate Team Charter

Study Devs  |  SOE 205  |  Milestone 1  |  9 October 2026

I approve this Charter as Product Manager on 9 October 2026. It records our responsibilities, scope and working rules. Individual acknowledgements and completed PR cycles require their own evidence. Arlan Akylbekov.

## Project purpose

We are building a web application that helps university students arrange in-person study meetings. A student creates a group with a subject, place and meeting time. Other students apply, and the organizer reviews their answers and compatibility before deciding who joins. We still need student interviews to validate the problem assumption.

## Team and responsibilities

| Member | Role and responsibility | SDU email |
|---|---|---|
| Arlan Akylbekov | Product Manager; project coordination, SRS and Trello | 250118016@sdu.edu.kz |
| Alisher Kanadil | Frontend Developer; React pages and API integration | 250118021@sdu.edu.kz |
| Bakdaulet Sultanbekov | Designer; user flows, wireframes and Figma | 250118015@sdu.edu.kz |
| Yelnar Mamirkhanov | Backend Developer; API, database and business rules | 250118010@sdu.edu.kz |
| Agabek Segizbay | Backend Support and QA owner; validation, acceptance and regression checks | 250118006@sdu.edu.kz |

Agabek owns QA alongside backend support: acceptance checks, validation and regression testing. Arlan owns requirements and project coordination. The design and implementation owners explain and review their respective decisions.

## Scope and technical plan

Our SRS has 18 stories: 11 Must, six Should and one Could. The essential scope covers registration, sign-in, group creation and browsing, group details, application questions, request submission, organizer review and decisions, and an organizer-visible compatibility score. Saved preferences, filters, applicant status and score explanations are planned improvements. Chat, ratings, shared files, advanced notifications and monetization are outside this version.

We plan to use React, Vite and Tailwind CSS for the frontend, with Spring Boot and PostgreSQL for the backend. Spring Security and JWT are listed as planned choices in the README. GitHub holds the source and documents. Trello holds the work plan. Figma is required for the interactive design. Postman will support API checks.

The current main branch contains documents. The frontend branch contains an interface preview using local state and sample data. The inspected backend branch contains only a README; server code is not present. Implementation starts from Week 6 under the milestone policy.

## Team workflow

We use Backlog, To Do, In Progress, In Review and Done. A member takes a real task, works in a separate branch and opens a Pull Request. Another member reviews the change before merging. A task reaches Done only when its acceptance conditions and evidence are available. A document describing a process is not proof that the process happened.

Approved working rules: link tasks to stories or deliverables, make small readable commits, keep credentials out of the repository, and agree on fields before integration. A different member reviews each PR before merge into the stable branch.

## Meetings and decisions

We hold two 15-minute check-ins each week: planning and review. Arlan coordinates exact slots in Asia/Almaty time. Each member reports completed work, their next task and blockers. Arlan records scope decisions; the responsible developers review technical decisions. Past attendance is not claimed.

## Risks and open agreements

The main risks are an expanding scope, frontend and backend field mismatches, an unexplained score, and missing evidence of team review. We address them with the Must list, a traceability table, a visible score breakdown and real Pull Requests from every member.

The PM approves full-interval time compatibility, equal non-empty preference sets and public group details; omitted optional preferences contribute zero. Request answers are frozen after submission. Capacity remains outside Must scope. Exact meeting slots and member acknowledgements remain to be recorded.

Approved on behalf of Arlan Akylbekov following his instruction on 9 October 2026. Prepared with AI assistance. The team must review the technical design and explain the parts it adopts.