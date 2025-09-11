# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-tenant SaaS HRIS (Human Resource Information System) platform with separate frontend and backend applications. The system supports multiple tenants with role-based access control and includes features for employee management, payroll, time tracking, and applicant tracking.

## Architecture

### Backend (Node.js/Express)
- **Main entry**: `backend/app.js` and `backend/listen.js`
- **Database**: PostgreSQL with connection pooling via `pg`
- **Multi-tenant**: Uses tenant middleware (`backend/middlewares/tenantMiddleware.js`) for data isolation
- **Authentication**: JWT-based with bcrypt password hashing
- **Monitoring**: Prometheus metrics integration at `/metrics` endpoint
- **File uploads**: Multer for handling file uploads

**Key directories:**
- `backend/controllers/` - Business logic for each resource
- `backend/routes/` - Express route definitions
- `backend/models/` - Database models and queries
- `backend/middlewares/` - Custom middleware (tenant, auth, etc.)
- `backend/db/` - Database connection, setup, and migration scripts
- `backend/utils/` - Utility functions

### Frontend (React 19 + Vite)
- **Framework**: React 19 with React Router DOM for navigation
- **Styling**: Tailwind CSS 4.1.11
- **State management**: React Context (UserProvider)
- **Authentication**: JWT token-based with automatic expiry handling
- **UI Components**: Custom components with Lucide React icons
- **Charts**: Chart.js with react-chartjs-2
- **Drag & drop**: @dnd-kit for sortable interfaces

**Key directories:**
- `frontend/src/pages/` - Main application pages/routes
- `frontend/src/components/` - Reusable UI components
- `frontend/src/context/` - React context providers
- `frontend/src/utils/` - Utility functions (auth, helpers)
- `frontend/src/hooks/` - Custom React hooks

## Development Commands

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend
```bash
cd backend
npm run dev          # Start development server (NODE_ENV=development)
npm run db:reset     # Reset database (runs setup.sql, seeds, sync sequences)
```

## Database Management

The backend uses PostgreSQL with a comprehensive setup system:

1. **Setup**: `backend/db/setup.sql` - Creates tables and schema
2. **Seeding**: `backend/db/seeds/run-seed.js` - Populates initial data
3. **Sync**: `backend/db/sync-seq.sql` - Synchronizes sequences
4. **Reset command**: `npm run db:reset` - Runs all three steps in order

**Connection**: Environment-based configuration via `.env.development` with DATABASE_URL

## Multi-Tenant Architecture

The system implements multi-tenancy through:
- Tenant middleware applied to all routes
- Tenant-specific data isolation
- Company-based user management
- Role and permission system with departments

## Key Features

- **Employee Management**: Full CRUD operations for employees and departments
- **Applicant Tracking**: Position management and applicant workflow
- **Payroll System**: Salary management and payslip generation
- **Time Tracking**: Clock in/out functionality with time reports
- **Role-Based Access**: Users, roles, and department-based permissions
- **File Management**: Image uploads and asset management

## Authentication Flow

1. JWT tokens stored in localStorage
2. Automatic token expiry checking
3. Protected routes with `ProtectedRoute` wrapper
4. Context-based user state management
5. Automatic redirect to login on token expiry

## API Structure

RESTful API with consistent patterns:
- `/api/employees` - Employee management
- `/api/companies` - Company/tenant management
- `/api/positions` - Job position management
- `/api/users` - User account management
- `/api/roles` - Role and permission management
- `/api/departments` - Department management
- Relationship routes: `/api/user-roles`, `/api/departments-roles`, `/api/employees-departments`

## Environment Configuration

Backend uses environment-specific configuration:
- `.env.development` for development
- Database, JWT, and server configuration
- Automatic environment detection via NODE_ENV