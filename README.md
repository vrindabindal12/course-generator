# AI Course Generator

AI Course Generator is an advanced, full-stack Next.js web application designed to automatically curate complete, structured, and visually engaging courses based on user-defined topics and goals. By pairing Google Gemini Generative AI with the YouTube API, the platform builds instant, personalized curriculums complete with educational videos and structured chapter lessons.

---

## ✨ Core Functions & Features

### 1. 🧠 AI-Powered Course Creation Wizard
* **Category Selection**: Users choose from a variety of categories (e.g., Tech, Health, Business, Creative Arts) to guide the generator.
* **Personalized Prompts**: Custom input for course topics and descriptions allows the AI to tailor content to specific learning goals.
* **Duration & Difficulty Tuning**: Customize course depth by specifying difficulty levels (Beginner, Intermediate, Advanced) and exact chapter counts.
* **Generative Outline Engine**: Leverages Google Gemini AI to dynamically draft a complete course curriculum, including chapter summaries, key concepts, and structured text lessons.

### 2. 📺 Automated YouTube Video Syncing
* **Relevant Media Placement**: The application performs automated YouTube API lookups for each generated chapter.
* **Integrated Video Player**: Embeds contextually accurate educational videos directly alongside text lessons, creating an immersive, multi-modal learning experience.

### 3. 👥 User Management & Dashboard
* **Secure Authentication**: Integrated with Clerk Auth for secure sign-ups, sign-ins, and user profile management.
* **Interactive Dashboard**: Track and manage all generated courses in one place, complete with course banner templates.
* **Course Shareability**: Toggle courses between public and private settings to share custom learning paths with others.

### 4. 🗄️ Robust Data Persistence
* **PostgreSQL Database**: Powered by Supabase and Drizzle ORM for fast, type-safe database queries.
* **Schema Architectures**: Custom relational schemas for tracking user courses (`CourseList`) and deep lesson details (`Chapters`).

---

## 💡 Key Benefits
* **Zero Manual Planning**: Instantly structures any complex topic into sequential, digestible lessons, saving hours of curriculum planning.
* **Multi-Modal Learning**: Combines rich AI-generated written content with curated visual video lessons.
* **Highly Tailored Content**: Adapts content complexity and length dynamically to match the user's current skill level and target time commitments.
* **Scalable Architecture**: Built on Next.js 14, Clerk, Supabase, and Drizzle, making it an excellent blueprint for SaaS production projects.

---

## 🛠️ Tech Stack
* **Framework**: Next.js 14 (App Router)
* **Styling**: Tailwind CSS
* **Database & ORM**: Supabase, Drizzle ORM, Neon PostgreSQL
* **AI Provider**: `@google/generative-ai` (Gemini API)
* **Auth**: Clerk
* **Animations**: Framer Motion
* **Icons**: Lucide React, React Icons

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file at the root of the project with the following variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

GEMINI_API_KEY=your_gemini_api_key
YOUTUBE_API_KEY=your_youtube_api_key

DATABASE_URL=your_database_url
```

### 3. Push Database Schema
```bash
npm run db:push
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the active application.
