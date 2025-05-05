# Backend Overview

This backend is built with Node.js, Express, and MongoDB (via Mongoose). It provides RESTful API endpoints for registering and logging in both readers and writers. Passwords are securely hashed, and JWT tokens are used for authentication. Input validation is handled using express-validator.

**Main folders:**
- `controllers/`: Handle request logic for each route.
- `models/`: Define Mongoose schemas for Reader and Writer.
- `routes/`: Define API endpoints and validation rules.
- `services/`: Contain business logic for creating users.
- `db/`: Database connection setup.

---

# API Documentation: Reader & Writer Registration

## Reader Registration

- **Endpoint:** `POST /reader/register`
- **Description:** Register a new reader account.

### Request Body
| Field            | Type     | Required | Description                                                      |
|------------------|----------|----------|------------------------------------------------------------------|
| fullName         | String   | Yes      | Full name of the reader.                                         |
| email            | String   | Yes      | Email address (must be valid and unique).                        |
| password         | String   | Yes      | Password (minimum 6 characters).                                 |
| genreFocus       | String   | Yes      | One of: Lyrical, Narrative, Sonnet, Haiku, Fantasy, Free Verse, Other |
| moodPreferences  | String[] | No       | Array of mood preferences: Reflective, Uplifting, Melancholic, Romantic |

#### Example Request
```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePass123",
  "genreFocus": "Lyrical",
  "moodPreferences": ["Reflective", "Uplifting"]
}
```

### Validation Rules
- `fullName`: Required, not empty
- `email`: Required, must be valid email
- `password`: Required, min 6 chars
- `genreFocus`: Required, must be one of allowed values
- `moodPreferences`: Optional, if present must be array of allowed strings

### Success Response
- **Status:** 201 Created
- **Body:**
```json
{
  "message": "Reader registered successfully",
  "reader": { /* Reader object */ },
  "token": "<JWT Token>"
}
```

---

## Writer Registration

- **Endpoint:** `POST /writer/register`
- **Description:** Register a new writer account.

### Request Body
| Field      | Type     | Required | Description                                                      |
|------------|----------|----------|------------------------------------------------------------------|
| fullName   | String   | Yes      | Full name of the writer.                                         |
| email      | String   | Yes      | Email address (must be valid and unique).                        |
| password   | String   | Yes      | Password (minimum 6 characters).                                 |
| genreFocus | String[] | Yes      | Array of genres: Lyrical, Narrative, Sonnet, Haiku, Fantasy, Free Verse, Other |
| penName    | String   | No       | Optional pen name.                                               |
| shortBio   | String   | No       | Optional bio (10-500 characters).                                |

#### Example Request
```json
{
  "fullName": "John Smith",
  "email": "john@example.com",
  "password": "writerPass456",
  "genreFocus": ["Fantasy", "Narrative"],
  "penName": "J.S. Writer",
  "shortBio": "Award-winning author of fantasy and narrative poetry."
}
```

### Validation Rules
- `fullName`: Required, not empty
- `email`: Required, must be valid email
- `password`: Required, min 6 chars
- `genreFocus`: Required, must be array of allowed values
- `penName`: Optional, string
- `shortBio`: Optional, string (10-500 chars)

### Success Response
- **Status:** 201 Created
- **Body:**
```json
{
  "message": "Writer registered successfully",
  "writer": { /* Writer object */ },
  "token": "<JWT Token>"
}
```

---

## Reader Login

- **Endpoint:** `POST /reader/login`
- **Description:** Log in as a reader.

### Request Body
| Field    | Type   | Required | Description           |
|----------|--------|----------|-----------------------|
| email    | String | Yes      | Reader's email        |
| password | String | Yes      | Reader's password     |

#### Example Request
```json
{
  "email": "jane@example.com",
  "password": "securePass123"
}
```

### Validation Rules
- `email`: Required, must be valid email
- `password`: Required, min 6 chars

### Success Response
- **Status:** 200 OK
- **Body:**
```json
{
  "message": "Reader logged in successfully",
  "reader": { /* Reader object */ },
  "token": "<JWT Token>"
}
```

---

## Writer Login

- **Endpoint:** `POST /writer/login`
- **Description:** Log in as a writer.

### Request Body
| Field    | Type   | Required | Description           |
|----------|--------|----------|-----------------------|
| email    | String | Yes      | Writer's email        |
| password | String | Yes      | Writer's password     |

#### Example Request
```json
{
  "email": "john@example.com",
  "password": "writerPass456"
}
```

### Validation Rules
- `email`: Required, must be valid email
- `password`: Required, min 6 chars

### Success Response
- **Status:** 200 OK
- **Body:**
```json
{
  "message": "Writer logged in successfully",
  "writer": { /* Writer object */ },
  "token": "<JWT Token>"
}
```

---

## Error Responses
- **Status:** 422 Unprocessable Entity
- **Body:**
```json
{
  "errors": [
    { "msg": "Error message", "param": "fieldName", ... }
  ]
}
```

## Notes
- Passwords are securely hashed before storage.
- JWT token is returned for authentication after successful registration.
- All endpoints expect and return JSON.
