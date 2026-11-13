# StudyMate database design

Proposed Milestone 1 design based on `docs/SRS.md`, read on 8 October 2026. This is not an existing backend schema. `StudyMate_ERD.drawio` has two editable pages: core data and optional profile. SVGs are rendered copies for defense. `schema.sql` is a proposed PostgreSQL DDL.

## Cardinalities

Each study group has exactly one organizer and one subject. Each request has exactly one group, applicant and answer subject. A parent can have zero or many child rows. Users and groups form a many-to-many application relationship through join_requests. Composite-key preference tables connect each group, request or user to multiple preference options.

## Normalization

1NF: each column contains one value. Multiple subjects, availability intervals and preferences use separate rows, not lists in a text field.

2NF: attributes in composite-key relations depend on the entire key. In user_subject_levels the level belongs to a particular user and subject. Preference junctions contain only their keys.

3NF: course_code and subject name live in subjects. Preference labels live in preference_options. Organizer names live in users. Referencing rows contain foreign keys rather than repeating these descriptive attributes. Application answers are facts of a submitted request, so they belong to request_id rather than the current editable profile.

Membership is a view over Accepted requests. The compatibility total and components are derived instead of stored as duplicate values. An API may return them in a response without adding database columns. These choices avoid contradictory membership and score records.

## Proposed matching definitions

- Subject: equal subject_id gives 40 points.
- Time: available_from <= meeting_start and available_until >= meeting_end gives 30 points. Store timestamptz; display Asia/Almaty.
- Level: exact equality among Beginner, Intermediate and Advanced gives 20 points.
- Optional preferences: the applicant and group have equal, non-empty sets of preference_id values, giving 10 points. Empty or unequal sets give zero.

These precise definitions are proposed because the SRS leaves them open. The binary weights are already in the SRS. Scores are multiples of ten. The sample 92/78/71 values in the old frontend cannot be produced by this rule.

## Stable application facts

Freeze the applicant answers after submission. For the current scope, freeze a group's subject, meeting interval, required level and preferences when its first request exists. Submission and editing transactions must lock the same group row before checking for requests. Without that shared lock order, a concurrent edit could race with a submission. If group editing is added later, introduce immutable requirement versions and reference the version from each request.

## Request integrity

The DDL has partial unique indexes for one Pending request and one Accepted membership per student/group pair. It permits a new request after rejection. The API refuses applications by the organizer and by an already-Accepted member. Applicant identity comes from the authenticated session. On organizer decision, verify organizer_id, update only a Pending row, and check the affected row count. Repeated decisions return the existing result and never add another membership.

The DDL alone does not implement authorization, future-time validation or frozen-data rules. Those checks belong to the server transaction. Both layers need tests. The schema has no capacity column, because the current SRS excludes capacity from the Must scope. UI ratings, hidden exact location and automatic acceptance are also excluded.
