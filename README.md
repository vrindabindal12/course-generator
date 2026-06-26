# AI Course Generator

AI Course Generator is an advanced, full-stack Next.js web application designed to automatically curate complete, structured, and visually engaging courses based on user-defined topics and goals. By pairing Google Gemini Generative AI with the YouTube API, the platform builds instant, personalized curriculums complete with educational videos and structured chapter lessons.

---

## Key Features

* **AI-Guided Generation Wizard**: Dynamic multi-step creation engine with custom prompts configured for topic category, difficulty level, and chapter counts.
* **Intelligent Media Syncing**: Automated search queries sync contextually relevant YouTube educational videos with corresponding AI-generated outlines to provide a multi-modal learning experience.
* **Adaptive Course Views**: Integrated markdown parser rendering structured text lessons complete with embedded media and formatted code snippets.
* **Production-Ready Relational Design**: Custom-designed relational schemas mapped using Drizzle ORM and backed by Neon serverless connection pooling for robust query performance.

---

## System Architecture

This diagram illustrates how the frontend client, next.js server environment, relational database, authentication provider, and AI/video services interact:

```mermaid
graph TD
    subgraph Client Space
        Client["Client UI (React 18 / Tailwind / Framer Motion)"]
    end

    subgraph Authentication
        Clerk["Clerk Auth Service (JWT Session Management)"]
    end

    subgraph Backend Services
        NextServer["Next.js Server API & Route Handlers"]
    end

    subgraph AI & Media Layer
        Gemini["Google Gemini AI Engine (gemini-1.5-flash)"]
        YouTube["YouTube Data API v3"]
    end

    subgraph Data Persistence
        Drizzle["Drizzle ORM Engine"]
        PostgreSQL["Neon Serverless PostgreSQL DB"]
    end

    %% Interactions
    Client -- 1. Secures Sessions --> Clerk
    Client -- 2. Course Details / Requests --> NextServer
    NextServer -- 3. Schema Query & Mutations --> Drizzle
    Drizzle -- 4. Connects (TCP/HTTP) --> PostgreSQL
    NextServer -- 5. Structured JSON Output Prompting --> Gemini
    NextServer -- 6. Fetch Contextual Video Material --> YouTube
```

---

## System & Data Workflow

The sequence below outlines the end-to-end flow of course generation:

```mermaid
sequenceDiagram
    autonumber
    actor User as User (Client UI)
    participant Next as Next.js Server
    participant Gemini as Google Gemini AI (1.5-flash)
    participant YouTube as YouTube API Client
    participant DB as Neon PostgreSQL (via Drizzle)

    User->>Next: 1. Submit course preferences (Topic, Category, Level, Chapters, Video Toggle)
    Next->>Gemini: 2. Send prompt for course outline schema structure
    Gemini-->>Next: 3. Return course outline JSON (Chapters, Summaries, Durations)
    Next->>DB: 4. Insert outline record into CourseList table (UUID, creation meta)
    Next-->>User: 5. Redirect user to Course Layout screen and show progress
    User->>Next: 6. Trigger "Generate Course Content" expansion
    loop For each Chapter in the Course
        Next->>Gemini: 7. Request deep text lesson & code templates (precode blocks)
        Gemini-->>Next: 8. Return rich structured text lesson JSON
        alt Include Video is "Yes"
            Next->>YouTube: 9. Search relevant educational videos (Query: Course Name + Chapter Name)
            YouTube-->>Next: 10. Return search lists with top videoIds
        end
        Next->>DB: 11. Save chapter data, content, and videoId array mapping in Chapters table
    end
    Next->>DB: 12. Update CourseList.publish status to 'true'
    Next-->>User: 13. Completion callback & redirect to interactive Course Viewer UI
```

---

## Repository Structure

Below is an overview of the key directories and architectural entry-points:

