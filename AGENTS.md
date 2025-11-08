# AGENTS.md - Development Guide

## Build & Test Commands

```bash
# Start development (watch mode + hot reload)
npm run dev:ext

# Build for development
npm run build:ext

# Build for production (prepublish)
npm run vscode:prepublish

# Linting
npm run lint

# Code formatting
npm run prettier

# Type checking
npm run test-compile
```

For debugging: run `npm run dev:ext`, then press F5 in VS Code to start a debug session.

## Architecture & Codebase Structure

**Project**: VS Code extension for Front Matter CMS - a headless CMS for static site generators (Hugo, Jekyll, Gatsby, etc.)

**Key Directories**:
- `src/extension.ts` - Entry point
- `src/commands/` - VS Code commands implementation
- `src/components/` - React components (for UI panels)
- `src/dashboardWebView/` - Dashboard WebView application
- `src/panelWebView/` - Panel WebView application
- `src/services/` - Business logic (PagesParser, Terminal, Credentials, etc.)
- `src/helpers/` - Utility functions (FilesHelper, ImageHelper, DateHelper, etc.)
- `src/providers/` - VS Code providers (TreeView, etc.)
- `src/listeners/` - Event listeners
- `src/models/` - TypeScript interfaces/types
- `src/parsers/` - Front matter parsing logic
- `src/localization/` - i18n support (EN, DE, JA, ZH-CN)

**Build**: Webpack (extension, dashboard, panel) with dev/prod modes. WebViews use React + TypeScript.

## Code Style & Conventions

**TypeScript**: Strict mode enabled. Imports grouped (types, packages, relative). No unused expressions or console logs (enforced by ESLint).

**Naming**: PascalCase for classes/files, camelCase for functions/variables. Service classes typically named `ServiceName` with static methods or instance methods.

**Formatting**: Prettier (100 char width, 2 spaces, single quotes, trailing commas off, semicolons required).

**Error Handling**: No throw literals - must throw Error instances. Use try-catch with proper logging via Logger service.

**Localization**: Use `localize()` function from `src/localization/localize.ts` for all user-facing strings.

**VS Code APIs**: Extension exports command implementations, listeners, and WebView providers following VS Code extension patterns.

**Assets**: Icons in `assets/`, syntaxes in `syntaxes/` (TMLANGUAGE for Hugo), UI panels use Tailwind CSS.

**WebView Communication**: Use `vscode.postMessage()` and message event handlers for extension ↔ WebView communication.
