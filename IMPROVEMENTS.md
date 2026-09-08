# Round 2 Improvements

## 1. Fixed response storage and identification (high-priority)
- The visible `Gender` and common motivation answer were not part of the Zod schema. `zodResolver` can strip unknown fields, so these answers could disappear before submission. Both are now explicitly validated and persisted.
- Each submission now has a deterministic Firestore document ID derived from the authenticated email + department. This prevents duplicate responses caused by retries/double-clicks and gives every response a stable identity.
- Submission writes use a Firestore transaction. The transaction atomically checks the per-user application limit and duplicate department before creating the response.
- Email is always taken from the authenticated session; client-supplied identity cannot overwrite it.
- Added `schemaVersion`, `createdAt`, `updatedAt`, and a default `shortlisted: false` for consistent records.

## 2. Security
- Admin page is protected on the server before applicant data is fetched.
- Admin applicants API and shortlist mutation require an authenticated admin role.
- Shortlist payload is validated as a boolean.
- Added baseline security headers and disabled the `X-Powered-By` header.

## 3. Performance and client-side cleanup
- Removed intentionally expensive render-time loops from the home, form and admin paths.
- Removed mouse/scroll telemetry state that caused unnecessary rerenders and event listeners.
- Removed local-storage parsing from render and simplified session handling.
- Enabled React strict mode and response compression in Next configuration.

## 4. Operational improvements
- Removed the hard-coded expired recruitment deadline. A deployment can now control the deadline with `RECRUITMENT_DEADLINE`; leaving it empty keeps the portal open.
- Updated `.env.example` with explicit production configuration and secret-handling guidance.

## Interview reasoning
The key storage bug was not merely a database problem: the data was lost earlier in the request pipeline because rendered form fields were absent from the validation schema and therefore were not reliably present in the submitted values. The fix treats the full path as a system: validated client shape -> authenticated server identity -> normalized payload -> atomic, deterministic persistence.
