# POC Virtual Professor - Frontend

React-based frontend application for the Virtual Professor proof of concept.

## Tech Stack

- **React** 19.2
- **TypeScript** 5.9
- **Vite** 7.2
- **Ant Design** 6.2
- **Tailwind CSS** 4.1
- **React Router DOM** 7.12
- **i18next** - Internationalization
- **Axios** - HTTP client

## Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or yarn

## Installation

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Configure your `.env` file:
   | Variable | Description | Default |
   |----------|-------------|---------|
   | `VITE_API_URL` | Backend API URL | `http://localhost:3000/api` |
   | `VITE_APP_NAME` | Application name | `POC Virtual Professor` |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Path Aliases

The project uses path aliases for cleaner imports:

| Alias | Path |
|-------|------|
| `@/` | `src/` |
| `@components/` | `src/components/` |
| `@features/` | `src/features/` |
| `@hooks/` | `src/hooks/` |
| `@utils/` | `src/utils/` |
| `@services/` | `src/services/` |
| `@types/` | `src/types/` |
| `@assets/` | `src/assets/` |
| `@config/` | `src/config/` |
| `@lib/` | `src/lib/` |
| `@contexts/` | `src/contexts/` |
| `@locales/` | `src/locales/` |
