# Backend Integration Checklist

## Auth

- [ ] Choose auth provider (NextAuth/Auth.js, Clerk, Supabase Auth, custom)
- [ ] Define user identity model (`id`, `username`, display name, avatar)
- [ ] Add session handling for app routes and API calls
- [ ] Protect write actions (follow, played, wishlist, profile edits)
- [ ] Add auth error/expired-session handling UX

## API Wiring

- [ ] Replace `lib/api.ts` mock functions with real API client calls
- [ ] Keep exported API surface stable (`getFeed`, `searchCourses`, `getProfile`, `getCourseDetail`)
- [ ] Preserve `slugify` usage for route href construction where needed
- [ ] Add request timeout / retry policy for read endpoints
- [ ] Add typed response validation (runtime schema or equivalent)
- [ ] Normalize backend responses into UI-friendly models

## Features Requiring Backend

- [ ] Feed data source (follow graph + activity events)
- [ ] Search indexing/query endpoint for courses
- [ ] Course detail endpoint (metadata, stats, location copy)
- [ ] Profile endpoint (played and wishlist lists)
- [ ] Follow/unfollow mutations
- [ ] Mark played / add to wishlist / remove from wishlist mutations
- [ ] Pagination or cursor loading for feed/search/profile lists
- [ ] Error reporting/observability for failed requests

## Data / Content

- [ ] Course canonical IDs must match route slugs used by `/course/[id]`
- [ ] Backfill real course metadata (par, yardage, access, designer, year)
- [ ] Content moderation / validation rules for user-generated activity text
- [ ] Empty-state semantics from API (`[]` vs null vs permission errors)

## Infrastructure / Operations

- [ ] Environment variables for API base URL and auth secrets
- [ ] Separate dev/staging/prod backend environments
- [ ] CORS / same-origin strategy for Next app and API
- [ ] Rate limiting for public endpoints (search/course detail)
- [ ] Caching strategy (SSR/ISR/client cache) for read-heavy pages
- [ ] Monitoring/logging for API latency and error rates
- [ ] CI checks for type safety and integration tests

## QA Before Mock Removal

- [ ] Feed/Search/Profile/Course screens load with real data
- [ ] Skeletons show during real network delay and swap cleanly
- [ ] Empty states render with real empty payloads
- [ ] ErrorView renders on API failures and retry works
- [ ] Bottom tab routes and `/course/[id]` navigation work end-to-end
