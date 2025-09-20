# 🚀 Calculator Pro

> A modern, **voice-enabled scientific calculator** web application with full-stack architecture.  
Supports **advanced math functions**, **real-time voice commands**, **calculation history**, and **persistent storage**.

![React](https://img.shields.io/badge/Frontend-React%2018-blue?logo=react)
![TypeScript](https://img.shields.io/badge/Code-TypeScript-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Style-Tailwind%20CSS-38B2AC?logo=tailwindcss)
![Express](https://img.shields.io/badge/Backend-Express.js-black?logo=express)
![Postgres](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql)

---

## ✨ Features
- 🎙️ **Voice-enabled commands** (powered by Web Speech API)  
- 🔢 **Scientific calculator functions** (trigonometry, logarithms, etc.)  
- 📝 **History panel** with persistent storage  
- 🌓 **Light & Dark themes** with user preference memory  
- 📱 **Responsive UI** (desktop + mobile optimized)  
- 💾 **Hybrid storage system** (PostgreSQL + in-memory for dev)  

---

## 🏗️ System Architecture

<details>
<summary><strong>🌐 Frontend (React + TypeScript)</strong></summary>

- **Framework**: React 18 + Vite (fast builds + HMR)  
- **Styling**: Tailwind CSS with CSS variables for theming  
- **UI Components**: Radix UI + shadcn/ui wrappers  
- **State Management**: TanStack Query + React local state  
- **Routing**: Wouter (lightweight)  
- **Theme System**: Persistent light/dark modes  

**UI Highlights**:
- Interactive **button grid** for input/operations  
- Real-time evaluation with **mathjs**  
- Integrated **voice recognition**  
- **History panel** for past calculations & memory management  
</details>

<details>
<summary><strong>🖥️ Backend (Express + TypeScript)</strong></summary>

- **Framework**: Express.js (TypeScript-based)  
- **Architecture**: Layered (Routes, Storage, Schema)  
- **API Design**: RESTful endpoints for calculations & memory  
- **Error Handling**: Centralized middleware with structured responses  
- **Dev Tools**: Hot reloading & middleware integration  
</details>

<details>
<summary><strong>💽 Data Storage</strong></summary>

- **Database**: PostgreSQL + Drizzle ORM  
- **Migrations**: Drizzle Kit for schema versioning  
- **Fallback**: In-memory storage for dev  
- **Schema**:
  - `calculations` → expression history w/ timestamps  
  - `memory_values` → memory storage  
  - UUID primary keys + auto timestamps  
</details>

<details>
<summary><strong>🔐 Authentication & Sessions</strong></summary>

- **Session-based infrastructure** (using `connect-pg-simple`)  
- **Session persistence** via PostgreSQL  
- 🔮 **Auth-ready** (future implementation planned)  
</details>

---

## 📦 Dependencies

### 🔑 Key Libraries
- **Frontend**: React, Radix UI, shadcn/ui, TanStack Query, Wouter  
- **Math Engine**: mathjs  
- **Voice Recognition**: Web Speech API  
- **Forms & Validation**: React Hook Form + Zod  
- **Dates**: date-fns  
- **Styling Helpers**: clsx, class-variance-authority  

### 🛠️ Dev Tools
- TypeScript (end-to-end type safety)  
- ESLint + Prettier  
- PostCSS (with Tailwind integration)  
- Drizzle Kit (DB migrations)  

### ☁️ Third-Party Services
- **Neon Database** → Serverless PostgreSQL hosting  
- **Replit Plugins** → Cartographer & Dev Banner  
</details>

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/calculator-pro.git

# Install dependencies
cd calculator-pro
npm install

# Run frontend & backend
npm run dev
