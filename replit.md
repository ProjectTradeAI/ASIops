# ASI Operations Management System

## Overview

ASI Operations is a ship inspection and work order management system for maritime operations. The application provides a Turkish-language interface for managing ship inspections, work orders, companies, employees, and vessels. It features a dashboard with statistics, comprehensive CRUD operations for master data, and reporting capabilities.

The system is a full-stack application with React/TypeScript frontend, Express.js backend, and PostgreSQL database for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Material-UI (MUI) v5 with custom theme configuration
- **Routing**: React Router DOM v6 with nested routes under MainLayout
- **State Management**: React useState hooks (no external state library)
- **Internationalization**: i18next configured for Turkish (tr) as primary language
- **API Service**: Centralized API service layer in `src/services/api.ts`

### Backend Architecture
- **Framework**: Express.js with TypeScript (tsx)
- **Database**: PostgreSQL (Neon-backed via Replit)
- **Port**: Backend runs on port 3001
- **Endpoints**: RESTful API for all entities

### Database Schema
- `companies` - Company master data (company_name, tax_number, tax_office, address, phone, email)
- `employees` - Employee master data (full_name, registration_number, phone, email, expertise)
- `ships` - Ship master data (ship_name, imo_number, flag, ship_type, deadweight)
- `work_orders` - Main work order records with foreign keys to all related tables
- `inspection_areas` - Lookup table for inspection areas
- `inspection_items` - Lookup table for inspection items
- `inspection_types` - Lookup table for inspection types
- `locations` - Lookup table for supervision locations
- `topics` - Lookup table for work order topics
- `provinces` - Turkish provinces
- `districts` - Turkish districts with province_id foreign key
- Junction tables: `work_order_inspection_types`, `work_order_personnel`, `work_order_tasks`

### Component Structure
- `components/layout/` - MainLayout, Sidebar, Header, Footer, Breadcrumbs
- `components/dashboard/` - Dashboard, StatCard, ActivityChart, QuickActions, RecentCompletions
- `components/workOrders/` - WorkOrderList, WorkOrderDetail, WorkOrderForm
- `components/masterData/` - CompaniesList, EmployeesList, ShipsList
- `components/reports/` - ReportsPage
- `components/settings/` - SettingsPage
- `components/common/` - NotFound

### API Endpoints
- `GET/POST /api/companies` - Company CRUD
- `GET/POST /api/employees` - Employee CRUD
- `GET/POST /api/ships` - Ship CRUD
- `GET/POST /api/work-orders` - Work order CRUD
- `GET/POST /api/inspection-areas` - Inspection areas lookup
- `GET/POST /api/inspection-items` - Inspection items lookup
- `GET/POST /api/inspection-types` - Inspection types lookup
- `GET/POST /api/locations` - Locations lookup
- `GET/POST /api/topics` - Topics lookup
- `GET /api/provinces` - Turkish provinces
- `GET /api/districts/:provinceId` - Districts by province
- `GET /api/next-file-number/:fileType` - Generate next file number (ASIC26-0001 format)

### Theming
- Custom MUI theme in `src/theme/theme.ts`
- Modern design system with gradient backgrounds and glassmorphism effects
- Inter font family with comprehensive typographic scale
- Extended palette with gradient definitions and Tailwind-inspired shadows
- Turkish locale configuration for MUI components

### Recent Updates (January 2026)
- Full-stack integration with PostgreSQL database
- Work order form now persists to database with all relationships
- Add dialogs persist new items (companies, ships, employees, lookup values) to database
- File number auto-generation from database sequence (ASIC26-0001 format)
- Province/district dependent selection from database

### Path Aliases
- `@/*` maps to `./src/*` for cleaner imports

## External Dependencies

### UI & Styling
- `@mui/material` and `@mui/icons-material` - Component library
- `@emotion/react` and `@emotion/styled` - CSS-in-JS styling

### Charts & Visualization
- `recharts` - Dashboard activity charts and data visualization

### Date Handling
- `date-fns` - Date formatting and manipulation with Turkish locale support

### Internationalization
- `i18next` and `react-i18next` - Multi-language support (currently Turkish only)

### Backend
- `express` - Web server framework
- `pg` - PostgreSQL client
- `cors` - Cross-origin resource sharing
- `tsx` - TypeScript execution

### Development
- TypeScript for type safety
- ESLint for code linting
- Vite dev server configured on port 5000 with host 0.0.0.0
- `concurrently` for running frontend and backend together

## Running the Application

The application uses `npm run dev` which runs both:
- Frontend (Vite) on port 5000
- Backend (Express) on port 3001

Environment variables:
- `DATABASE_URL` - PostgreSQL connection string (auto-configured by Replit)
