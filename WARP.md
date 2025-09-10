# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

SCUD is a universal package manager web application built with Next.js 15, featuring a dark theme with lime (#bfff00) accents. The app provides authentication via Supabase with multiple OAuth providers and serves as a dashboard for managing cross-platform package installations.

## Common Development Commands

### Package Management
- **Install dependencies**: `pnpm install`
- **Start development server**: `pnpm dev` (runs on http://localhost:3000)
- **Build for production**: `pnpm build`
- **Start production server**: `pnpm start`
- **Lint code**: `pnpm lint`

### Development Environment
- **Node.js**: Version 22+ recommended (React 19 compatible)
- **Package manager**: Uses pnpm (evidenced by pnpm-lock.yaml)
- **TypeScript**: Configured with strict mode and Next.js plugin

## Architecture Overview

### Project Structure
```
app/                    # Next.js 15 App Router structure
├── layout.tsx         # Root layout with fonts and theming
├── page.tsx           # Marketing landing page
├── dashboard/         # Protected dashboard area
├── login/             # Authentication pages
├── admin/             # Admin-only pages
└── api/               # API routes for auth

components/            # UI components
├── ui/               # shadcn/ui components
└── theme-provider.tsx # Theme context

lib/                  # Utility libraries
├── auth/             # Authentication utilities
├── supabase/         # Supabase client configuration
└── utils.ts          # General utilities (cn function)
```

### Key Technologies
- **Next.js 15**: App Router with server components and server actions
- **React 19**: Latest React version with concurrent features
- **Supabase**: Backend-as-a-Service for authentication and data
- **Radix UI**: Headless UI primitives via shadcn/ui
- **Tailwind CSS v4**: Utility-first styling with custom theme
- **TypeScript**: Full type safety with strict configuration

### Authentication System
- **Multiple providers**: GitHub OAuth, Google OAuth, and email/password
- **JWT + Sessions**: Dual authentication approach
- **Middleware protection**: Route-level access control in `middleware.ts`
- **Server-side auth**: Uses Next.js cookies and server components
- **Auth structure**: 
  - `lib/auth.ts`: Server-side auth utilities
  - `lib/auth/actions.ts`: Server actions for sign in/out
  - `lib/auth/client.ts`: Client-side utilities
  - `lib/auth/types.ts`: TypeScript definitions

### Design System
- **Theme**: Pure black background (#000000) with lime accent (#bfff00)
- **Fonts**: Inter for body text, Press Start 2P for branding
- **Components**: Based on shadcn/ui with custom styling
- **Animations**: Subtle transitions with reduced motion support
- **Responsive**: Mobile-first design patterns

### Routing & Pages
- **Public routes**: `/` (landing), `/login`, `/auth/error`
- **Protected routes**: `/dashboard`, `/account`, `/admin/*`
- **API routes**: `/api/auth` (auth callback), `/api/logout`
- **Middleware**: Handles redirects based on auth state

## Important Implementation Details

### Next.js 15 Considerations
- Uses async cookies() function for server components
- Error handling with TypeScript build errors ignored (development mode)
- Images unoptimized for deployment flexibility
- ESLint errors ignored during builds

### Authentication Flow
1. User selects OAuth provider or email login
2. Server action handles provider-specific authentication
3. Supabase manages OAuth flow and returns session
4. Middleware checks auth token and redirects accordingly
5. Protected pages use `requireAuth()` for server-side protection

### Styling Approach
- Tailwind v4 with CSS variables for theming
- Custom CSS properties for brand colors and fonts  
- OKLCH color space for better color consistency
- Responsive design with mobile-first breakpoints

### Environment Configuration
- Supabase credentials required in `.env`
- CSRF protection with edge-compatible package
- Server-only imports for auth utilities

## Key Files to Understand

- `middleware.ts`: Route protection and auth redirects
- `app/layout.tsx`: Global styling and font configuration
- `lib/auth/`: Complete authentication system
- `lib/supabase/server.ts`: Supabase server client setup
- `app/globals.css`: Custom theme and design tokens
- `components/ui/`: Reusable UI component library

## Common Patterns

### Server Components
Most pages are server components that use `await requireAuth()` for protection and `getUserFromCookie()` for user data.

### Server Actions
Authentication uses Next.js server actions (functions marked with `"use server"`) for form handling.

### Type Safety
User data follows the `VerifiedUser` type with optional GitHub/Google properties and role-based permissions.

### Error Handling
Auth errors redirect to `/auth/error` page with appropriate messaging.
