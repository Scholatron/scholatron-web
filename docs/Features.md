# Features.md [1]

## Main [1]
- Posts & Feed — Campus-wide updates, notes, and official posts with scoped visibility (class, club, hostel, public) and attachment support for richer context [1].  
- Chats — 1:1 and group conversations across class, club, and hostel with role-aware permissions and lightweight media sharing for timely coordination [1].  
- Clubs & Communities — Discover, join, and engage with clubs and officer-led announcements within permissioned spaces to reduce noise and ensure trust [1].  
- Events — Browse fests and hackathons, RSVP, and receive reminders with prioritization by memberships and timetable relevance for better attendance [1].  
- Timetable & Tracker — Personal and academic schedules, exam calendars, and reminders to keep academic workflows on track without context switching [1].  
- Marketplace — Simple buy/sell listings for books and essentials with basic safety controls and reporting hooks for moderation [1].  
- Assignments & Marks — Faculty announcements, submissions, grading workflows, and release notifications scoped per course for transparency and timeliness [1].  
- Announcements Hub — Trusted faculty/admin notices with read receipts and scoping by class, hostel, or role to guarantee reach and accountability [1].  
- Academic Resources — Curated notes, guides, previous papers, and study material mapped to courses for easy discovery and reuse [1].  
- Collaboration Space — Lightweight project spaces with threads, resource links, and simple task checklists for group work efficiency [1].  

## Additional [1]
- Campus Map & Navigation — Wayfinding for classrooms, hostels, cafeterias, labs, and event venues to reduce friction in daily movement [1].  
- Analytics & Insights — Privacy-conscious attendance and grade trend views with personal performance indicators to inform study habits [1].  
- Rewards & Gamification — Points, badges, and leaderboards to incentivize contributions and sustained campus engagement [1].  
- Smart Notifications — Targeted reminders for classes, events, and deadlines by class, hostel, club, role, and user preferences to cut noise [1].  
- Idea & Innovation Hub — Pitch ideas, form teams, and join challenges to foster student-led initiatives and innovation culture [1].  
- Media Gallery — Event and club photos/videos with selective visibility and tagging for archival and discovery [1].  
- Anonymous Feedback & Polls — Structured faculty feedback and campus polls with guardrails against abuse for actionable signals [1].  
- Interest-based Communities — Topic spaces for music, sports, coding, and hobbies to promote peer learning and belonging [1].  
- Digital ID & Campus Pass — Digital ID and basic pass views for library, labs, and hostel check-ins as policies permit for smoother access [1].  
- External Integrations — Optional Google Calendar, Zoom, and LMS hooks subject to permissions and compliance for reduced duplication [1].  

## Future [1]
- Verified Identities — Club and faculty verification badges to signal authenticity and reduce misinformation in feeds and chats [1].  
- Ticketing & Entry — Event ticketing, QR passes, and basic attendance scanning to professionalize campus events and measure reach [1].  
- Deep Analytics — Course and attendance analytics with opt-in dashboards and privacy-preserving aggregates for academic planning [1].  
- Calendar/LMS Sync — Two-way sync with calendars and learning systems to centralize deadlines and minimize manual updates [1].  
- Offline-first PWA — Installable mobile experience with offline caching for timetables, resources, and recent chats to improve reliability [1].  
- Moderation & Safety — Expanded reporting queues, audit logs, and scoped moderator roles to keep spaces healthy at scale [1].  
- Role/Policy Expansion — Finer-grained roles and Row Level Security policies to support special programs and cross-campus access rules [1][2].  
- Multi-campus Tenancy — Logical isolation and scoped discovery for institutes or departments under a single platform umbrella [1].  

## AI integration [1]
- Campus Assistant — LangChain + GPT for campus FAQs and routing to official resources with guardrails and role-aware responses to prevent hallucinations [1].  
- Generative Media — DALL·E/Stable Diffusion for club banners and event visuals with content moderation and approval workflows before publication [1].  
- Voice Announcements — ElevenLabs voices for accessible summaries of key notices and event digests, configured per notification preference [1].  
- RAG with Permissions — pgvector-backed retrieval that respects Row Level Security so only authorized documents are used and returned during search and answers [5][2].  
- Storage Governance — Use Storage object links mapped to DB rows with signed URLs and policy checks for media used in AI features to maintain authorization [4][2].  
- Inference Hosting — Optional RunPod endpoints for cost-effective GPU inference during peak events with fallback to hosted APIs for reliability [1].  
