<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# so write a downloadble db-api.md

descibing all apis\

Yes—here is a complete db-api.md you can save and use, documenting GET, POST, and DELETE-by-uid endpoints for all 14 tables under app/api/db using Next.js Route Handlers and your schema.[^1][^2][^3]

# db-api.md

## Overview

- This API exposes CRUD endpoints for your 14 Supabase tables via Next.js Route Handlers under the base path /api/db, using dynamic segments for table and uid.[^2][^3]
- Routes are implemented with route.ts files inside app/api/db/[table]/ and app/api/db/[table]/[uid]/ following Next.js App Router conventions.[^4][^2]
- All schemas, fields, required columns, and defaults in this document come from Database.md.[^1]


## Conventions

- Endpoints:
    - GET /api/db/{table} → list rows.[^3][^2]
    - POST /api/db/{table} → insert one or many rows (JSON object or array).[^5][^2]
    - DELETE /api/db/{table}/{uid} → delete by primary key uid.[^2][^3]
- Auth and DB access are handled server-side with @supabase/ssr in Route Handlers, keeping keys server-only and compatible with RLS.[^6][^2]
- For POST, omit columns with DB defaults like gen_random_uuid() and now() unless the table lacks a default for uid.[^1]


## students

- Paths:
    - GET /api/db/students.[^3][^2]
    - POST /api/db/students.[^2][^3]
    - DELETE /api/db/students/{uid}.[^3][^2]
- Required fields for POST: uid, name, regno, dob; email and phone optional since table has no defaults for uid and non-null constraints on the others.[^1]
- Sample POST JSON:

```json
{
  "uid": "4c1f9d3e-f0ab-4ce9-8f5a-8f2a7f3b2b1a",
  "name": "Alice Johnson",
  "regno": "2025CS001",
  "dob": "2007-08-15",
  "email": "alice@example.com",
  "phone": "+91-9876543210"
}
```


## chatroom_messages

- Paths:
    - GET /api/db/chatroom_messages.[^2][^3]
    - POST /api/db/chatroom_messages.[^3][^2]
    - DELETE /api/db/chatroom_messages/{uid}.[^2][^3]
- Required fields for POST: chatroom_uid, sender_uuid; message_type defaults to 'text', uid defaults to gen_random_uuid(), created_at defaults to now(), content and file_url optional.[^1]
- Sample POST JSON:

```json
{
  "chatroom_uid": "a3c2a9ce-2c71-4d46-8c63-6d8a9c1c2f31",
  "sender_uuid": "9d7f2d9f-2e3f-4381-9f77-6c6e9f2a1b45",
  "content": "Hey everyone, meeting at 5 PM!",
  "message_type": "text",
  "file_url": null
}
```


## chatrooms

- Paths:
    - GET /api/db/chatrooms.[^3][^2]
    - POST /api/db/chatrooms.[^2][^3]
    - DELETE /api/db/chatrooms/{uid}.[^3][^2]
- Required fields for POST: name, created_by, admins, members; uid has default gen_random_uuid(), created_at/updated_at default to now(), description optional.[^1]
- Sample POST JSON:

```json
{
  "name": "Project Phoenix",
  "description": "Planning and updates",
  "created_by": "0f48a2a7-9e4f-4b92-8f34-4c7eaa0dbb8e",
  "admins": ["0f48a2a7-9e4f-4b92-8f34-4c7eaa0dbb8e"],
  "members": [
    "0f48a2a7-9e4f-4b92-8f34-4c7eaa0dbb8e",
    "9d7f2d9f-2e3f-4381-9f77-6c6e9f2a1b45"
  ]
}
```


## posts

- Paths:
    - GET /api/db/posts.[^2][^3]
    - POST /api/db/posts.[^3][^2]
    - DELETE /api/db/posts/{uid}.[^2][^3]
- Required fields for POST: poster, type, name; description optional; uid defaults to gen_random_uuid(), timestamps default to now().[^1]
- Sample POST JSON:

```json
{
  "poster": "7c6f9c3b-8a2e-4a3b-9c7d-2e1a9f8b7c6d",
  "type": "announcement",
  "name": "Hackathon 2025",
  "description": "Join us for a 24-hour coding challenge!"
}
```


## classes

- Paths:
    - GET /api/db/classes.[^3][^2]
    - POST /api/db/classes.[^2][^3]
    - DELETE /api/db/classes/{uid}.[^3][^2]
