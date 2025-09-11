# Scholatron.md [1]

Scholatron is a unified campus platform that brings academics, social life, and official communications into one student-first web app to replace fragmented WhatsApp classes, notice boards, scattered drive links, and word-of-mouth updates [1].  
This document details the scope, features, architecture, security model, and implementation plan for a pure **Next.js** + Supabase stack ready for hackathon execution and beyond [1][2][14].  

## Problem [1]
Campus information is split across chats, posters, folders, and informal channels, causing missed events, lost academic resources, and unreliable communication across hostels, clubs, and classes [1].  
There is no single trusted platform that blends academics, social engagement, and admin-level updates in an accessible, timely, and verifiable way [1].  

## Solution [1]
Scholatron unifies feeds, chats, clubs, events, timetables, assignments, marks, announcements, and resources in one app with role-aware access and smart notifications to reduce noise and increase relevance [1].  
The implementation is a pure **Next.js** App Router application with Supabase Auth, Postgres, and Storage, using server-side auth, route handlers, and Row Level Security to enforce least-privilege data access by default [1][2][7][14].  

## Goals [1]
- Provide a single source of truth for events, official announcements, academic resources, and class workflows with verifiable provenance from faculty and clubs [1].  
- Increase student engagement and cut through information overload with targeted delivery by class, hostel, club, and interest membership [1].  

## Non‑Goals [1]
- No separate backend framework or microservice layer; all server logic is handled via Next.js Route Handlers and Server Actions with Supabase as the data and auth layer [1][14][17][2].  
- Exclude AI assistant, media generation, and voice announcement features for this version to streamline the MVP and simplify compliance and moderation [1].  

## Tech Stack (Pure Next.js) [1]
- Framework & UI: Next.js (App Router), Tailwind CSS, shadcn/ui, Framer Motion for subtle motion and UX polish [1].  
- Platform: Supabase (Auth, Postgres, Storage) with RLS-first authorization policies and signed URL storage access [1][7][19].  
- Hosting & Dev: Vercel for web and API routes, GitHub for CI/CD and collaboration, environment-based previews for rapid iteration [1].  

## Architecture [1]
- App Router: Use /app for pages and co-locate API under /app/api with Route Handlers for GET/POST/PUT/PATCH/DELETE, selecting Node runtime as default for Supabase SDK usage [1][14][17].  
- Server Actions: Use “use server” actions for UI-bound mutations to simplify client code and keep secrets server-side while leveraging framework caching semantics [1][2][14].  
- Supabase SSR: Configure @supabase/ssr cookie-based clients for both browser and server to unify session across Client Components, Server Components, Server Actions, and Route Handlers [1][2][5].  

## Security Model [1]
- Auth: Supabase Auth with cookie-based SSR clients created via @supabase/ssr for consistent session handling across the Next.js stack [1][2][5].  
- RLS Everywhere: Enable Row Level Security on all tables in exposed schemas and write policies for ownership, role, and membership to guard every read/write path [1][7][13].  
- Storage Access: Map Storage objects to database rows and rely on signed URLs plus policy-backed metadata for predictable authorization gates [1][19].  

## Data Model (High Level) [1]
- profiles/users: Identity tied to Supabase user id with role fields (student, faculty, admin) and campus metadata for scoping [1][7].  
- clubs & memberships: Club records, officers, and member join table used in RLS to gate posts, chats, and events [1][7].  
- posts & reactions: Feed items with scoped visibility (class, club, hostel, public) and engagement tracked via reactions/comments [1][7].  
- chats & messages: 1:1 and group chats keyed by membership mapping and message rows with storage-backed media [1][7].  
- events & RSVPs: Events with time, place, organizers, RSVP state, and reminder configuration linked to user membership [1][7].  
- timetable & trackers: Class schedules, exams, and personal reminders associated with user, class, and course mapping [1][7].  
- assignments & marks: Faculty-created assignments, submissions, grades, release controls, and audit fields [1][7].  
- resources & media: Notes, guides, previous papers, and attachments stored in Supabase Storage with row links [1][19].  
- marketplace: Listings, categories, seller profiles, and moderation flags with ownership-based policies [1][7].  
- notifications: User-targeted notifications, delivery states, and preference rules for channel and frequency [1][7].  

