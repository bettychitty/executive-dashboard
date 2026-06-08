# Executive Dashboard - Frontend

Modern React frontend for the Executive Function Dashboard backend.

## Quick Start

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will run on `http://localhost:5173`

To connect to a different backend, set the environment variable:

```bash
VITE_API_BASE=http://api.example.com npm run dev
```

### Build

```bash
npm run build
```

Outputs to `dist/` directory.

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool
- **ESLint** - Code linting

## Architecture

### Components

- **Header** - Top navigation with refresh and quick task button
- **TasksSection** - Active tasks with search
- **NeedsAttentionSection** - Urgent/high-priority items
- **SuggestionsSection** - Auto-extracted task suggestions
- **SourceItemsSection** - Imported emails and Teams messages
- **QuickTaskModal** - Fast task creation

### API Integration

- **api.js** - Centralized API client with all backend endpoints
- Automatic error handling and user feedback
- Optimistic UI updates for better UX

### Styling

- Custom color system (urgent/progress/done states)
- Tailwind utility classes throughout
- Responsive design (mobile-first)
- Smooth transitions and animations

## Features

✅ **Real-time task management** - Create, update, and mark tasks done  
✅ **Smart suggestions** - Review and approve auto-extracted tasks  
✅ **Message tracking** - Track status of imported emails and Teams messages  
✅ **Visual prioritization** - Colour-coded priority and status badges  
✅ **Fast interaction** - Optimistic updates, minimal friction  
✅ **Responsive design** - Works on desktop, tablet, and mobile  
✅ **Accessibility** - Clear labels, keyboard navigation, contrast ratios  

## Key UX Decisions

1. **Low friction** - Quick task modal opens instantly (Enter key to submit)
2. **Visual clarity** - Priority/status communicated through colour badges
3. **Minimal clutter** - Only essential information on screen
4. **Optimistic updates** - UI updates instantly, then syncs with backend
5. **Clear actions** - ▶ (start), ✓ (done), ✗ (dismiss) buttons
6. **Status at a glance** - Needs Attention section highlights urgent items

## Environment Variables

- `VITE_API_BASE` - Backend API URL (default: http://localhost:8000)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TasksSection.jsx
│   │   ├── SuggestionsSection.jsx
│   │   ├── QuickTaskModal.jsx
│   │   └── ui.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .eslintrc.cjs
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## Contributing

Please follow these guidelines:

- Use functional components and hooks
- Keep components focused and reusable
- Use Tailwind for styling
- Test on mobile and desktop
- Maintain accessibility standards

## License

MIT
