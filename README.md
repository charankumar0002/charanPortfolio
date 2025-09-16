# Portfolio

A modern, responsive personal portfolio built with React, TypeScript, and Vite. Features a sleek design with smooth animations and dynamic GitHub integration.

## 🚀 Live Demo

[View Portfolio](https://charankumarreddypalukuru.vercel.app/)

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **GitHub API** - Dynamic project fetching
- **Vercel** - Deployment

## ✨ Features

- Responsive design for all devices
- Smooth animations and transitions
- Dynamic GitHub repository integration
- Modern glassmorphism UI effects
- Fast loading with Vite
- Type-safe development with TypeScript

## 🏃‍♂️ Quick Start

1. Clone the repository:
```bash
git clone https://github.com/charankumarreddypalukuru/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## ⚙️ Configuration

### GitHub Integration

To display your GitHub repositories in the Projects section, create a `.env` file:

```env
VITE_GITHUB_USERNAME=your-github-username
VITE_GITHUB_TOKEN=your-github-token
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/     # React components
├── assets/        # Images and static files
└── main.tsx       # Application entry point
```

## Folder structure (2025-09 refresh)

- `src/components/` – Feature components
	- `common/` – Shared UI used across pages (Header, SEO, CustomCursor, OptimizedScrollProgress)
	- Other sections: AboutSection, EnhancedHeroSection, WorkExperience, ProjectsSection, Skills, ContactSection, etc.
- `src/context/` – React context providers (ThemeContext)
- `src/hooks/` – Reusable hooks (e.g., useIntersectionObserver)
- `src/utils/` – Utilities and small helpers (e.g., prefs)
- `src/styles/` – Global CSS (imported via `index.css`)
- `src/_archive/` – Old/unused components and utilities kept for reference. This folder is excluded from TypeScript build.

Conventions:
- Prefer colocating shared UI in `components/common`.
- Keep only one version of a component (optimized variants replace legacy ones).
- New sections should export a single default component and accept `{ id?: string }` when they need anchor IDs.
