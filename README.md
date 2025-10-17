# 🎨 UX Theme Builder

A powerful, enterprise-grade theme builder and design system generator built with **Angular 20**, leveraging signals, zoneless change detection, and modern web standards.

## 🔗 Live Demo

**[View Live Demo](https://mirnamilad.github.io/ux-theme-builder/builder)** 🚀

## 🌟 Project Overview

**UX Theme Builder** is an Angular project that demonstrates advanced frontend architecture, reactive state management, and dynamic UI rendering. It allows users to create, customize, save, and export complete design systems without any external UI library dependencies.

### Key Features

- ✨ **Dynamic Token System** - Define colors, typography, spacing, and border radius
- 🔄 **Live Preview** - See changes instantly across all components
- 💾 **Persistent Storage** - Save and load multiple themes using localStorage
- 📤 **Export Options** - Export themes as JSON, CSS, or SCSS
- �� **Type-Safe** - Full TypeScript support with strict mode
- 🚀 **Performance** - Zoneless change detection with Angular signals
- 📱 **Responsive** - Mobile-friendly interface

## 🛠️ Tech Stack

| Area                 | Technology                                |
| -------------------- | ----------------------------------------- |
| **Framework**        | Angular 20                                |
| **State Management** | Angular Signals                           |
| **Change Detection** | Zoneless (provideZonelessChangeDetection) |
| **Styling**          | SCSS + CSS Custom Properties              |
| **Storage**          | LocalStorage API                          |
| **Build Tool**       | Angular CLI 20                            |
| **TypeScript**       | v5.6+ (Strict Mode)                       |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 20+

### Installation

\`\`\`bash

# Install dependencies

npm install

# Start development server

npm start
\`\`\`

The app will be available at \`http://localhost:4200\`

## 🚀 Deployment

### Automatic Deployment (Recommended)

The project automatically deploys to GitHub Pages when you push changes to the `main` branch using GitHub Actions.

**Workflow:**

1. Push your changes to `main`
2. GitHub Actions automatically runs tests
3. If tests pass, builds the project
4. Deploys to GitHub Pages
5. Live site updates at `https://mirnamimilad.github.io/ux-theme-builder/`

### Manual Deployment

You can also manually deploy using:

\`\`\`bash

# Build and deploy to GitHub Pages

npm run deploy
\`\`\`

This will:

1. Build the project in production mode
2. Configure the base href for GitHub Pages
3. Deploy to the \`gh-pages\` branch

## 📖 Usage Guide

### Creating a Theme

1. Navigate to the **Builder** page
2. Customize colors, typography, spacing, and border radius
3. See live updates in the form preview
4. Click **Save Theme** to persist your design

### Exporting Themes

Click any export button to download your theme as JSON, CSS, or SCSS.

## 📄 License

MIT License - see LICENSE file for details
