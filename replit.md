# ASI Operations Management System

## Overview

ASI Operations is a ship inspection and work order management system for maritime operations. The application provides a Turkish-language interface for managing ship inspections, work orders, companies, employees, and vessels. It features a dashboard with statistics, comprehensive CRUD operations for master data, and reporting capabilities.

The system is built as a single-page application using React with TypeScript, Material-UI for the component library, and Vite as the build tool. Currently operates with mock JSON data files simulating a production dataset of 544 work orders, 125 companies, 67 employees, and 455 ships.

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

### Component Structure
- `components/layout/` - MainLayout, Sidebar, Header, Footer, Breadcrumbs
- `components/dashboard/` - Dashboard, StatCard, ActivityChart, QuickActions, RecentCompletions
- `components/workOrders/` - WorkOrderList, WorkOrderDetail, WorkOrderForm
- `components/masterData/` - CompaniesList, EmployeesList, ShipsList
- `components/reports/` - ReportsPage
- `components/settings/` - SettingsPage
- `components/common/` - NotFound

### Data Layer
- Mock JSON files in `src/data/` directory simulate backend data
- Date handling uses custom utility functions in `src/utils/dateUtils.ts` for Turkish date format (DD/MM/YYYY)
- No backend or database currently implemented - designed for future API integration

### Theming
- Custom MUI theme in `src/theme/theme.ts`
- Modern design system with gradient backgrounds and glassmorphism effects
- Inter font family with comprehensive typographic scale
- Extended palette with gradient definitions and Tailwind-inspired shadows
- Turkish locale configuration for MUI components

### Recent Design Updates (January 2026)
- Header: Dark gradient background with glassmorphism, gradient logo badge
- Sidebar: Collapsible navigation with section grouping, smooth animations, modern footer
- Dashboard: Gradient stat cards, modern quick action buttons with hover effects
- Components: Enhanced charts, modern tables, consistent gradient accents throughout

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

### Development
- TypeScript for type safety
- ESLint for code linting
- Vite dev server configured on port 5000 with host 0.0.0.0

### Future Considerations
- No backend/API currently - mock data only
- Authentication placeholders exist but not implemented
- Several routes marked as "Phase 3" placeholders for future development