```
ai-course-generator/
├── app/                          # Next.js App Router pages and components
│   ├── (auth)/                   # Clerk Auth routes (sign-in, sign-up pages)
│   ├── _components/              # Shared dashboard layouts & header blocks
│   ├── _context/                 # UserInputContext for state sharing across stepper wizard
│   ├── _shared/                  # Common utilities & formatting helper scripts
│   ├── course/
│   │   └── [courseId]/           # Interactive course reader layouts & student viewing portal
│   ├── create-course/
│   │   ├── _components/          # Wizard options, topic selector & loading dialogs
│   │   ├── [courseId]/
│   │   │   ├── finish/           # Success screen displaying URL paths and share options
│   │   │   └── page.jsx          # Chapter content compiler & YouTube sync orchestrator
│   │   └── page.jsx              # Main stepper creation page
│   ├── dashboard/                # Main dashboard listing active courses and explore metrics
│   ├── globals.css               # Design tokens, custom animations and global theme setup
│   ├── layout.js                 # App wrapper importing Providers (Clerk, Context, UI Toast)
│   └── page.js                   # High-conversion Landing Page highlighting value prop
├── components/                   # Radix UI components (Shadcn primitives)
├── configs/                      # Service connectors and database config
│   ├── aiModel.js                # Gemini Generative AI configuration & instruction context
│   ├── db.js                     # Neon Serverless PostgreSQL instance connection via Drizzle ORM
│   ├── schema.js                 # Database schemas & relationships (Drizzle declarative setup)
│   └── youtubeService.js         # YouTube Data Search client module
├── hooks/                        # Custom React hook utilities (e.g. use-toast.js)
├── drizzle.config.js             # Drizzle kit setup file containing migrations configuration
└── package.json                  # Dependencies manifest file
```

---

## Detailed Tech Stack & Architecture Rationale

A curated stack designed for high performance, ease of use, type safety, and maximum development velocity.

| Technology | Role | Technical Rationale & Design Decisions |
| :--- | :--- | :--- |
| **Next.js 14 (App Router)** | Framework | Utilizing React Server Components (RSC) to minimize client-side bundle sizes and boost SEO metrics. Dynamic route caching and layout states optimize performance. |
| **Google Gemini 1.5 Flash** | AI Engine | Leverage `gemini-1.5-flash`'s long context window and rapid inference speed. Prompts are fine-tuned with structured response configuration constraints, ensuring robust JSON parsing and predictable data integration. |
| **Drizzle ORM** | Database Mapper | A lightweight, type-safe TypeScript/JS query builder. Unlike heavy traditional ORMs, Drizzle translates directly to clean SQL queries, preserving query speed while supporting declarative database migrations. |
| **Neon PostgreSQL (Serverless)** | Database Engine | Offers serverless scaling with connection-pooling, ensuring database response times remain stable even under high-traffic spikes, with automatic scaling to zero to minimize maintenance costs. |
| **Clerk Authentication** | Security & User Management | Secure JWT validation middleware safeguarding server-side data fetches. Pre-built auth widgets reduce time-to-market while keeping user records protected. |
| **Tailwind CSS & Framer Motion** | Styling & Animation | Custom-themed utility styles alongside fluid micro-interactions. Framer Motion builds dynamic user interest during loading screens and wizard state transitions. |
| **Radix UI & Tabler Icons** | UI Primitives | Accessible, customizable headless components (dialogs, drop-downs, progress bars) styled dynamically via Tailwind CSS. |

---

## Database Schema Design

Declaratively defined inside `configs/schema.js` using Drizzle:

### 1. `CourseList` Table (Main Course Record)
Stores primary course layouts and state flags:
- `id` (serial primaryKey)
- `courseId` (varchar, unique generated UUID)
- `name` (varchar, the topic of the course)
- `category` (varchar, e.g., Tech, Business, Arts)
- `level` (varchar, Beginner, Intermediate, Advanced)
- `includeVideo` (varchar, defaults to "Yes")
- `courseOutput` (json, raw structured outline generated by Gemini AI containing outline details)
- `createdBy` (varchar, matching the authenticated user's email address)
- `userName` (varchar, displayName)
- `userProfileImage` (varchar, profile photo)
- `courseBanner` (varchar, custom default card banner path)
- `publish` (boolean, tracking if chapter content generation succeeded)

### 2. `Chapters` Table (Expanded Lesson Content)
Holds deep educational materials for individual course items:
- `id` (serial primaryKey)
- `courseId` (varchar, linking back to the matching parent `CourseList.courseId`)
- `chapterId` (varchar, order sequence indicator of the chapter)
- `content` (json, structured array containing lesson titles, detailed reading text, and code syntax snippets in `<precode>` tags)
- `videoId` (json, list of matched YouTube video IDs synced during compilation)

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/yourusername/ai-course-generator.git
cd ai-course-generator
npm install
```

### 2. Configure Environment Variables
Create a `.env` file at the root level of your directory and insert your keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key

# Neon PostgreSQL connection string
NEXT_PUBLIC_DB_CONNECTION_STRING=postgres://username:password@hostname/database
```

### 3. Push Database Schema
Instantly push the Drizzle schema details to Neon PostgreSQL:
```bash
npm run db:push
```
*Note: To run Drizzle's visual database manager workspace, run `npm run db:studio`.*

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the active application.
