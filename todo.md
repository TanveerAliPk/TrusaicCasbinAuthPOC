# Casbin RBAC/ABAC Hybrid Authorization POC - TODO

## Database Schema
- [x] Create users table with roles and attributes
- [x] Create roles table with role definitions
- [x] Create attributes table for ABAC support
- [x] Create policies table for Casbin policy storage
- [x] Create resources table for mock resources

## Backend - Casbin Integration
- [x] Install Casbin npm package and dependencies
- [x] Implement Casbin adapter with EF Core-like persistence
- [x] Create tRPC procedures for authentication (login)
- [x] Create tRPC procedures for policy management (CRUD)
- [ ] Create tRPC procedures for role management
- [x] Create tRPC procedures for attribute management
- [x] Create tRPC procedures for resource access testing
- [x] Implement JWT token generation and validation
- [x] Implement policy enforcement logic

## Frontend - React Dashboard
- [x] Create login page with user selection
- [x] Create dashboard layout with navigation
- [x] Create policy management interface
- [ ] Create role management interface
- [x] Create attribute management interface
- [x] Create resource access testing interface
- [x] Implement visual feedback for allowed/denied decisions
- [x] Add policy editor/viewer component

## Testing & Deployment
- [x] Test RBAC policies
- [x] Test ABAC policies
- [x] Test hybrid RBAC/ABAC policies
- [x] Verify JWT authentication flow
- [x] Test all API endpoints
- [x] Deploy and verify functionality


## Frontend Rebuild - Angular
- [x] Set up Angular project structure with clear separation of concerns
- [x] Create core services for API communication (policies, resources, attributes)
- [x] Create shared models and interfaces for type safety
- [x] Build policy management component
- [x] Build resource management component
- [x] Build user attributes component
- [x] Build access checker component
- [x] Create main dashboard layout
- [x] Implement navigation and routing
- [x] Add styling with Angular Material or Bootstrap
- [x] Create home/landing page component
- [x] Create authentication service
- [x] Document Angular architecture


## Testing & Validation
- [x] Test backend API endpoints
- [x] Test Casbin policy enforcement
- [x] Test Angular components rendering
- [x] Test policy CRUD operations
- [x] Test resource management
- [x] Test user attributes
- [x] Test access control checking
- [x] Test authentication flow
- [x] Test error handling
- [x] Test database operations
- [x] Create test procedures document
- [x] Create test results document
