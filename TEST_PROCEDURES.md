# Casbin POC - Manual Testing Procedures

## Pre-Test Checklist

Before starting tests, ensure:
- [ ] Application is running: `npm run dev`
- [ ] Browser is open to: `http://localhost:3000`
- [ ] Browser DevTools open (F12)
- [ ] Database is running
- [ ] No errors in console

---

## Test 1: Home Page Load

### Steps
1. Open `http://localhost:3000` in browser
2. Observe landing page

### Expected Results
- [ ] Page loads within 2 seconds
- [ ] Title shows "Casbin RBAC/ABAC Hybrid Authorization"
- [ ] Three feature cards display (RBAC, ABAC, Hybrid)
- [ ] "Key Features" section visible
- [ ] "Technical Stack" section visible
- [ ] "Sign In" button visible in header
- [ ] No console errors

### Pass/Fail: ___

---

## Test 2: Navigation & Layout

### Steps
1. Verify header layout
2. Check responsive design (resize window)
3. Scroll through page content

### Expected Results
- [ ] Logo and title visible in header
- [ ] Sign In button in top right
- [ ] Content centers properly
- [ ] Responsive on mobile (375px)
- [ ] Responsive on tablet (768px)
- [ ] Responsive on desktop (1920px)

### Pass/Fail: ___

---

## Test 3: Authentication Flow

### Steps
1. Click "Sign In" button
2. Complete OAuth login
3. Observe redirect

### Expected Results
- [ ] Redirected to login page
- [ ] After login, redirected back to app
- [ ] Dashboard displays
- [ ] User name shows in header
- [ ] "Logout" button visible

### Pass/Fail: ___

---

## Test 4: Dashboard Layout

### Steps
1. After login, verify dashboard
2. Check tab navigation

### Expected Results
- [ ] Dashboard header shows user info
- [ ] Four tabs visible: Policies, Resources, Attributes, Access Check
- [ ] Tabs are clickable
- [ ] Active tab highlighted
- [ ] Content changes when switching tabs

### Pass/Fail: ___

---

## Test 5: Policies Tab

### Steps
1. Click "Policies" tab
2. Observe policy list
3. Add a test policy

### Expected Results
- [ ] Tab content loads
- [ ] "Add New Policy" form visible
- [ ] Form fields: Subject, Object, Action, Effect
- [ ] "Add Policy" button present
- [ ] Can enter values in form
- [ ] Form validation works (try submitting empty)
- [ ] After adding, policy appears in list
- [ ] Policy shows: subject, object, action, effect

### Pass/Fail: ___

---

## Test 6: Resources Tab

### Steps
1. Click "Resources" tab
2. Create a test resource

### Expected Results
- [ ] Tab content loads
- [ ] "Create New Resource" form visible
- [ ] Form fields: Name, Type, Department, Classification
- [ ] Classification dropdown works
- [ ] "Create Resource" button present
- [ ] Can enter values in form
- [ ] After creating, resource appears in list
- [ ] Resource shows all fields

### Pass/Fail: ___

---

## Test 7: Attributes Tab

### Steps
1. Click "Attributes" tab
2. Select a user from dropdown
3. Add an attribute

### Expected Results
- [ ] Tab content loads
- [ ] User dropdown populated
- [ ] Can select user
- [ ] Attributes load for selected user
- [ ] Can enter attribute key and value
- [ ] "Set Attribute" button works
- [ ] After setting, attribute appears in list

### Pass/Fail: ___

---

## Test 8: Access Checker Tab

### Steps
1. Click "Access Check" tab
2. Enter test values
3. Click "Check Access"

### Expected Results
- [ ] Tab content loads
- [ ] Form fields: Subject, Object, Action
- [ ] Can enter values
- [ ] "Check Access" button works
- [ ] Result displays (Allow or Deny)
- [ ] Visual feedback clear (green for allow, red for deny)
- [ ] Result message shows: "subject can/cannot action object"

