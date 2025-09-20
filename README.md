Calculator Pro
Overview
Calculator Pro is a modern, voice-enabled scientific calculator web application built with a full-stack architecture. The application provides advanced mathematical computing capabilities including trigonometry, logarithms, and expression history, with real-time voice command support and persistent data storage.

User Preferences
Preferred communication style: Simple, everyday language.

System Architecture
Frontend Architecture
The frontend is built using React 18 with TypeScript and follows a component-based architecture:

Framework: React with Vite as the build tool for fast development and optimized production builds
Styling: Tailwind CSS with a comprehensive design system using CSS variables for theming
UI Components: Radix UI primitives wrapped in custom shadcn/ui components for consistent design
State Management: TanStack Query (React Query) for server state management with local React state for UI interactions
Routing: Wouter for lightweight client-side routing
Theme System: Custom theme provider supporting light/dark modes with persistent user preferences
The calculator interface includes:

Interactive button grid for number input and operations
Real-time expression evaluation with mathjs
Voice recognition integration using Web Speech API
History panel for calculation and memory management
Responsive design optimized for both desktop and mobile
Backend Architecture
The backend follows a REST API pattern using Express.js:

Framework: Express.js with TypeScript for type-safe server development
Architecture Pattern: Layered architecture with separation of concerns:
Routes layer for HTTP endpoint handling
Storage abstraction layer for data persistence
Shared schema definitions for type consistency
API Design: RESTful endpoints for calculations and memory operations with proper HTTP status codes
Error Handling: Centralized error handling middleware with structured error responses
Development Tools: Hot reloading and development middleware integration
Data Storage Solutions
The application uses a hybrid storage approach:

Production Database: PostgreSQL with Drizzle ORM for type-safe database operations
Schema Management: Drizzle migrations for version-controlled database schema changes
Development Fallback: In-memory storage implementation for development environments
Storage Interface: Abstract storage interface allowing seamless switching between storage backends
Database schema includes:

Calculations table for expression history with timestamps
Memory values table for calculator memory operations
UUID primary keys with automatic timestamp generation
Authentication and Authorization
Currently implements session-based infrastructure:

Session storage configuration with connect-pg-simple for PostgreSQL session persistence
Express session middleware integration prepared for future authentication features
No authentication currently required, but infrastructure supports future implementation
External Dependencies
Third-Party Services
Neon Database: Serverless PostgreSQL database hosting (@neondatabase/serverless)
Replit Platform Integration: Development environment plugins for cartographer and dev banner
Key Libraries and Frameworks
React Ecosystem: React DOM, React Query for data fetching and caching
UI Framework: Comprehensive Radix UI component library for accessibility
Mathematical Operations: mathjs for expression evaluation and mathematical functions
Voice Recognition: Native Web Speech API integration
Form Handling: React Hook Form with Zod validation for type-safe form management
Date Utilities: date-fns for timestamp formatting and manipulation
Styling Tools: class-variance-authority and clsx for conditional styling
Build Tools: Vite with esbuild for fast bundling and development
Development Dependencies
TypeScript: Full type safety across frontend and backend
ESLint/Prettier: Code quality and formatting (implied by typical setup)
PostCSS: CSS processing with Tailwind CSS integration
Drizzle Kit: Database schema management and migration tools