- Required fields for POST: class_id, students (array of UUIDs); uid defaults to gen_random_uuid(), timestamps default to now().[^1]
- Sample POST JSON:

```json
{
  "class_id": "CSE-A-2025",
  "students": [
    "4c1f9d3e-f0ab-4ce9-8f5a-8f2a7f3b2b1a",
    "a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c"
  ]
}
```


## clubs

- Paths:
    - GET /api/db/clubs.[^2][^3]
    - POST /api/db/clubs.[^3][^2]
    - DELETE /api/db/clubs/{uid}.[^2][^3]
- Required fields for POST: creator_uid, board, members; description, category, senior_members optional; uid and timestamps default.[^1]
- Sample POST JSON:

```json
{
  "creator_uid": "c5b9ef8a-4e9c-4a2b-9d7f-2f1e3c4b5a6d",
  "description": "Robotics and automation club",
  "category": "Technical",
  "board": [
    "c5b9ef8a-4e9c-4a2b-9d7f-2f1e3c4b5a6d",
    "9d7f2d9f-2e3f-4381-9f77-6c6e9f2a1b45"
  ],
  "members": [
    "0f48a2a7-9e4f-4b92-8f34-4c7eaa0dbb8e",
    "4c1f9d3e-f0ab-4ce9-8f5a-8f2a7f3b2b1a"
  ],
  "senior_members": []
}
```


## direct_chats

- Paths:
    - GET /api/db/direct_chats.[^3][^2]
    - POST /api/db/direct_chats.[^2][^3]
    - DELETE /api/db/direct_chats/{uid}.[^3][^2]
- Required fields for POST: user1_uuid, user2_uuid; uid and timestamps default.[^1]
- Sample POST JSON:

```json
{
  "user1_uuid": "0f48a2a7-9e4f-4b92-8f34-4c7eaa0dbb8e",
  "user2_uuid": "9d7f2d9f-2e3f-4381-9f77-6c6e9f2a1b45"
}
```


## direct_messages

- Paths:
    - GET /api/db/direct_messages.[^2][^3]
    - POST /api/db/direct_messages.[^3][^2]
    - DELETE /api/db/direct_messages/{uid}.[^2][^3]
- Required fields for POST: chat_id, sender_uuid; message_type defaults to 'text', seen defaults to false, uid and created_at default, content and file_url optional.[^1]
- Sample POST JSON:

```json
{
  "chat_id": "f1a2b3c4-d5e6-4789-9abc-def012345678",
  "sender_uuid": "0f48a2a7-9e4f-4b92-8f34-4c7eaa0dbb8e",
  "content": "Yo, are we meeting now?",
  "message_type": "text",
  "file_url": null
}
```


## events

- Paths:
    - GET /api/db/events.[^3][^2]
    - POST /api/db/events.[^2][^3]
    - DELETE /api/db/events/{uid}.[^3][^2]
- Required fields for POST: start_time, end_time; other fields optional; uid and timestamps default.[^1]
- Sample POST JSON:

```json
{
  "start_time": "2025-10-05T09:00:00Z",
  "end_time": "2025-10-05T17:00:00Z",
  "description": "Annual Tech Fest",
  "rules": "No outside food; ID mandatory",
  "venue": "Main Auditorium",
  "poster": "https://cdn.example.com/posters/techfest-2025.png"
}
```


## faculty

- Paths:
    - GET /api/db/faculty.[^2][^3]
    - POST /api/db/faculty.[^3][^2]
    - DELETE /api/db/faculty/{uid}.[^2][^3]
- Required fields for POST: uid and name because uid has no default in this table; other fields optional.[^1]
- Sample POST JSON:

```json
{
  "uid": "e3a1c2b4-d5f6-47a8-9c0d-1e2f3a4b5c6d",
  "name": "Dr. Meera Nair",
  "department": "Computer Science",
  "school": "School of Computing",
  "emailid": "meera.nair@example.edu",
  "cabin_number": "B-214",
  "phone": "+91-9800012345"
}
```


## classes

- Paths:
    - GET /api/db/classes.[^3][^2]
    - POST /api/db/classes.[^2][^3]
    - DELETE /api/db/classes/{uid}.[^3][^2]
- Required fields for POST: name, created_by, admins, members; uid and timestamps default.[^1]
- Sample POST JSON:

