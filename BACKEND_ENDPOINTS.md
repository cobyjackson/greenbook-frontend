## GreenBook Backend Endpoint Discovery

- Discovered on: 2026-02-25
- Backend host port: `8080`
- Backend context path: `/api/v1`
- OpenAPI spec: `http://localhost:8080/api/v1/v3/api-docs`
- Server URL in spec: `http://localhost:8080/api/v1`
- Global security: `bearerAuth` (JWT) unless endpoint overrides with `security: []`

## Authentication Endpoints

### Login

- Method: `POST`
- Path: `/auth/authenticate` (full URL path: `/api/v1/auth/authenticate`)
- Requires `Authorization` header: `no` (`security: []`)
- Request `Content-Type`: `application/json`
- Request body schema (`AuthenticationRequest`):
  - `emailOrUsername` (`string`, required)
  - `password` (`string`, required, minLength `8`)
- Success response: `200`
- Response `Content-Type`: `application/json`
- Response schema (`AuthenticationResponse`):
  - `token` (`string`) <- JWT token appears here
  - `expiresAt` (`string`, `date-time`)
- Token usage for protected endpoints:
  - Header: `Authorization: Bearer <token>`

### Register

- Method: `POST`
- Path: `/auth/register` (full URL path: `/api/v1/auth/register`)
- Requires `Authorization` header: `no` (`security: []`)
- Request `Content-Type`: `application/json`
- Request body schema (`RegistrationRequest`):
  - `name` (`string`, required)
  - `username` (`string`, required)
  - `email` (`string`, required)
  - `password` (`string`, required, minLength `8`)
- Success response: `202`

### Resend Verification

- Method: `POST`
- Path: `/auth/resend-verification` (full URL path: `/api/v1/auth/resend-verification`)
- Requires `Authorization` header: `no` (`security: []`)
- Query params:
  - `email` (`string`, required)
- Success response: `202`

## Course Endpoints

### Course Search

- Method: `GET`
- Path: `/courses/search` (full URL path: `/api/v1/courses/search`)
- Requires `Authorization` header: `yes` (inherits global `bearerAuth`)
- Request `Content-Type`: none (query string request)
- Response `Content-Type`: `application/json`
- Query params:
  - `query` (`string`, required)
  - `cursor` (`string`, optional)
- Success response: `200`
- Response schema (`CourseSummaryPage`):
  - `courseSummaries`: `CourseSummaryDTO[]`
    - `id` (`integer`, `int64`)
    - `location` (`LocationDTO`)
      - `address` (`string`)
      - `city` (`string`)
      - `state` (`string`)
      - `country` (`string`)
      - `latitude` (`number`)
      - `longitude` (`number`)
    - `club_name` (`string`)
    - `course_name` (`string`)
  - `nextCursor` (`string`)

### Course Detail

- Method: `GET`
- Path: `/courses/{courseId}` (full URL path: `/api/v1/courses/{courseId}`)
- Requires `Authorization` header: `yes` (inherits global `bearerAuth`)
- Path params:
  - `courseId` (`integer`, `int64`, required)
- Request `Content-Type`: none
- Response `Content-Type`: `application/json`
- Success response: `200`
- Response schema (`CourseDTO`):
  - `id` (`integer`, `int64`)
  - `location` (`LocationDTO`)
  - `tees` (`TeesDTO`)
    - `female`: `TeeDTO[]`
    - `male`: `TeeDTO[]`
    - `TeeDTO` fields include:
      - `holes`: `HoleDTO[]` (`par`, `yardage`)
      - `tee_name`, `course_rating`, `slope_rating`, `bogey_rating`
      - `total_yards`, `total_meters`, `number_of_holes`, `par_total`
      - `front_*`, `back_*` rating/slope/bogey fields
  - `club_name` (`string`)
  - `course_name` (`string`)

## User/Profile & Activity Endpoints

### My Profile

- Method: `GET`
- Path: `/me` (full URL path: `/api/v1/me`)
- Requires `Authorization` header: `yes` (inherits global `bearerAuth`)
- Request `Content-Type`: none
- Response `Content-Type`: `application/json`
- Success response: `200`
- Response schema (`UserProfileResponse`):
  - `id` (`integer`, `int64`)
  - `username` (`string`)
  - `bio` (`string | null`)
  - `name` (`string`)

### My Wishlist (Courses)

- Method: `GET`
- Path: `/me/wishlist` (full URL path: `/api/v1/me/wishlist`)
- Requires `Authorization` header: `yes` (inherits global `bearerAuth`)
- Request `Content-Type`: none
- Query params:
  - `sortOrder` (`ASC | DESC`, optional)
  - `cursor` (`string`, optional)
- Response `Content-Type`: `application/json`
- Success response: `200`
- Response schema (`UserCourseWishlistPageDto`):
  - `courseSummaries`: `CourseSummaryDTO[]` (`id`, `club_name`, `course_name`, `location`)
  - `nextCursor` (`string | null`)

### My Played Courses (Course Play Records)

