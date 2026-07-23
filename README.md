<p align="center">
  <img src="public/image.png" alt="Sutra AI — Agent Architecture" width="700" />
</p>

<h1 align="center">🧵 Sutra AI</h1>

<p align="center">
  <em>A thread connecting ideas — AI-powered research assistant built with LangGraph agentic workflows</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/LangGraph-Agentic-purple" alt="LangGraph" />
  <img src="https://img.shields.io/badge/OpenAI-GPT--4.1--mini-green?logo=openai" alt="OpenAI" />
  <img src="https://img.shields.io/badge/Tavily-Research-orange" alt="Tavily" />
  <img src="https://img.shields.io/badge/Prisma-ORM-teal?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Clerk-Auth-blueviolet?logo=clerk" alt="Clerk" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
</p>

---

## 📖 Overview

**Sutra** (Sanskrit for *"thread"*) is a full-stack AI research assistant that goes beyond simple chatbots. It uses a **LangGraph agentic architecture** where an AI agent can autonomously decide to invoke research tools — web search, deep research, website extraction, sitemap mapping, and website crawling — to provide grounded, real-world-accurate answers.

The application features **real-time token streaming**, persistent conversation history, and a beautifully designed dark-themed UI inspired by rope and thread aesthetics.

---

## ✨ Features

- **🤖 Agentic AI Architecture** — Built with LangGraph's `StateGraph`, the agent autonomously decides when to use tools vs. respond directly via conditional edges
- **🔍 Web Research Tools** — Powered by Tavily API with 5 specialized tools:
  - **Web Search** — Search the web for recent information
  - **Deep Research** — In-depth research on any topic
  - **Website Extraction** — Extract content from a specific URL
  - **Sitemap Mapping** — Generate a sitemap of any website
  - **Website Crawling** — Crawl websites with custom instructions
- **⚡ Real-time Streaming** — Token-by-token response streaming via NDJSON over `ReadableStream`
- **💬 Conversation Persistence** — Full conversation history stored in PostgreSQL via Prisma ORM
- **🔐 Authentication** — User authentication and session management with Clerk
- **📝 Rich Markdown Rendering** — AI responses rendered with GitHub Flavored Markdown, including code blocks, tables, and more
- **🎨 Premium Dark UI** — Handcrafted design with rope/thread aesthetics, glassmorphism, and smooth animations
- **📱 Sidebar Navigation** — Conversation history sidebar with search, delete, and quick navigation

---

## 🏗️ Architecture

The diagram below (also available as `public/image.png`) illustrates the agentic workflow:

```
User Prompt
     │
     ▼
 ┌─────────┐
 │  START   │  (Node)
 └────┬─────┘
      │ Edge
      ▼
 ┌─────────┐       ┌─────────────────────────┐
 │  AGENT  │──────▶│    STATE (messages)     │
 └────┬─────┘       │  Everyone can access    │
      │              └─────────────────────────┘
      │ Conditional Edges
      ├────────────────────────────┐
      ▼                            ▼
 ┌─────────┐                 ┌─────────┐
 │  TOOLS  │                 │   END   │
 └────┬─────┘                 └─────────┘
      │
      │ Edge (loops back)
      ▼
   ┌──────────────────────────────────┐
   │  • Web Search                    │
   │  • Website Extraction            │
   │  • Deep Research                 │
   │  • Website Crawling              │
   │  • Sitemap Mapping               │
   └──────────────────────────────────┘
```

**How it works:**

1. **Start Node** → receives the user's prompt
2. **Agent Node** → LLM (GPT-4.1-mini) processes the message with tool bindings
3. **Conditional Edge** → If the LLM response contains `tool_calls`, route to **Tools Node**; otherwise route to **END**
4. **Tools Node** → Executes the requested Tavily tool(s) and returns results
5. **Loop** → Tools output feeds back into the Agent for further reasoning
6. **END Node** → Final response is streamed back to the user

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **UI** | React 19, Tailwind CSS 4, Shadcn UI |
| **Fonts** | Outfit (sans), JetBrains Mono (mono) |
| **AI Orchestration** | LangGraph (`@langchain/langgraph`) |
| **LLM** | OpenAI GPT-4.1-mini via `@langchain/openai` |
| **Research Tools** | Tavily API (`@tavily/core`) |
| **Authentication** | Clerk (`@clerk/nextjs`) |
| **Database** | PostgreSQL |
| **ORM** | Prisma 7 with `@prisma/adapter-pg` |
| **Markdown** | `react-markdown` + `remark-gfm` |
| **Package Manager** | pnpm |

---

## 📁 Project Structure