```json
{
  "name": "AI Research Group",
  "description": "Exploring modern AI techniques",
  "created_by": "7c6f9c3b-8a2e-4a3b-9c7d-2e1a9f8b7c6d",
  "admins": ["7c6f9c3b-8a2e-4a3b-9c7d-2e1a9f8b7c6d"],
  "members": [
    "7c6f9c3b-8a2e-4a3b-9c7d-2e1a9f8b7c6d",
    "4c1f9d3e-f0ab-4ce9-8f5a-8f2a7f3b2b1a"
  ]
}
```


## post_engagements

- Paths:
    - GET /api/db/post_engagements.[^2][^3]
    - POST /api/db/post_engagements.[^3][^2]
    - DELETE /api/db/post_engagements/{uid}.[^2][^3]
- Required fields for POST: post_id, user_uid, engagement_type; comment_content optional; uid and created_at default.[^1]
- Sample POST JSON:

```json
{
  "post_id": "5b4a3921-9b7a-4e4c-9f6a-0a1b2c3d4e5f",
  "user_uid": "4c1f9d3e-f0ab-4ce9-8f5a-8f2a7f3b2b1a",
  "engagement_type": "like",
  "comment_content": null
}
```


## post_files

- Paths:
    - GET /api/db/post_files.[^3][^2]
    - POST /api/db/post_files.[^2][^3]
    - DELETE /api/db/post_files/{uid}.[^3][^2]
- Required fields for POST: post_id, file_name, file_url; uid and created_at default.[^1]
- Sample POST JSON:

```json
{
  "post_id": "5b4a3921-9b7a-4e4c-9f6a-0a1b2c3d4e5f",
  "file_name": "schedule.pdf",
  "file_url": "https://cdn.example.com/files/schedule.pdf"
}
```


## announcements

- Paths:
    - GET /api/db/announcements.[^2][^3]
    - POST /api/db/announcements.[^3][^2]
    - DELETE /api/db/announcements/{uid}.[^2][^3]
- Required fields for POST: author_uid, content, visibility; target_id optional; uid and timestamps default.[^1]
- Sample POST JSON:

```json
{
  "author_uid": "9d7f2d9f-2e3f-4381-9f77-6c6e9f2a1b45",
  "content": "Just published our project results!",
  "visibility": "public",
  "target_id": null
}
```


## Notes and Auth

- All handlers live in app/api/db/[table]/route.ts for GET/POST and app/api/db/[table]/[uid]/route.ts for DELETE, exporting functions named GET, POST, and DELETE respectively.[^4][^2]
- Use a server-side Supabase client with @supabase/ssr and Next.js cookies for session-aware queries and RLS, per Supabase’s SSR client guidance.[^6]

How to use: copy this content into a file named db-api.md at the project root or docs/ folder for team reference.[^1]
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^7][^8][^9]</span>

<div style="text-align: center">⁂</div>

[^1]: Database.md

[^2]: https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware

[^3]: https://en.nextjs.im/docs/app/api-reference/file-conventions/dynamic-routes

[^4]: https://nextjs.org/docs/app/api-reference/file-conventions/route

[^5]: https://blog.logrocket.com/using-next-js-route-handlers/

[^6]: https://supabase.com/docs/guides/auth/server-side/creating-a-client

[^7]: https://stackoverflow.com/questions/75418329/how-do-you-put-api-routes-in-the-new-app-folder-of-next-js

[^8]: https://www.launchidea.in/blog/nextjs/nextjs-api-routes-backend-functionality

[^9]: https://maryetokwudo.hashnode.dev/nextjs-13-route-handlers-with-typescript

[^10]: https://www.tutorialspoint.com/nextjs/nextjs_route_handlers.htm

[^11]: https://www.geeksforgeeks.org/nextjs/next-js-dynamic-route-segments/

[^12]: https://stackoverflow.com/questions/78615007/how-to-create-a-shareable-supbase-server-client

[^13]: https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes

[^14]: https://www.buttercups.tech/blog/react/how-to-create-dynamic-routes-in-nextjs-app-router

[^15]: https://anotherwrapper.com/blog/supabase-auth-nextjs

[^16]: https://hub.continue.dev/supabase/bootstrap-nextjs-app

[^17]: https://stackoverflow.com/questions/76578186/how-to-get-dynamic-segment-in-next-js-13-app-router

[^18]: https://www.owolf.com/blog/setting-up-supabase-api-for-nextjs-14-app-with-server-side-rendering-ssr

[^19]: https://deepwiki.com/cline/prompts/6.3-next.js-and-supabase-integration

