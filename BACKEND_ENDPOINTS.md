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

## Auth Requirement Notes (Relevant Endpoints)

- `POST /auth/authenticate`: no auth required
- `GET /courses/search`: auth required (`Bearer` JWT)
- `GET /courses/{courseId}`: auth required (`Bearer` JWT)

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
