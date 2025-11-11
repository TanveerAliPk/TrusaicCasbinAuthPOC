# Casbin POC - Angular Frontend Architecture

## Overview

This Angular frontend provides a simple, easy-to-understand architecture for the Casbin RBAC/ABAC Hybrid Authorization POC. The design follows Angular best practices with clear separation of concerns and standalone components.

## Architecture Structure

```
client/src/
├── app/
│   ├── models/
│   │   └── index.ts              # Shared data models and interfaces
│   ├── services/
│   │   ├── casbin.service.ts     # API communication for Casbin operations
│   │   └── auth.service.ts       # Authentication state management
│   ├── components/
│   │   ├── home/
│   │   │   └── home.component.ts # Landing page
│   │   ├── dashboard/
│   │   │   └── dashboard.component.ts # Main dashboard with tab navigation
│   │   ├── policies/
│   │   │   └── policies.component.ts # Policy management
│   │   ├── resources/
│   │   │   └── resources.component.ts # Resource management
│   │   ├── attributes/
│   │   │   └── attributes.component.ts # User attributes (ABAC)
│   │   └── access-checker/
│   │       └── access-checker.component.ts # Access control testing
│   ├── app.component.ts          # Root component
│   └── main.ts                   # Application bootstrap
```

## Key Concepts

### 1. **Models (Data Structures)**

Located in `app/models/index.ts`, these TypeScript interfaces define all data structures used throughout the application:

- `User`: User information and roles
- `Policy`: Authorization policies (RBAC/ABAC)
- `Resource`: System resources with classification
- `UserAttribute`: User attributes for ABAC
- `AccessCheckRequest/Response`: Access control testing

**Why:** Centralized models ensure type safety and consistency across the application.

### 2. **Services (Business Logic)**

Services handle all backend communication and state management:

#### **CasbinService**
- Communicates with backend tRPC API
- Methods: `getPolicies()`, `addPolicy()`, `deletePolicy()`, `checkAccess()`, `getResources()`, `createResource()`, `getUsers()`, `getUserAttributes()`, `setUserAttribute()`
- Single responsibility: API communication only

#### **AuthService**
- Manages authentication state
- Provides `currentUser$` observable for reactive updates
- Methods: `getCurrentUser()`, `isAuthenticated()`, `logout()`

**Why:** Services separate business logic from components, making code reusable and testable.

### 3. **Components (UI)**

Each component has a single responsibility and is standalone:

#### **HomeComponent**
- Landing page for unauthenticated users
- Displays features and technical stack
- Provides login link

#### **DashboardComponent**
- Main container with tab navigation
- Displays user information and logout button
- Switches between different feature components

#### **PoliciesComponent**
- Add new policies (RBAC/ABAC)
- View existing policies
- Delete policies
- Form validation and error handling

#### **ResourcesComponent**
- Create new resources
- View all resources
- Display resource classification and metadata

#### **AttributesComponent**
- Select users from dropdown
- Assign custom attributes to users
- View user attributes

#### **AccessCheckerComponent**
- Test access control in real-time
- Input: subject, object, action
- Output: Allow/Deny with visual feedback

#### **AppComponent**
- Root component
- Conditional rendering: Home or Dashboard based on authentication

**Why:** Standalone components are simpler, more modular, and easier to test. Each component focuses on one feature.

## Data Flow

```
User Interaction
    ↓
Component (handles user input)
    ↓
Service (communicates with backend)
    ↓
Backend API (tRPC)
    ↓
Service (returns Observable)
    ↓
Component (subscribes to Observable, updates view)
```

### Example: Adding a Policy

1. User fills form in `PoliciesComponent`
2. Clicks "Add Policy" button
3. Component calls `casbinService.addPolicy(policy)`
4. Service sends HTTP POST to backend
5. Backend processes and returns success
6. Component receives response and reloads policies
7. View updates with new policy

## Reactive Programming with RxJS

Services return **Observables** for async operations:

```typescript
// In service
getPolicies(): Observable<PoliciesResponse> {
  return this.http.get<PoliciesResponse>(`${this.apiUrl}/casbin.getPolicies`);
}

// In component
ngOnInit(): void {
  this.casbinService.getPolicies().subscribe({
    next: (data) => this.policies = data.policies,
    error: (error) => console.error(error)
  });
}
```

**Benefits:** Automatic cleanup, error handling, and reactive updates.

## Styling Approach

Each component includes **scoped styles** using Angular's `styles` array:

- Styles are encapsulated to the component
- No global CSS conflicts
- Easy to maintain and modify
- Uses Tailwind-like utility classes inline

## Authentication Flow

1. User visits home page (unauthenticated)
2. Clicks "Sign In" → redirects to `/api/oauth/login`
3. After authentication, redirected back to app
4. `AppComponent` checks `AuthService.currentUser$`
5. If authenticated, shows `DashboardComponent`
6. If not, shows `HomeComponent`

## Simple Architecture Benefits

✓ **Easy to understand**: Clear separation of concerns
✓ **Easy to modify**: Each component/service has single responsibility
✓ **Easy to test**: Services can be mocked, components isolated
✓ **Easy to extend**: Add new features by creating new components
✓ **Type-safe**: Full TypeScript support with interfaces
✓ **Reactive**: RxJS observables for async operations
✓ **Standalone**: No need for NgModules

## Adding a New Feature

To add a new feature (e.g., Role Management):

1. Create `app/components/roles/roles.component.ts`
2. Define models in `app/models/index.ts` if needed
3. Add methods to `CasbinService` for API calls
4. Add tab to `DashboardComponent`
5. Import component in `DashboardComponent`
6. Add tab button and conditional rendering

## Common Patterns

### Loading State
```typescript
isLoading = false;

loadData(): void {
  this.isLoading = true;
  this.service.getData().subscribe({
    next: (data) => this.data = data,
    error: (error) => console.error(error),
    complete: () => this.isLoading = false
  });
}
```

### Error Handling
```typescript
subscribe({
  next: (data) => { /* success */ },
  error: (error) => alert('Error: ' + error.message),
  complete: () => { /* cleanup */ }
});
```

### Form Validation
```typescript
submit(): void {
  if (!this.form.subject || !this.form.object) {
    alert('Please fill in all fields');
    return;
  }
  // proceed with submission
}
```

## Best Practices Used

1. **Standalone Components**: Modern Angular approach, no NgModules
2. **Dependency Injection**: Services injected via constructor
3. **Observables**: For async operations and state management
4. **Type Safety**: Full TypeScript with interfaces
5. **Separation of Concerns**: Models, Services, Components
6. **Single Responsibility**: Each component/service does one thing
7. **Error Handling**: Try-catch and error callbacks
8. **Loading States**: User feedback during async operations

## Conclusion

This Angular architecture is intentionally simple and straightforward, making it easy for developers to understand, modify, and extend. Each layer has a clear purpose, and the data flow is predictable and easy to follow.