- Method: `GET`
- Path: `/me/courseplay` (full URL path: `/api/v1/me/courseplay`)
- Requires `Authorization` header: `yes` (inherits global `bearerAuth`)
- Request `Content-Type`: none
- Query params:
  - `sortOrder` (`ASC | DESC`, optional)
  - `cursor` (`string`, optional)
- Response `Content-Type`: `application/json`
- Success response: `200`
- Response schema (`UserCoursePlayPageDto`):
  - `userCoursePlays`: `UserCoursePlayResponse[]`
    - `id` (`integer`, `int64`) <- userCoursePlay record id
    - `userId` (`integer`, `int64`)
    - `courseSummary` (`CourseSummaryDTO`)
      - `id` (`integer`, `int64`) <- stable backend course id
      - `club_name`, `course_name`, `location`
    - `played_at` (`string`, `date-time`)
    - `tee_time` (`string`, `date-time`)
    - `notes` (`string`)
    - `overallExperience` (`integer`)
    - `courseCondition` (`integer`)
    - `courseDifficulty` (`integer`)
  - `nextCursor` (`string | null`)

### Feed

- Method: `GET`
- Path: `/feed` (full URL path: `/api/v1/feed`)
- Requires `Authorization` header: `yes` (inherits global `bearerAuth`)
- Request `Content-Type`: none
- Query params:
  - `cursor` (`string`, optional)
- Response `Content-Type`: `application/json`
- Success response: `200`
- Response schema (`FeedPage`):
  - `items`: `FeedItemDTO[]`
    - `id` (`integer`, `int64`)
    - `userId` (`integer`, `int64`)
    - `username` (`string`)
    - `happenedAt` (`string`, `date-time`)
    - `type` (`COURSE_PLAYED | COURSE_WISHLISTED | REVIEW_POSTED`)
    - `payload` (`object`, event-specific)
      - For `COURSE_PLAYED`, live sample shows a `UserCoursePlayResponse`-like object, including `courseSummary`
  - `nextCursor` (`string | null`)

## Auth Requirement Notes (Relevant Endpoints)

- `POST /auth/authenticate`: no auth required
- `GET /courses/search`: auth required (`Bearer` JWT)
- `GET /courses/{courseId}`: auth required (`Bearer` JWT)
- `GET /me`: auth required (`Bearer` JWT)
- `GET /me/wishlist`: auth required (`Bearer` JWT)
- `GET /me/courseplay`: auth required (`Bearer` JWT)
- `GET /feed`: auth required (`Bearer` JWT)

## Critical Course Identifier (Use for `/course/[id]`)

- Backend stable course identifier field: `id`
- Type: `integer` (`int64`)
- Rule for frontend routing: use the backend `id` directly (do not slugify)

## Example Responses (live, trimmed)

### Login (`POST /api/v1/auth/authenticate`)

```json
{
  "token": "<jwt>",
  "expiresAt": "2026-02-25T04:23:40.820761042Z"
}
```

### Course Search (`GET /api/v1/courses/search?query=a`)

```json
{
  "courseSummaries": [
    {
      "id": 26947,
      "club_name": "'19 U.S. Amateur",
      "course_name": "'19 U.S. Amateur - Pinehurst No. 4",
      "location": {
        "address": null,
        "city": "Liberty Corner",
        "state": "NJ",
        "country": "United States",
        "latitude": null,
        "longitude": null
      }
    }
  ],
  "nextCursor": "..."
}
```

### Course Detail (`GET /api/v1/courses/26947`)

```json
{
  "id": 26947,
  "location": {
    "address": null,
    "city": "Liberty Corner",
    "state": "NJ",
    "country": "United States",
    "latitude": null,
    "longitude": null
  },
  "tees": {
    "female": null,
    "male": null
  },
  "club_name": "'19 U.S. Amateur",
  "course_name": "'19 U.S. Amateur - Pinehurst No. 4"
}
```

### My Profile (`GET /api/v1/me`)

```json
{
  "id": 3,
  "username": "coby123",
  "bio": null,
  "name": "Coby"
}
```

### My Wishlist (`GET /api/v1/me/wishlist`)

```json
{
  "courseSummaries": [
    {
      "id": 28373,
      "club_name": "Georgia Club",
      "course_name": "Red/Black",
      "location": {
        "city": "Statham",
        "state": "GA"
      }
    }
  ],
  "nextCursor": null
}
```

### My Course Plays (`GET /api/v1/me/courseplay`)

```json
{
  "userCoursePlays": [
    {
      "id": 223,
      "userId": 3,
      "courseSummary": {
        "id": 13679,
        "club_name": "West Essex Golf Club (1018491)",
        "course_name": "West Essex"
      },
      "played_at": "2026-02-08T08:53:18.569071Z"
    }
  ],
  "nextCursor": null
}
```

### Feed (`GET /api/v1/feed`)

```json
{
  "items": [
    {
      "id": 496,
      "userId": 8,
      "username": "herman123",
      "happenedAt": "2026-02-23T04:22:31.011467Z",
      "type": "COURSE_PLAYED",
      "payload": {
        "courseSummary": {
          "id": 5175,
          "course_name": "Dogwood Hills Golf Club"
        }
      }
    }
  ],
  "nextCursor": null
}
```
