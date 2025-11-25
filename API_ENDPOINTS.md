# API Endpoints

The backend exposes the following RESTful API endpoints.

**Security:** All endpoints (except Auth) require a valid JWT Bearer token.
The `Authorization: Bearer <token>` header must be provided.

## Auth (`/api/Auth`)
- `GET /api/Auth`: Health check, returns "Hello, World!".
- `POST /api/Auth/token`: Generates a JWT token for a user.

## Access Control (PDP) (`/api/Access`)
- `POST /api/Access/check`: Check if a user (or subject) has permission to access a resource.
  - Body: `{ "Subject": "alice", "Domain": "domain1", "Object": "data1", "Action": "read" }`
  - Returns: `{ "allowed": true/false }`
  - Note: If `Subject` is omitted, the ID from the JWT token is used.

## Policy Management (`/api/CasbinPolicies`)
- `GET /api/CasbinPolicies`: List all active policies.
- `POST /api/CasbinPolicies`: Add a new policy rule.
  - Body: `{ "Subject": "alice", "Domain": "domain1", "Object": "data1", "Action": "read" }`
- `DELETE /api/CasbinPolicies`: Remove a policy rule.
  - Body: Same as POST.

## Resources (`/api/Resources`)
- `GET /api/Resources`: List all resources (Requires Auth).
- `GET /api/Resources/{id}`: Get a specific resource.
- `POST /api/Resources`: Create a new resource.
- `PUT /api/Resources/{id}`: Update an existing resource.
- `DELETE /api/Resources/{id}`: Delete a resource.

## Users & Roles
- Standard CRUD endpoints available at `/api/Users`, `/api/Roles`, `/api/UserAttributes`.
