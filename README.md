# ASI Operations Tracker - Prototype

**Phase 0: Conceptual Design & Prototype**
**Version:** 0.0.1
**Purpose:** Interactive prototype for scope validation and stakeholder feedback

---

## Project Status

- ✅ **Day 1-2:** Technical Setup (COMPLETE)
- 🔜 **Day 3-4:** Layout Components (NEXT)
- 🔜 **Day 5:** Dashboard
- 🔜 **Day 6-7:** Work Order Module
- 🔜 **Day 8:** Master Data
- 🔜 **Day 9:** Search & Filtering
- 🔜 **Day 10:** Polish & Additional Features

---

## Quick Start

### Prerequisites
- Node.js 18+ LTS
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The app will run on `http://localhost:3000`

---

## Project Structure

```
asi-operations-prototype/
├── src/
│   ├── components/          # React components
│   │   ├── layout/          # Layout components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── workOrders/      # Work order components
│   │   ├── masterData/      # Master data components
│   │   └── common/          # Shared components
│   ├── data/                # Mock data (JSON files)
│   ├── theme/               # MUI theme configuration
│   ├── i18n/                # Internationalization
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

---

## Technology Stack

- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.0
- **Language:** TypeScript 5.2
- **UI Library:** Material-UI (MUI) 5.14
- **Routing:** React Router 6.20
- **Charts:** Recharts 2.10
- **i18n:** react-i18next 13.5
- **Date Library:** date-fns 2.30

---

## Features (Prototype)

### Implemented ✅
- Project structure setup
- TypeScript configuration
- Material-UI theme with Turkish locale
- Turkish localization (i18n)
- Mock data structure
- Basic routing
- Placeholder components

### In Progress 🔄
- Layout components (Day 3-4)

### Planned 📋
- Dashboard with widgets (Day 5)
- Work Order module (Day 6-7)
- Master Data management (Day 8)
- Search & Filtering (Day 9)
- Polish & Additional features (Day 10)

---

## Mock Data

Mock data files are in `src/data/`:
- `mockWorkOrders.json` - Sample work orders (8 entries)
- More mock data files will be added as needed

---

## Key Decisions

1. **No Backend:** Prototype uses static JSON mock data only
2. **No Authentication:** User assumed to be logged in as "Leyla"
3. **Simplified Logic:** Focus on UI/UX, not business logic
4. **Turkish First:** All UI text in Turkish by default
5. **Mock Everything:** All actions (save, delete, etc.) are simulated

---

## Development Guidelines

### Component Structure
- Use functional components with hooks
- TypeScript for all components
- Follow MUI design patterns
- Keep components simple for rapid prototyping

### Naming Conventions
- Components: PascalCase (e.g., `WorkOrderList.tsx`)
- Files: PascalCase for components, camelCase for utilities
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

### Code Style
- Use ESLint rules (run `npm run lint`)
- Keep functions small and focused
- Add comments for complex logic
- Use meaningful variable names

---

## What NOT to Build (Prototype Phase)

- ❌ Backend API integration
- ❌ Real authentication/authorization
- ❌ Data persistence
- ❌ Complex form validation
- ❌ Unit tests
- ❌ Performance optimization
- ❌ Error handling (except basic)
- ❌ Security features

---

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Deploy dist/ folder to Netlify
```

---

## Timeline

- **Week 1:** Days 1-5 (Layout + Dashboard)
- **Week 2:** Days 6-10 (Features + Polish)
- **Final Demo:** End of Day 10

---

## Feedback Collection

After demos, collect feedback on:
- Navigation and information architecture
- Visual design and colors
- Workflows and user experience
- Missing features
- Confusing elements
- Performance issues

---

## Next Steps After Prototype

1. Review feedback with stakeholders
2. Create Feature Inventory document
3. Update Scope Definition
4. Refine project estimates
5. Get sign-off for Phase 1

---

## Important Notes

⚠️ **This is a prototype, not production code!**
- Mock data only
- No real backend
- Simplified logic
- Focus on visual design and workflows
- Not optimized for performance

---

## Support

For questions or issues during development:
1. Check [PROJECT_STATUS.md](../ASIoperations/PROJECT_STATUS.md) for current progress
2. Review [NEXT_STEPS.md](../ASIoperations/NEXT_STEPS.md) for task guidance
3. Consult [PHASE_0_SUMMARY.md](../ASIoperations/PHASE_0_SUMMARY.md) for overview

---

**Last Updated:** November 4, 2025
**Status:** Day 1-2 Technical Setup Complete ✅
