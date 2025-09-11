# Frontend - HRIS SaaS Platform

Modern React 19 frontend application for the multi-tenant HRIS platform, built with Vite, Tailwind CSS, and comprehensive HR management interfaces.

## 🏗️ Tech Stack

- **Framework**: React 19 with React Router DOM
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS 4.1.11 with custom themes
- **State Management**: React Context API
- **Authentication**: JWT-based with automatic token management
- **Icons**: Lucide React + React Icons
- **Charts**: Chart.js with react-chartjs-2
- **Drag & Drop**: @dnd-kit for sortable interfaces

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   ```
   http://localhost:5173
   ```

## 📦 Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

## 🎨 UI Components & Design

### Design System
- **Color Scheme**: Professional blue/gray palette with accent colors
- **Typography**: System fonts with consistent sizing
- **Layout**: Responsive design with mobile-first approach
- **Components**: Modular, reusable component library

### Key Components
```
src/components/
├── Sidebar.jsx         # Main navigation sidebar
├── Topbar.jsx          # Top navigation bar
├── forms/              # Form components
├── tables/             # Data table components
├── modals/             # Modal dialogs
├── charts/             # Chart components
└── common/             # Shared UI components
```

## 📱 Application Structure

### Pages & Routing
```
src/pages/
├── Dashboard.jsx           # Main dashboard with metrics
├── Login.jsx              # Authentication page
├── RegisterEmployee.jsx   # Employee registration
├── RegisterUserConfirm.jsx # User confirmation

# Employee Management
├── Applicants.jsx         # Applicant listing
├── ApplicantDetail.jsx    # Applicant profile
├── ApplicantEdit.jsx      # Applicant editing
├── ApplicantAdd.jsx       # New applicant form

# Position Management
├── Positions.jsx          # Job positions listing
├── PositionEdit.jsx       # Position editing
├── PositionDelete.jsx     # Position deletion
├── JobDetail.jsx          # Job posting details

# Payroll & Time Tracking
├── SalaryManagement.jsx   # Salary management
├── Payslips.jsx          # Payslip generation
├── ClockInOut.jsx        # Time tracking
├── TimeReports.jsx       # Time reports

# System Pages
├── Settings.jsx          # Application settings
├── BudgetPlanning.jsx    # Budget management
├── Profile.jsx           # User profile
├── Help.jsx             # Help documentation
└── NotFound.jsx         # 404 error page
```

### State Management
```
src/context/
├── UserContext.jsx       # User authentication state
├── ThemeContext.jsx      # UI theme management
└── TenantContext.jsx     # Multi-tenant context
```

### Utilities
```
src/utils/
├── auth.js              # Authentication helpers
├── api.js               # API request utilities
├── helpers.js           # General utility functions
└── constants.js         # Application constants
```

## 🔐 Authentication System

### JWT Token Management
- Automatic token storage in localStorage
- Token expiry checking with `isTokenExpired()`
- Automatic logout on token expiry
- Protected route wrapper component

### Authentication Flow
```javascript
// Login flow
1. User submits credentials
2. Backend returns JWT token
3. Token stored in localStorage
4. User redirected to dashboard

// Protected routes
1. Check for valid token on route access
2. Verify token expiry
3. Redirect to login if invalid/expired
4. Allow access if valid
```

### Auth Utilities
```javascript
// src/utils/auth.js
getToken()           // Retrieve stored token
setToken(token)      // Store new token
clearToken()         // Remove token
isTokenExpired()     // Check token validity
decodeToken()        // Decode JWT payload
```

## 🎯 Key Features

### Dashboard
- Real-time metrics and KPIs
- Interactive charts and graphs
- Quick action buttons
- Recent activity feed
- Role-based content display

### Employee Management
- Employee directory with search/filter
- Employee profile management
- Department assignments
- Role and permission management
- Employee onboarding workflow

### Applicant Tracking System
- Job position management
- Application workflow
- Candidate evaluation
- Interview scheduling
- Hiring pipeline visualization

### Payroll Management
- Salary calculation and management
- Payslip generation and download
- Bulk payroll processing
- Salary history tracking
- Tax and deduction management

