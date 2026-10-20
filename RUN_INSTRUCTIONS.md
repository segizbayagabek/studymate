# StudyMate – local development

## Backend – IntelliJ IDEA
1. Open this folder as a Maven project (Java 21+).
2. Make sure PostgreSQL is running on localhost:5432 and create database `studymate_db` if missing.
3. PostgreSQL username is `postgres`, password is intentionally **empty** in `src/main/resources/application.properties` as requested. Your local PostgreSQL must actually allow passwordless access; otherwise authentication will fail and you must adjust PostgreSQL configuration.
4. Run `StudymateApplication`.
5. Check http://localhost:8080/api/groups ; an empty `[]` is normal on a new database.

## Frontend – VS Code
1. Open `studymate-frontend` separately.
2. Run `npm install` then `npm run dev`.
3. Open http://localhost:5173.
4. `/api` calls are proxied to Spring Boot at http://localhost:8080.

## Login testing
The frontend accepts a 9-digit student ID, e.g. `250118021`; the database must contain a user with matching email `250118021@sdu.edu.kz` and a matching password.
For local development ONLY, you can create a user using Postman:
POST http://localhost:8080/api/users
Content-Type: application/json
`{"name":"Test Student","email":"250118021@sdu.edu.kz","password":"test123"}`
Then sign in with ID `250118021` and password `test123`.
This is a local prototype, **not secure production authentication**. Plaintext passwords and unrestricted user CRUD need to be replaced with password hashing and proper access control before deployment.

## Implemented fixes
- Login now looks up `studentId@sdu.edu.kz` and validates the supplied password; login response excludes password.
- Password is no longer exposed in ordinary user JSON responses.
- Create Group includes a selectable required `level` value.
- The two projects are packaged separately: Java backend and React frontend.
- PostgreSQL password remains empty.

## Notes
A running PostgreSQL server and an existing user are still prerequisites; the archives cannot configure your local PostgreSQL server. Features not implemented in the provided source (e.g. actual SDU SSO, Forgot password and Save as draft) remain unimplemented.
