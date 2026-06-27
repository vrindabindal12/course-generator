# AI Course Generator

An advanced, full-stack, enterprise-grade Next.js application that automatically curates complete, structured, and visually engaging learning paths. By leveraging the power of **Google Gemini Generative AI** and the **YouTube Data API v3**, the platform builds instantaneous, personalized curriculums containing structured reading material, code sandboxes, and highly relevant video lectures.

---

<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  </a>
  <br>
  <a href="https://deepmind.google/technologies/gemini/">
    <img src="https://img.shields.io/badge/Gemini_AI-1.5_Flash-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Google Gemini">
  </a>
  <a href="https://clerk.com/">
    <img src="https://img.shields.io/badge/Clerk_Auth-Secure-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk Auth">
  </a>
  <a href="https://neon.tech/">
    <img src="https://img.shields.io/badge/Neon_Database-PostgreSQL-00E599?style=for-the-badge&logo=neon&logoColor=black" alt="Neon PostgreSQL">
  </a>
  <a href="https://supabase.com/">
    <img src="https://img.shields.io/badge/Supabase-Storage-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase Storage">
  </a>
</p>

---

## Table of Contents

1. [Overview & Key Value Props](#overview--key-value-props)
2. [Key Features](#key-features)
3. [System Architecture](#system-architecture)
4. [System & Data Workflow](#system--data-workflow)
5. [Repository Structure](#repository-structure)
6. [Tech Stack & Architecture Rationale](#tech-stack--architecture-rationale)
7. [Database & Storage Design](#database--storage-design)
    - [1. Database Schema (Neon PostgreSQL via Drizzle ORM)](#1-database-schema-neon-postgresql-via-drizzle-orm)
    - [2. Storage Configuration (Supabase Storage)](#2-storage-configuration-supabase-storage)
8. [Getting Started & Local Setup](#getting-started--local-setup)
    - [Prerequisites](#prerequisites)
    - [Step 1: Clone Repository & Install Dependencies](#step-1-clone-repository--install-dependencies)
    - [Step 2: Configure Environment Variables](#step-2-configure-environment-variables)
    - [Step 3: Database & ORM Initialization](#step-3-database--orm-initialization)
    - [Step 4: Launch the Local Server](#step-4-launch-the-local-server)
9. [Production Deployment Guide](#production-deployment-guide)
10. [Roadmap & Future Goals](#roadmap--future-goals)
11. [Contributing Guidelines](#contributing-guidelines)
12. [License](#license)

---

## Overview & Key Value Props

In the modern digital landscape, finding a structured learning curriculum requires hours of manual sorting through fragmented documentation, videos, and articles. The **AI Course Generator** solves this problem by instantly synthesising personalized, end-to-end educational courses. 

- **Custom-Tailored Learning**: Simply input a topic, choose a level, select a length, and watch the platform formulate a curriculum tailored to your specific parameters.
- **Multimodal Learning Experience**: Courses integrate clear markdown explanations, actual coding blocks, and targeted YouTube videos synced automatically with the context of each chapter.
- **Save & Share**: Secure account dashboards let users revisit their customized paths, track completion status, or share their learning URLs globally.

---

## Key Features

* **Interactive Stepper Generation Wizard**: An easy-to-use multi-step course planner allowing users to customize target categories (e.g. Science, Programming, Health), difficulty levels (Beginner, Intermediate, Advanced), and select options to include video content.
* **Deterministic Outline Structuring**: Leverages structured JSON output constraints within Google Gemini models to generate predictable, highly nested, validation-safe curriculums.
* **Contextual Media Integration**: Intelligently queries the YouTube Data API using context-aware search strings, syncing corresponding video playlists right into the layout.
* **Seamless Media & Asset Storage**: Integrates Supabase storage bucket workflows so users can custom upload and remove graphical course cover banners directly from the browser.
* **Secure Session Guards**: Implements Next.js middleware and JWT Session validations via Clerk, safeguarding database write calls and customized student panels.
* **Modern & Accessible UX**: Styled with premium HSL-tailored dark modes, smooth hover and entrance transitions (powered by Framer Motion), and customizable dialog modules.

---

## System Architecture

The following block diagram represents the relationship between the client browser interface, the serverless database persistence layer, API connectors, and external microservices:

```mermaid
graph TD
    subgraph Browser ["Client Browser Environment"]
        UI["React 18 Client Application<br/>(Tailwind CSS / Framer Motion)"]
        GeminiSDK["Google Generative AI SDK Client"]
        DrizzleClient["Drizzle ORM & Neon Serverless HTTP Client"]
        SupabaseSDK["Supabase Storage Client SDK"]
    end

    subgraph Authentication ["Authentication Provider"]
        Clerk["Clerk Auth Service<br/>(JWT Token & Session Management)"]
    end

    subgraph Third Party APIs ["External Serverless APIs"]
        Gemini["Google Gemini API<br/>(gemini-1.5-flash)"]
        YouTube["YouTube Data API v3"]
    end

    subgraph Data & Assets ["Cloud Storage & Databases"]
        PostgreSQL["Neon Serverless PostgreSQL DB"]
        Supabase["Supabase Storage Buckets<br/>(ai-course bucket)"]
    end

    %% Interactions
    UI -- Auth Tokens & Profile Session --> Clerk
    UI -- Direct Prompting (JSON Schema) --> GeminiSDK
    GeminiSDK -- REST Request --> Gemini
    UI -- Database Queries & Mutations --> DrizzleClient
    DrizzleClient -- HTTP connection --> PostgreSQL
    UI -- Upload/Delete Banner Image --> SupabaseSDK
    SupabaseSDK -- Upload Asset Payload --> Supabase
    UI -- Fetch Video Search results --> YouTube
```

---

## System & Data Workflow

The sequential steps from a user defining a course configuration to reading the compiled lesson are mapped out below:

```mermaid
sequenceDiagram
    autonumber
    actor User as User (Client Browser UI)
    participant Gemini as Google Gemini API
    participant YouTube as YouTube Data API
    participant DB as Neon PostgreSQL (via Drizzle ORM)
    participant Supabase as Supabase Storage

    User->>Supabase: [Optional] Upload Custom Course Banner Image
    Supabase-->>User: Return Public CDN Asset URL
    User->>Gemini: Request course outline layout based on configuration
    Gemini-->>User: Return structured JSON (Chapter titles, durations, goals, summaries)
    User->>DB: Write parent course outline config (publish=false, schema JSON)
    User->>User: Redirect page to Dynamic Layout Progress panel (/create-course/[courseId])
    User->>User: Click "Generate Course Content"
    loop For Each Chapter in Course Outline
        User->>Gemini: Request deep text lesson & code templates (precode syntax blocks)
        Gemini-->>User: Return structured lesson content JSON
        alt Include Video == 'Yes'
            User->>YouTube: Query matching videos (Topic Name + Chapter Title)
            YouTube-->>User: Return top educational Video IDs
        end
        User->>DB: Write chapter payload mapping to database chapters table
    end
    User->>DB: Set CourseList publish status flag to TRUE
    User->>User: Redirect to Interactive Course Viewer UI (/create-course/[courseId]/finish)
```

---

## Repository Structure

The code directory is structured logically to separate component libraries, API endpoints, schema definitions, and third-party configuration clients.

```
ai-course-generator/
├── app/                          # Next.js App Router (Entrypoint)
│   ├── (auth)/                   # Authentication pages (Sign-in, Sign-up) managed via Clerk
│   ├── _components/              # Shared high-level layouts, navigation headers, and footer components
│   ├── _context/                 # UserInputContext for state management throughout wizard stages
│   ├── _shared/                  # Utilities, constant schemas, and formatting helpers
│   ├── course/
│   │   └── [courseId]/           # Dynamic learning portal rendering structured chapters and videos
│   ├── create-course/            # Multistep wizard orchestrator
│   │   ├── _components/          # Wizard form sheets, topic options, and loading modals
│   │   ├── [courseId]/
│   │   │   ├── finish/           # Success dashboard showing course details and public share links
│   │   │   └── page.jsx          # Chapter compiler logic interfacing with backend and APIs
│   │   └── page.jsx              # Creation entry wizard managing step transitions
│   ├── dashboard/                # Main student dashboard listing active courses and metrics
│   ├── globals.css               # Main styling manifest containing custom keyframes, scrollbars, and design variables
│   ├── layout.js                 # Global HTML shell injection and Provider wrappers
│   └── page.js                   # Public landing page showcasing application value proposition
├── components/                   # Shadcn components (Radix primitives styled with Tailwind)
│   └── ui/                       # Reusable custom inputs, dialogs, progress bars, and buttons
├── configs/                      # Service initialization clients & database configurations
│   ├── aiModel.js                # Google Gemini generative-ai engine schema client and settings
│   ├── db.js                     # Neon serverless database client mapping
│   ├── schema.js                 # PostgreSQL relational table definitions (Drizzle ORM declarative schemas)
│   └── youtubeService.js         # YouTube data retrieval service layer
├── hooks/                        # Custom React hook logic (toast banners, triggers)
├── lib/                          # Third-party instance initializations
│   └── supabaseClient.js         # Supabase client mapping for storage bucket uploads
├── public/                       # Static public assets (placeholder banners, logos, icons)
├── drizzle.config.js             # Drizzle Kit CLI migrations and database parameters setup
├── next.config.mjs               # Next.js configurations allowing Supabase domains and assets caching
├── tailwind.config.js            # Tailwind custom extensions, theme rules, and responsive presets
└── package.json                  # Main node dependency manifest and build targets
```

---

## Tech Stack & Architecture Rationale

The architecture was chosen to emphasize performance, serverless scaling, clean relational querying, and rapid development speed.

| Technology | Role | Rationale & Design Choice |
| :--- | :--- | :--- |
| **Next.js 14 (App Router)** | Framework | Employs React Server Components (RSC) to reduce client javascript bundles, improving initial load speeds and SEO. Utilizes Next.js App Router API directory routes for server operations. |
| **Google Gemini 1.5 Flash** | AI Engine | Excellent response speed, extremely large context window, and native JSON output constraints that make structured parsing predictable and error-free. |
| **Drizzle ORM** | Data Mapping | A type-safe, developer-friendly SQL query builder. It operates with zero overhead compared to traditional heavy ORMs, translating commands directly to pure SQL. |
| **Neon PostgreSQL** | Database Server | High-performance, serverless database engine featuring automatic connection pooling, scale-to-zero capability to minimize infrastructure costs, and instant branch cloning. |
| **Clerk Auth** | Authentication | Pre-built web login components and server-side middleware checking. Offloads user management, security encryption, and session JWT handling cleanly. |
| **Supabase Storage** | CDN & Media Storage | Handles user-facing graphic and custom course cover uploads seamlessly via a developer-focused Client SDK, supporting rapid image deletions and generation. |
| **Tailwind CSS & Framer Motion** | UI & Styling | Combines high-velocity utility styling with smooth micro-interactions. Framer Motion builds dynamic layouts that keep users engaged during compilation sequences. |

---

## Database & Storage Design

### 1. Database Schema (Neon PostgreSQL via Drizzle ORM)

Located in [configs/schema.js](file:///c:/Users/vrind/OneDrive/Desktop/ai-course-generator/configs/schema.js), the tables use a relational layout optimized for quick reads and structured updates.

#### CourseList Table (Parent Outlines)
Stores primary configurations, cover links, settings, and full outlines generated by the AI:
```javascript
export const CourseList = pgTable("courseList", {
  id: serial("id").primaryKey(),                 // Auto-increment primary index
  courseId: varchar("courseId").notNull(),       // Unique UUID representing the course instance
  name: varchar("name").notNull(),               // Title of the user course topic
  category: varchar("category").notNull(),       // Subject Category (Tech, Business, etc.)
  level: varchar("level").notNull(),             // User target difficulty (Beginner, Intermediate, Advanced)
  includeVideo: varchar("includeVideo").notNull().default("Yes"), // Include youtube videos toggle
  courseOutput: json("courseOutput").notNull(),   // Full curriculum schema generated by Gemini
  createdBy: varchar("createdBy").notNull(),     // Owner user email parsed from Clerk authentication
  userName: varchar("username"),                 // Owner displayName
  userProfileImage: varchar("userProfileImage"), // Owner avatar CDN source
  courseBanner: varchar("courseBanner").default("/placeholder.png"), // Selected or custom uploaded banner url
  publish: boolean("publish").default(false),    // Setup status (marked TRUE when all chapters compile)
})
```

#### Chapters Table (Lesson Content)
Holds deep chapter text materials, step descriptions, and synchronized video lists:
```javascript
export const Chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),                 // Auto-increment primary index
  courseId: varchar("courseId").notNull(),       // Links back to the parent CourseList.courseId
  chapterId: varchar("chapterId").notNull(),     // Ordinal string representing chapter index (e.g. "0", "1")
  content: json("content").notNull(),            // Deep text explanations, takeaways, and code syntax models
  videoId: json("videoId").notNull().$default("[]"), // Array of top matching YouTube Video IDs
});
```

---

### 2. Storage Configuration (Supabase Storage)

The application features custom banner uploads. Images uploaded by users are saved in the `ai-course` bucket inside Supabase storage. 
* Managed in [lib/supabaseClient.js](file:///c:/Users/vrind/OneDrive/Desktop/ai-course-generator/lib/supabaseClient.js).
* Configurations in [next.config.mjs](file:///c:/Users/vrind/OneDrive/Desktop/ai-course-generator/next.config.mjs) allow Next.js `<Image />` tags to render dynamic assets from Supabase CDN hosts.

---

## Getting Started & Local Setup

Follow these structured instructions to configure, initialize, and run a local instance of the AI Course Generator.

### Prerequisites
* [Node.js](https://nodejs.org/) (Version 18.0.0 or higher is required)
* A [Neon PostgreSQL](https://neon.tech/) database instance
* A [Clerk](https://clerk.com/) account for managing project credentials
* A [Google Gemini API Key](https://ai.google.dev/)
* A [YouTube Data API v3 Key](https://developers.google.com/youtube/v3/getting-started) via Google Cloud Console
* A [Supabase](https://supabase.com/) project bucket named `ai-course`

---

### Step 1: Clone Repository & Install Dependencies
First, open your terminal and download the repository files:
```bash
git clone https://github.com/your-username/ai-course-generator.git
cd ai-course-generator
npm install
```

---

### Step 2: Configure Environment Variables
Create a file named `.env` in the root workspace directory:
```env
# Clerk Authentication Configuration Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

# Google Gemini AI Endpoint Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key

# YouTube API Endpoint (Data API v3)
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key

# PostgreSQL Connection String (Neon Console)
NEXT_PUBLIC_DB_CONNECTION_STRING=postgresql://username:password@hostname/database?sslmode=require

# Supabase Storage Integration Configurations
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key

# Hosting Context Parameters
NEXT_PUBLIC_HOST_NAME=http://localhost:3000
```

---

### Step 3: Database & ORM Initialization
Map out and synchronize database tables directly to your Neon serverless instances:

```bash
# Push schemas to Neon PostgreSQL
npm run db:push
```

To review, edit, or modify database entries visually in a web UI:
```bash
# Open Drizzle ORM visual Studio
npm run db:studio
```

---

### Step 4: Launch the Local Server
Boot up the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser. You can now build, test, and render customized learning paths locally.

---

## Production Deployment Guide

This app is optimized for serverless hosting providers like **Vercel** or **Netlify**.

1. **Deploy Repository**: Link your GitHub repository to a new project in your Vercel Dashboard.
2. **Environment Variables**: Add all environment variables listed in `.env` inside Vercel's Project Settings panel.
3. **Database Migration**: Ensure `npm run db:push` has run to prepare the production database.
4. **Deploy & Build**: Vercel will trigger the production build pipeline (`npm run build`) automatically.
5. **Update Clerk URLs**: Ensure you configure your production domain values in the Clerk Dashboard redirects list.

---

## Roadmap & Future Goals

- [ ] **Interactive Quizzes**: Generate contextual multiple-choice assessments at the end of each chapter using Google Gemini.
- [ ] **Export to PDF & Markdown**: Download full curricula and study notes locally for offline reading.
- [ ] **Interactive Code Sandboxes**: Embed running Javascript/HTML testbeds within lesson windows for immediate hands-on practice.
- [ ] **Dynamic Progress Tracking**: Track reader scroll checkpoints and save chapter completion milestones.

---

## Contributing Guidelines

Contributions are welcome! If you want to contribute, please follow these guidelines:

1. **Fork the Repository** on GitHub.
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`.
3. **Commit Changes**: Use clear, descriptive commit messages.
4. **Push Changes**: `git push origin feature/amazing-feature`.
5. **Open a Pull Request** to the `main` branch, outlining your improvements.

---

## License

Distributed under the MIT License. See `LICENSE` file for more details.

---

<p align="center">Made by the AI Course Generator Team</p>