```
Sutra/
├── app/
│   ├── (auth)/
│   │   └── sign-in/             # Clerk sign-in page
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts         # POST /api/chat — streaming AI endpoint
│   │   └── conversations/
│   │       └── [conversationId]/
│   │           └── route.ts     # DELETE conversation endpoint
│   ├── chat/
│   │   ├── layout.tsx           # Auth-protected chat layout
│   │   ├── page.tsx             # Redirects to /chat/[userId]
│   │   └── [userId]/
│   │       ├── page.tsx         # Server component — loads conversations
│   │       └── chat-client.tsx  # Client component — chat UI + streaming
│   ├── globals.css              # Design system & custom theme
│   ├── layout.tsx               # Root layout (Clerk, fonts, metadata)
│   └── page.tsx                 # Landing page
│
├── components/
│   ├── chat/
│   │   ├── chat-input.tsx       # Message input with send button
│   │   ├── chat-layout.tsx      # Main chat shell (header + messages + input)
│   │   ├── markdown-renderer.tsx# GFM markdown renderer
│   │   ├── message-bubble.tsx   # Individual message bubble
│   │   ├── message-list.tsx     # Scrollable message list
│   │   ├── sidebar.tsx          # Conversation history sidebar
│   │   ├── streaming-indicator.tsx  # Typing indicator animation
│   │   └── welcome-screen.tsx   # New chat welcome view
│   └── ui/                      # Shadcn UI components
│
├── features/
│   ├── ai/
│   │   ├── client/
│   │   │   └── index.ts         # OpenAI LLM + ToolNode initialization
│   │   ├── tools/
│   │   │   └── travily/
│   │   │       ├── index.ts     # Tavily client setup
│   │   │       └── tools.ts     # 5 Tavily tool definitions
│   │   ├── call-model.ts        # Agent node — invokes LLM with tools
│   │   ├── graph.ts             # LangGraph StateGraph definition
│   │   └── system-prompt.ts     # System prompt (markdown formatting rules)
│   ├── auth/
│   │   └── action.ts            # Auth helpers (get user, onboard to DB)
│   ├── conversation/
│   │   └── action.ts            # Conversation queries & ownership checks
│   └── message/
│       └── action.ts            # Message CRUD & LangGraph format conversion
│
├── lib/
│   ├── db.ts                    # Prisma client singleton
│   ├── user-sync.ts             # Clerk → DB user sync utility
│   ├── utils.ts                 # cn() utility (clsx + tailwind-merge)
│   └── generated/prisma/        # Prisma generated client (gitignored)
│
├── prisma/
│   ├── schema.prisma            # Database schema (User, Conversation, Message)
│   └── migrations/              # Prisma migration history
│
├── public/
│   └── image.png                # Architecture diagram
│
├── proxy.ts                     # Clerk middleware configuration
├── package.json
├── tsconfig.json
├── next.config.ts
├── prisma.config.ts
└── pnpm-workspace.yaml
```

---

## 📊 Database Schema

```prisma
model User {
    id            String         @id @default(cuid())
    clerkId       String         @unique
    email         String         @unique
    name          String?
    imageUrl      String?
    conversations Conversation[]
    createdAt     DateTime       @default(now())
    updatedAt     DateTime       @updatedAt
}

model Conversation {
    id        String    @id @default(cuid())
    title     String
    userId    String
    user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
    messages  Message[]
    createdAt DateTime  @default(now())
    updatedAt DateTime  @updatedAt
    @@index([userId])
}

model Message {
    id             String       @id @default(cuid())
    conversationId String
    conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
    role           Role         // USER | ASSISTANT
    content        String
    createdAt      DateTime     @default(now())
    updatedAt      DateTime     @updatedAt
    @@index([conversationId])
}
```

**Relationships:**
- One **User** → Many **Conversations**
- One **Conversation** → Many **Messages**
- Cascade delete ensures cleanup when users or conversations are removed

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended package manager)
- **PostgreSQL** database (local or hosted)
- API keys for: **OpenAI**, **Tavily**, **Clerk**

### 1. Clone the Repository

```bash
git clone https://github.com/gaurav0973/Sutra.git
cd Sutra
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/sutra"

# OpenAI
OPENAI_API_KEY="sk-..."

# Tavily (Research Tools)
TAVILY_API_KEY="tvly-..."

# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/chat"
```

### 4. Set Up the Database

```bash
# Generate the Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate
```

### 5. Start the Development Server

```bash
pnpm dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `pnpm dev` | Start Next.js development server |
| `build` | `pnpm build` | Create production build |
| `start` | `pnpm start` | Start production server |
| `lint` | `pnpm lint` | Run ESLint |
| `db:migrate` | `pnpm db:migrate` | Run Prisma migrations |
| `db:generate` | `pnpm db:generate` | Generate Prisma client |

---

## 🔄 How the Streaming Works

1. **Client** sends a `POST /api/chat` with `{ message, conversationId? }`
2. **Server** saves the user message to the database
3. **LangGraph** processes all conversation messages through the agentic workflow
4. **Streaming** — The server creates a `ReadableStream` and uses `app.streamEvents()` to forward tokens:
   - `{ conversationId }` — sent once for new conversations
   - `{ token: "..." }` — individual streamed tokens
   - `{ done: true }` — signals end of stream
5. **Client** reads the NDJSON stream via `ReadableStream` reader and updates the UI in real-time

---

## 🎨 Design Philosophy

The name *Sutra* means "thread" in Sanskrit. The UI reflects this with:

- **Rope and thread visual motifs** — decorative rope lines, wood plank dividers
- **Compass rose** — brand symbol representing exploration and navigation
- **Warm, earthy color palette** — caramel, rope-tan, and deep dark backgrounds
- **Glassmorphism** — translucent headers with `backdrop-blur`
- **Micro-animations** — pulsing dots, orbit animations, hover transitions

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

<p align="center">
  <strong>Sutra AI</strong> — <em>Every thought connected, every insight preserved.</em> 🧵
</p>
