# Booking System Phase 6: CRUD Data Flow Models

This document maps out the data flow for Create, Read, Update, and Delete operations in Phase 6, verified using browser Developer Tools.

## 1. CREATE (C) Operation
**Trigger:** User fills out the resource form and clicks "Create".
**Endpoint:** `POST /api/resources`

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js)
    participant B as Backend (Express Route)
    participant DB as PostgreSQL

    U->>F: Fills form & clicks "Create"
    F->>B: POST /api/resources (JSON payload)
    
    alt Success
        B->>DB: INSERT INTO resources...
        DB-->>B: New row ID & timestamp
        B-->>F: 201 Created (or 200 OK) with data
        F-->>U: Shows green Success message
    else Validation Error
        B-->>F: 400 Bad Request (Validation failed)
        F-->>U: Shows red Error message
    else Duplicate Error
        B-->>F: 409 Conflict (Name exists)
        F-->>U: Shows yellow Duplicate warning
    end
```
## 2. READ (R) Operation
**Trigger:** User opens or refreshes the resources page.
**Endpoint:** `GET /api/resources`

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (resources.js)
    participant B as Backend (Express Route)
    participant DB as PostgreSQL

    U->>F: Opens or refreshes page
    F->>B: GET /api/resources
    
    alt Success
        B->>DB: SELECT * FROM resources
        DB-->>B: Array of resource records
        B-->>F: 200 OK (JSON array)
        F-->>U: Renders list of resources on UI
    else Server Error
        B-->>F: 500 Internal Server Error
        F-->>U: Shows error / blank list
    end
```
## 3. UPDATE (U) Operation
**Trigger:** User clicks a resource, edits the form, and clicks "Update".
**Endpoint:** `PUT /api/resources/:id`

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js)
    participant B as Backend (Express Route)
    participant DB as PostgreSQL

    U->>F: Edits form & clicks "Update"
    F->>B: PUT /api/resources/:id (JSON payload)
    
    alt Success
        B->>DB: UPDATE resources SET ... WHERE id = :id
        DB-->>B: Updated row data
        B-->>F: 200 OK (JSON object)
        F-->>U: Shows green Success message
    else Validation Error
        B-->>F: 400 Bad Request (Validation failed)
        F-->>U: Shows red Error message
    else Not Found
        B-->>F: 404 Not Found (Resource already deleted)
        F-->>U: Shows error message
    end
```
## 4. DELETE (D) Operation
**Trigger:** User clicks a resource, and clicks the red "Delete" button.
**Endpoint:** `DELETE /api/resources/:id`

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js)
    participant B as Backend (Express Route)
    participant DB as PostgreSQL

    U->>F: Clicks red "Delete" button
    F->>B: DELETE /api/resources/:id
    
    alt Success
        B->>DB: DELETE FROM resources WHERE id = :id
        DB-->>B: Row deleted
        B-->>F: 204 No Content
        F-->>U: Shows green Success message & clears form
    else Not Found
        B-->>F: 404 Not Found (Resource already deleted)
        F-->>U: Shows error message
    end        