### Pass/Fail: ___

---

## Test 9: Policy Enforcement

### Steps
1. Add policy: user1 → resource1 → read → allow
2. Go to Access Checker
3. Check: user1, resource1, read
4. Check: user2, resource1, read

### Expected Results
- [ ] First check returns "Allow"
- [ ] Second check returns "Deny"
- [ ] Casbin enforces policy correctly

### Pass/Fail: ___

---

## Test 10: Form Validation

### Steps
1. Try submitting empty forms
2. Try invalid inputs

### Expected Results
- [ ] Empty form shows alert
- [ ] Cannot submit without required fields
- [ ] Error messages display
- [ ] Form prevents invalid submission

### Pass/Fail: ___

---

## Test 11: Logout

### Steps
1. Click "Logout" button
2. Observe redirect

### Expected Results
- [ ] Redirected to home page
- [ ] User info cleared
- [ ] "Sign In" button visible again
- [ ] Session cleared

### Pass/Fail: ___

---

## Test 12: Error Handling

### Steps
1. Try network operations with network disabled
2. Observe error messages

### Expected Results
- [ ] Error messages display
- [ ] No crashes
- [ ] Can retry operations
- [ ] Graceful error handling

### Pass/Fail: ___

---

## Test 13: Browser Console

### Steps
1. Open DevTools (F12)
2. Check Console tab
3. Check Network tab

### Expected Results
- [ ] No JavaScript errors
- [ ] No 404 errors
- [ ] API calls successful (200, 201 status)
- [ ] No CORS errors
- [ ] No warnings

### Pass/Fail: ___

---

## Test 14: Data Persistence

### Steps
1. Add policy
2. Refresh page
3. Check if policy still exists

### Expected Results
- [ ] Policy persists after refresh
- [ ] Data saved to database
- [ ] No data loss

### Pass/Fail: ___

---

## Test 15: Performance

### Steps
1. Measure page load time
2. Measure dashboard load time
3. Measure policy list load time
4. Measure access check response time

### Expected Results
- [ ] Home page loads < 2 seconds
- [ ] Dashboard loads < 2 seconds
- [ ] Policy list loads < 1 second
- [ ] Access check responds < 500ms

### Pass/Fail: ___

---

## Test Summary

| Test # | Name | Pass | Fail | Notes |
|--------|------|------|------|-------|
| 1 | Home Page Load | [ ] | [ ] | |
| 2 | Navigation & Layout | [ ] | [ ] | |
| 3 | Authentication Flow | [ ] | [ ] | |
| 4 | Dashboard Layout | [ ] | [ ] | |
| 5 | Policies Tab | [ ] | [ ] | |
| 6 | Resources Tab | [ ] | [ ] | |
| 7 | Attributes Tab | [ ] | [ ] | |
| 8 | Access Checker Tab | [ ] | [ ] | |
| 9 | Policy Enforcement | [ ] | [ ] | |
| 10 | Form Validation | [ ] | [ ] | |
| 11 | Logout | [ ] | [ ] | |
| 12 | Error Handling | [ ] | [ ] | |
| 13 | Browser Console | [ ] | [ ] | |
| 14 | Data Persistence | [ ] | [ ] | |
| 15 | Performance | [ ] | [ ] | |

---

## Issues Found

Document any issues here:

```
Issue #1: [Description]
- Steps to reproduce: ...
- Expected: ...
- Actual: ...
- Severity: Critical/High/Medium/Low

Issue #2: [Description]
- ...
```

---

## Test Completion

- **Date**: ___________
- **Tester**: ___________
- **Total Tests**: 15
- **Passed**: ___
- **Failed**: ___
- **Pass Rate**: ____%

---

## Sign Off

- [ ] All tests passed
- [ ] Issues documented
- [ ] Ready for production

**Tester Signature**: ___________
**Date**: ___________

---

## Notes for Next Testers

Document any findings or recommendations here for future testing sessions.

