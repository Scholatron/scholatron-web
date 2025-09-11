# Database Schema Documentation

## Overview
This document provides a comprehensive overview of the database schema including all tables, their columns, data types, constraints, and relationships.

## Tables

### 1. students
**Purpose:** Stores student information

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | - | - |
| name | text | NO | - | - |
| regno | text | NO | - | - |
| dob | date | NO | - | - |
| email | text | YES | - | - |
| phone | text | YES | - | - |

---

### 2. chatroom_messages
**Purpose:** Stores messages sent in chatrooms

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| chatroom_uid | uuid | NO | - | chatrooms.uid (CASCADE) |
| sender_uuid | uuid | NO | - | - |
| content | text | YES | - | - |
| message_type | text | NO | 'text' | - |
| file_url | text | YES | - | - |
| seen_by | ARRAY | YES | '{}' | - |
| created_at | timestamp with time zone | YES | now() | - |

---

### 3. chatrooms
**Purpose:** Stores chatroom information

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| created_at | timestamp with time zone | YES | now() | - |
| updated_at | timestamp with time zone | YES | now() | - |
| name | text | NO | - | - |
| description | text | YES | - | - |
| created_by | uuid | NO | - | - |
| admins | ARRAY | NO | - | - |
| members | ARRAY | NO | - | - |

---

### 4. posts
**Purpose:** Stores user posts

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| poster | uuid | NO | - | - |
| type | text | NO | - | - |
| name | text | NO | - | - |
| title | text | YES | - | - |
| description | text | YES | - | - |
| created_at | timestamp with time zone | YES | now() | - |
| updated_at | timestamp with time zone | YES | now() | - |

---

### 5. class_divisions
**Purpose:** Stores class division information

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| class_id | text | NO | - | - |
| students | ARRAY | NO | - | - |
| created_at | timestamp with time zone | YES | now() | - |
| updated_at | timestamp with time zone | YES | now() | - |

---

### 6. clubs
**Purpose:** Stores club information

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| creator_uid | uuid | NO | - | - |
| created_at | timestamp with time zone | YES | now() | - |
| updated_at | timestamp with time zone | YES | now() | - |
| description | text | YES | - | - |
| category | text | YES | - | - |
| board | ARRAY | NO | - | - |
| members | ARRAY | NO | - | - |
| senior_members | ARRAY | YES | - | - |

---

### 7. direct_chats
**Purpose:** Stores direct chat sessions between users

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| user1_uuid | uuid | NO | - | - |
| user2_uuid | uuid | NO | - | - |
| created_at | timestamp with time zone | YES | now() | - |
| updated_at | timestamp with time zone | YES | now() | - |

---

### 8. direct_messages
**Purpose:** Stores messages in direct chats

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| chat_id | uuid | NO | - | direct_chats.uid (CASCADE) |
| sender_uuid | uuid | NO | - | - |
| content | text | YES | - | - |
| message_type | text | NO | 'text' | - |
| file_url | text | YES | - | - |
| seen | boolean | YES | false | - |
| seen_at | timestamp with time zone | YES | - | - |
| created_at | timestamp with time zone | YES | now() | - |

---

### 9. events
**Purpose:** Stores event information

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| start_time | timestamp with time zone | NO | - | - |
| end_time | timestamp with time zone | NO | - | - |
| created_at | timestamp with time zone | YES | now() | - |
| updated_at | timestamp with time zone | YES | now() | - |
| description | text | YES | - | - |
| rules | text | YES | - | - |
| venue | text | YES | - | - |
| poster | text | YES | - | - |

---

### 10. faculty
**Purpose:** Stores faculty member information

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | - | - |
| name | text | NO | - | - |
| department | text | YES | - | - |
| school | text | YES | - | - |
| emailid | text | YES | - | - |
| cabin_number | text | YES | - | - |
| phone | text | YES | - | - |
| created_at | timestamp with time zone | YES | now() | - |
| updated_at | timestamp with time zone | YES | now() | - |

---

### 11. groups
**Purpose:** Stores group information

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| created_at | timestamp with time zone | YES | now() | - |
| updated_at | timestamp with time zone | YES | now() | - |
| name | text | NO | - | - |
| description | text | YES | - | - |
| created_by | uuid | NO | - | - |
| admins | ARRAY | NO | - | - |
| members | ARRAY | NO | - | - |

---

### 12. post_engagements
**Purpose:** Stores user interactions with posts (likes, comments, etc.)

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| post_id | uuid | NO | - | posts.uid (CASCADE) |
| user_uid | uuid | NO | - | - |
| engagement_type | text | NO | - | - |
| comment_content | text | YES | - | - |
| created_at | timestamp with time zone | YES | now() | - |

---

### 13. post_files
**Purpose:** Stores files attached to posts

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| post_id | uuid | NO | - | posts.uid (CASCADE) |
| file_name | text | NO | - | - |
| file_url | text | NO | - | - |
| created_at | timestamp with time zone | YES | now() | - |

---

### 14. announcements
**Purpose:** Stores social media style posts

| Column | Type | Nullable | Default | Foreign Keys |
|--------|------|----------|---------|--------------|
| uid | uuid | NO | gen_random_uuid() | - |
| author_uid | uuid | NO | - | - |
| content | text | NO | - | - |
| visibility | text | NO | - | - |
| target_id | uuid | YES | - | - |
| created_at | timestamp with time zone | YES | now() | - |
| updated_at | timestamp with time zone | YES | now() | - |

---

## Relationships

### Foreign Key Relationships
1. **chatroom_messages.chatroom_uid** → **chatrooms.uid**
   - Delete Rule: CASCADE
   - Update Rule: NO ACTION

2. **direct_messages.chat_id** → **direct_chats.uid**
   - Delete Rule: CASCADE
   - Update Rule: NO ACTION

3. **post_engagements.post_id** → **posts.uid**
   - Delete Rule: CASCADE
   - Update Rule: NO ACTION

4. **post_files.post_id** → **posts.uid**
   - Delete Rule: CASCADE
   - Update Rule: NO ACTION

### Array Relationships (No FK constraints)
- **chatrooms.admins** and **chatrooms.members**: Arrays of UUIDs (likely referencing students/users)
- **chatroom_messages.seen_by**: Array of UUIDs tracking who has seen the message
- **class_divisions.students**: Array of student UUIDs
- **clubs.board**, **clubs.members**, **clubs.senior_members**: Arrays of user UUIDs
- **groups.admins** and **groups.members**: Arrays of user UUIDs

## Key Observations

### Primary Keys
All tables use UUID primary keys with `gen_random_uuid()` as the default (except students and faculty tables).

### Timestamps
Most tables include `created_at` and `updated_at` timestamp fields with `now()` as default.

### Messaging System
The database supports both:
- **Group messaging** via `chatrooms` and `chatroom_messages`
- **Direct messaging** via `direct_chats` and `direct_messages`

### Content Management
- **Posts** with file attachments (`post_files`) and user engagement (`post_engagements`)
- **Social posts** with visibility controls and targeting
- **Events** with time, venue, and rules information

### User Management
- **Students** with basic profile information
- **Faculty** with department and contact details
- **Groups** and **Clubs** with member hierarchies
- **Class divisions** for academic organization

### Missing Foreign Key Constraints
Several UUID columns appear to reference other tables but lack formal foreign key constraints:
- User references in various tables (sender_uuid, author_uid, poster, etc.)
- Array-based relationships are not enforced at the database level

This schema supports a comprehensive educational platform with messaging, content sharing, event management, and organizational features.