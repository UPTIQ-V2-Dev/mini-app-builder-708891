# React App Setup

This React app was created with Vite and includes authentication, routing, and a dashboard.

## 🚨 pnpm ENOENT Error Fix

If you're getting a `spawn pnpm ENOENT` error, it means pnpm is not installed on your system. Here are the solutions:

### Quick Fix (Recommended)
```bash
# STEP 1: Run the automated setup script
npm run setup

# OR manually:
# Remove the pnpm lock file to avoid conflicts
rm pnpm-lock.yaml

# Install dependencies with npm
npm install

# Build the project
npm run build

# Start development server
npm run dev
```

### If you have permission to install packages globally:
```bash
# Install pnpm globally
npm install -g pnpm

# Or enable via corepack (newer Node.js versions)
corepack enable
corepack prepare pnpm@latest --activate

# Then use pnpm normally
pnpm install
pnpm run build
```

### Alternative: Install pnpm
```bash
# Install pnpm globally
npm install -g pnpm

# Or use corepack (if available)
corepack enable pnpm

# Then proceed with pnpm commands
pnpm install
pnpm run build
```

### Using Docker/Production Environments
If you're in a containerized environment where you can't modify the system:

1. **Delete** `pnpm-lock.yaml` 
2. **Use** `npm install` instead
3. **Run** `npm run build` instead of `pnpm build`

The project is fully compatible with both npm and pnpm.

## Features

- 🔐 Authentication system with login/logout
- 📊 Dashboard with stats and activity feed
- 🎨 Dark/Light theme toggle
- 📱 Responsive design for all devices
- 🛡️ TypeScript for type safety
- 🔄 React Query for API state management
- 🎯 Mock data system for development

## Demo Credentials

- Email: `user@example.com`
- Password: `password123`

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/contexts/` - React contexts (Auth)
- `src/services/` - API service functions
- `src/types/` - TypeScript type definitions
- `src/lib/` - Utility functions and configurations