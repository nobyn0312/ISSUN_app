```mermaid
erDiagram
    PRODUCT {
        string id
        string name
        string description
        number price
        num category
        date created_at
        date updated_at
    }
    USER {
        string id
        string username
        string email
        string password
        date created_at
        date updated_at
    }
    REVIEW {
        string id
        string product_id
        string user_id
        number rating
        string comment
        date created_at
        date updated_at
    }

    USER ||--o{ REVIEW : writes
    PRODUCT ||--o{ REVIEW : receives
```
