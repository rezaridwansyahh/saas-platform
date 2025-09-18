# HRIS SaaS Platform

A comprehensive multi-tenant Human Resource Information System (HRIS) built with React and Node.js. This platform provides complete HR management capabilities including employee management, payroll processing, time tracking, and applicant tracking system.

## 🏗️ Architecture

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + PostgreSQL
- **Authentication**: JWT-based with role-based access control
- **Multi-tenancy**: Tenant-based data isolation
- **Monitoring**: Prometheus metrics integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saas-platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.development.example .env.development  # Configure your database
   npm run db:reset  # Setup database
   npm run dev       # Start backend server
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev  # Start frontend development server
   ```

### Environment Configuration

Create `backend/.env.development` with:
```env
DATABASE_NAME=hris
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_URL="postgres://postgres:your_password@localhost:5432/hris"
PORT=3000
JWT_SECRET=your_jwt_secret
```

## 📁 Project Structure

```
saas-platform/
├── backend/                 # Node.js/Express API
│   ├── controllers/         # Business logic
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   ├── middlewares/        # Custom middleware
│   ├── db/                 # Database setup and migrations
│   └── utils/              # Utility functions
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Frontend utilities
│   └── public/             # Static assets
└── README.md
```

## 🎯 Features

### Core HR Management
- **Employee Management**: Complete employee lifecycle management
- **Department Organization**: Department-based employee grouping
- **Position Management**: Job positions and organizational structure
- **Role-Based Access Control**: Granular permissions system

### Payroll & Time Tracking
- **Salary Management**: Employee compensation management
- **Payslip Generation**: Automated payslip creation
- **Clock In/Out**: Time tracking with attendance management
- **Time Reports**: Comprehensive time and attendance reporting

### Recruitment
- **Applicant Tracking**: End-to-end recruitment process
- **Position Management**: Job posting and management
- **Application Workflow**: Streamlined hiring process

### System Features
- **Multi-Tenant Architecture**: Complete tenant isolation
- **User Management**: User accounts with role assignments
- **File Management**: Document and image upload handling
- **Metrics & Monitoring**: Prometheus integration for system monitoring

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev          # Start development server
npm run db:reset     # Reset and seed database
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Database Management

The system includes comprehensive database management:
- **Setup**: `backend/db/setup.sql` creates all tables and schema
- **Seeding**: `backend/db/seeds/` contains initial data
- **Reset**: `npm run db:reset` rebuilds the entire database

## 🔧 API Endpoints

### Authentication
- `POST /api/login` - User authentication
- `POST /api/register` - User registration

### Core Resources
- `/api/companies` - Company/tenant management
- `/api/employees` - Employee management
- `/api/users` - User account management
- `/api/positions` - Job position management
- `/api/departments` - Department management
- `/api/roles` - Role and permission management

### Payroll & Time
- `/api/salary-management` - Salary operations
- `/api/payslips` - Payslip management
- `/api/time-tracking` - Time and attendance

## 🏢 Multi-Tenant Features

- **Tenant Isolation**: Complete data separation between tenants
- **Company Management**: Multi-company support within tenants
- **Role-Based Permissions**: Fine-grained access control
- **Department Organization**: Hierarchical organizational structure

## 📊 Monitoring

Prometheus metrics available at `/metrics` endpoint:
- HTTP request counters
- Response time histograms
- System resource utilization
- Custom business metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

[Add your license information here]

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in each folder's README
- Review the CLAUDE.md file for development guidance