## Main Features [1]
- Posts & Feed: Central feed of campus updates, notes, and official club/faculty posts with scoped visibility, moderation, and attachments for richer context [1].  
- Chats: Direct and group messaging across class, club, and hostel contexts with role-aware permissions and lightweight media sharing [1].  
- Clubs & Communities: Discover clubs, join communities, follow announcements, and participate in discussions within permissioned spaces [1].  
- Events: Discover fests and hackathons, RSVP, and receive reminders, with relevance boosted by memberships and timetable context [1].  
- Timetable & Tracker: Personal and academic schedules, exam dates, and reminder workflows to stay ahead of deadlines [1].  
- Marketplace: Buy/sell essentials like books with simple listing flows, basic safety controls, and reporting hooks [1].  
- Assignments & Marks: Faculty announcements, student submissions, grading workflows, and release notifications per course [1].  
- Announcements Hub: Trusted notices from faculty and admin with read receipts and scope by class, hostel, or role [1].  
- Academic Resources: Curated notes, guides, previous papers, and study material linked to courses for discoverability [1].  
- Collaboration Space: Project spaces with threads, resource links, and simple task checklists for group work [1].  

## Additional Features [1]
- Campus Map & Navigation: Wayfinding across classrooms, hostels, cafeterias, labs, and event venues [1].  
- Analytics & Insights: Privacy-conscious attendance and grade trend views with personal performance indicators [1].  
- Rewards & Gamification: Points, badges, and leaderboards to incentivize participation and contributions [1].  
- Smart Notifications: Class, event, and deadline reminders targeted by class, hostel, club, role, and preferences [1].  
- Idea & Innovation Hub: Pitch ideas, form teams, and join campus challenges and initiatives [1].  
- Media Gallery: Photos and videos from events and clubs with selective visibility and tagging [1].  
- Anonymous Feedback & Polls: Feedback to faculty and campus polls with guardrails against abuse [1].  
- Interest Communities: Topic-based spaces for music, sports, coding, and other hobbies [1].  
- Digital ID & Campus Pass: Digital ID views and basic pass flows for library, labs, and hostel check-ins as policies allow [1].  
- External Integrations: Optional Google Calendar, Zoom, and LMS hooks as permissions and compliance permit [1].  

## RLS Policy Patterns [1]
- Ownership: Users can read/write rows where user_id = auth.uid() to scope private data by default [1][7].  
- Role-Based: Faculty/admin can insert and manage announcements, assignments, and grades for authorized courses or clubs [1][7].  
- Membership: Club posts, chats, and events restricted to members using join tables and membership claims in policies [1][7].  

## Storage & Media [1]
- Buckets: Store attachments, event banners, and gallery assets in Supabase Storage with bucket-level rules and signed URL delivery [1][19].  
- Row Links: Map every object to a DB row and enforce access via RLS-backed metadata to keep authorization predictable [1][19].  

## API & Actions (Pure Next.js) [1]
- Route Handlers: Implement REST-style endpoints under /app/api with route.ts supporting GET/POST/PUT/PATCH/DELETE as needed [1][17].  
- Server Actions: Use server actions for form-bound mutations like creating posts, RSVPs, and submissions to reduce client complexity [1][2][14].  
- Caching: Treat authenticated GETs as dynamic and opt out of caching where personalization applies, aligning with App Router guidance [1][14].  

## Example Routes [1]
- /api/posts: GET feed by membership and scope; POST create post with attachments respecting RLS scope [1][17].  
- /api/events: GET relevant events by club/class/hostel; POST RSVP toggle and schedule reminders [1][17].  
- /api/assignments: GET class tasks; POST submission; faculty-only grade mutations via role checks [1][17][7].  

## Implementation Plan (MVP) [1]
- Auth Setup: Install @supabase/supabase-js and @supabase/ssr, configure env vars, and create browser/server clients with cookie-based sessions [1][2][5].  
- Data & RLS: Create core tables (profiles, clubs, posts, events, assignments, resources) with RLS policies before wiring UI [1][7][13].  
- Core Flows: Build feed, clubs, events with RSVP, timetable, and resources upload/download with signed URLs [1][19].  
- Guardrails: Add moderation queues for posts/marketplace, announcement verification, and notification preferences [1].  

## MVP Scope [1]
- Deliver: Auth, profiles, posts/feed, clubs, events+RSVP+reminders, timetable, academic resources, and announcements hub [1].  
- Defer: AI assistant, generative media, and voice announcements to a later phase to keep MVP lean and compliant [1].  

## Why Pure Next.js Now [1]
- Velocity: Co-locate UI, APIs, and mutations in one codebase with App Router, Route Handlers, and Server Actions to iterate quickly during a hackathon [1][14][17].  
- Security: Supabase SSR + RLS-first design delivers strong defaults without managing a separate backend service or token plumbing complexity [1][2][7].  
