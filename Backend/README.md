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