### Time & Attendance
- Clock in/out functionality
- Timesheet management
- Attendance reports
- Leave management
- Overtime tracking

## 🎨 Styling & Theming

### Tailwind Configuration
- Custom color palette
- Responsive breakpoints
- Component utility classes
- Dark mode support (if implemented)

### Theme Structure
```
src/themes/
├── colors.js           # Color definitions
├── typography.js       # Font configurations
└── components.js       # Component styles
```

## 🔌 API Integration

### HTTP Client
- Axios for API requests
- Request/response interceptors
- Automatic token attachment
- Error handling and retries

### API Configuration
```javascript
// src/config/api.js
const API_BASE_URL = 'http://localhost:3000/api'

// Request interceptor for authentication
axios.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## 📊 Charts & Visualization

### Chart.js Integration
- Employee statistics
- Payroll analytics
- Time tracking visualizations
- Department metrics
- Recruitment funnel analysis

### Chart Components
```
src/components/charts/
├── LineChart.jsx       # Time series data
├── BarChart.jsx        # Comparative data
├── PieChart.jsx        # Distribution data
├── DoughnutChart.jsx   # Category breakdowns
└── ChartWrapper.jsx    # Common chart container
```

## 🔄 State Management Patterns

### Context Providers
```javascript
// User Context
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Authentication methods
  const login = async (credentials) => { /* ... */ }
  const logout = () => { /* ... */ }
  const updateUser = (userData) => { /* ... */ }
  
  return (
    <UserContext.Provider value={{
      user, loading, login, logout, updateUser
    }}>
      {children}
    </UserContext.Provider>
  )
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Considerations
- Touch-friendly interface
- Collapsible sidebar navigation
- Responsive tables with horizontal scroll
- Mobile-optimized forms
- Swipe gestures for mobile interactions

## 🔍 Development Guidelines

### Component Structure
```javascript
// Standard component template
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialState)
  const navigate = useNavigate()
  
  useEffect(() => {
    // Side effects
  }, [dependencies])
  
  const handleAction = () => {
    // Event handlers
  }
  
  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  )
}

export default ComponentName
```

### Naming Conventions
- **Components**: PascalCase (e.g., `EmployeeList.jsx`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)
- **CSS Classes**: kebab-case following Tailwind conventions

### Code Organization
- One component per file
- Named exports for utilities
- Default exports for components
- Logical file grouping by feature
- Consistent import ordering

## 🧪 Testing Strategy

### Testing Structure (To be implemented)
```
src/
├── __tests__/          # Test files
├── utils/
│   └── testUtils.js    # Testing utilities
└── setupTests.js       # Test configuration
```

### Recommended Testing Stack
- **Unit Testing**: Jest + React Testing Library
- **E2E Testing**: Cypress or Playwright
- **Component Testing**: Storybook

## 🚀 Build & Deployment

### Build Process
```bash
npm run build           # Creates dist/ folder
npm run preview         # Preview production build
```

### Build Output
- Optimized JavaScript bundles
- CSS extraction and minification
- Asset optimization
- Service worker generation (if configured)

### Environment Variables
```javascript
// .env files
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=HRIS Platform
VITE_APP_VERSION=1.0.0
```

## 🔧 Development Tools

### ESLint Configuration
- React-specific rules
- Hooks linting
- Import/export validation
- Code formatting standards

### Vite Configuration
- Fast HMR (Hot Module Replacement)
- Asset handling and optimization
- Proxy configuration for API calls
- Plugin ecosystem integration

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement component/feature
3. Add proper error handling
4. Test responsive behavior
5. Update documentation
6. Submit pull request

### Code Quality
- Follow React best practices
- Use TypeScript for complex components (if applicable)
- Implement proper error boundaries
- Add loading states for async operations
- Ensure accessibility compliance

## 🆘 Troubleshooting

### Common Issues
- **Build fails**: Check Node.js version compatibility
- **API requests fail**: Verify backend server is running
- **Authentication issues**: Check JWT token validity
- **Styling issues**: Ensure Tailwind classes are properly configured
- **Routing problems**: Verify React Router configuration