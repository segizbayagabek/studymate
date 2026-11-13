-- StudyMate proposed PostgreSQL schema, Milestone 1.
-- Review matching definitions and requirements before implementation.
-- UUID values are supplied by the application. No extensions are required.
BEGIN;
CREATE TABLE users (
 user_id uuid PRIMARY KEY, full_name varchar(120) NOT NULL,
 email varchar(254) NOT NULL UNIQUE, password_hash text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE subjects (
 subject_id uuid PRIMARY KEY, course_code varchar(30) NOT NULL UNIQUE,
 name varchar(120) NOT NULL
);
CREATE TABLE preference_options (
 preference_id uuid PRIMARY KEY, label varchar(80) NOT NULL UNIQUE
);
CREATE TABLE study_groups (
 group_id uuid PRIMARY KEY,
 organizer_id uuid NOT NULL REFERENCES users(user_id),
 subject_id uuid NOT NULL REFERENCES subjects(subject_id),
 title varchar(160) NOT NULL, description text NOT NULL,
 place varchar(200) NOT NULL,
 meeting_start timestamptz NOT NULL, meeting_end timestamptz NOT NULL,
 required_level varchar(20) NOT NULL CHECK (required_level IN ('Beginner','Intermediate','Advanced')),
 created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CHECK (meeting_end > meeting_start)
);
CREATE TABLE group_preferences (
 group_id uuid REFERENCES study_groups(group_id) ON DELETE CASCADE,
 preference_id uuid REFERENCES preference_options(preference_id),
 PRIMARY KEY (group_id,preference_id)
);
CREATE TABLE join_requests (
 request_id uuid PRIMARY KEY,
 group_id uuid NOT NULL REFERENCES study_groups(group_id),
 applicant_id uuid NOT NULL REFERENCES users(user_id),
 answer_subject_id uuid NOT NULL REFERENCES subjects(subject_id),
 available_from timestamptz NOT NULL, available_until timestamptz NOT NULL,
 answer_level varchar(20) NOT NULL CHECK (answer_level IN ('Beginner','Intermediate','Advanced')),
 status varchar(10) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending','Accepted','Rejected')),
 submitted_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
 decided_at timestamptz,
 CHECK (available_until > available_from),
 CHECK ((status = 'Pending' AND decided_at IS NULL) OR (status IN ('Accepted','Rejected') AND decided_at IS NOT NULL))
);
CREATE UNIQUE INDEX one_pending_request ON join_requests(group_id,applicant_id) WHERE status='Pending';
CREATE UNIQUE INDEX one_accepted_membership ON join_requests(group_id,applicant_id) WHERE status='Accepted';
CREATE INDEX requests_by_group_status ON join_requests(group_id,status);
CREATE INDEX upcoming_groups ON study_groups(meeting_start);
CREATE TABLE request_preferences (
 request_id uuid REFERENCES join_requests(request_id) ON DELETE CASCADE,
 preference_id uuid REFERENCES preference_options(preference_id),
 PRIMARY KEY (request_id,preference_id)
);
CREATE TABLE user_subject_levels (
 user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
 subject_id uuid REFERENCES subjects(subject_id),
 knowledge_level varchar(20) NOT NULL CHECK (knowledge_level IN ('Beginner','Intermediate','Advanced')),
 PRIMARY KEY(user_id,subject_id)
);
CREATE TABLE user_availability (
 availability_id uuid PRIMARY KEY, user_id uuid NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
 available_from timestamptz NOT NULL, available_until timestamptz NOT NULL,
 CHECK (available_until > available_from)
);
CREATE TABLE user_preferences (
 user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
 preference_id uuid REFERENCES preference_options(preference_id),
 PRIMARY KEY(user_id,preference_id)
);
CREATE VIEW group_members AS
 SELECT group_id,applicant_id AS user_id,decided_at AS joined_at
 FROM join_requests WHERE status='Accepted';
COMMIT;

-- API transaction rules (not automatically enforced by this DDL):
-- 1. Authenticate the caller; never trust a client-supplied applicant_id.
-- 2. On submission lock the study_group row, verify future time,
--    deny own-group/already-Accepted applications, then insert the answers.
-- 3. Group edits lock the same group row and must refuse changes to matching
--    requirements once a join_request exists. Freeze answers after submission.
--    This lock order prevents a concurrent edit racing with the first request.
-- 4. Organizer authorization is checked against study_groups.organizer_id.
-- 5. UPDATE join_requests SET status=:decision,decided_at=CURRENT_TIMESTAMP
--    WHERE request_id=:id AND status='Pending'; check the row count.
--    Only allow :decision to be Accepted or Rejected. Membership is derived.
-- 6. Rejected applicants may reapply; one Pending and one Accepted per pair.
--    A repeat decision on a decided request must return its existing result.
-- 7. Store normalized lowercase email; hash passwords using an adaptive,
--    salted password hash. Do not store plaintext passwords.
