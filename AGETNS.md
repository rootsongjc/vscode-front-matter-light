# Front Matter VS Code Extension

## Project Overview

Front Matter is a CMS (Content Management System) that runs within Visual Studio Code. It allows users to manage content, data, and media for static site generators (like Hugo, Jekyll, Docusaurus, NextJS, Gatsby, etc.) directly from VS Code. The extension provides content creation, preview capabilities, SEO tools, and extensibility features.

This appears to be the beta version of the extension (vscode-front-matter-beta), currently at version 10.9.0.

### Key Features
- Content, data, and media management
- Dashboard for searching, filtering, and sorting content
- Site preview functionality within VS Code
- SEO checks for titles, descriptions, and keywords
- Support for various static-site generators
- Extensibility through custom scripts
- Multilingual content support (i18n)
- Taxonomy management (tags, categories, custom taxonomies)
- Templates and snippets support
- Git integration

## Project Structure

```
├── .frontmatter/           # Front Matter configuration directory
├── .github/               # GitHub-related configurations
├── .templates/            # Template files
├── .vscode/               # VS Code settings
├── assets/                # Extension assets (icons, images)
├── l10n/                  # Localization files
├── sample/                # Sample project files
├── scripts/               # Build and development scripts
├── src/                   # Source code directory
│   ├── commands/          # Command implementations
│   ├── components/        # React components
│   ├── constants/         # Project constants
│   ├── dashboardWebView/  # Dashboard webview implementation
│   ├── helpers/           # Helper functions/classes
│   ├── hooks/             # React hooks
│   ├── listeners/         # Event listeners
│   ├── localization/      # Localization utilities
│   ├── models/            # Data models
│   ├── panelWebView/      # Panel webview implementation
│   ├── parsers/           # Content parsers
│   ├── providers/         # VS Code providers
│   ├── services/          # Core services
│   ├── utils/             # Utility functions
│   └── extension.ts       # Extension entry point
├── ssg-scripts/           # Static site generator scripts
├── syntaxes/              # Language syntax definitions
├── webpack/               # Webpack configuration files
├── frontmatter.json       # Front Matter configuration
├── package.json           # Node.js package manifest
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Development Setup

### Prerequisites
- Node.js (version compatible with dependencies)
- VS Code ^1.90.0

### Building the Extension

The project uses npm scripts for development and build processes:

```bash
# Install dependencies
npm install

# Development build with watching
npm run dev:ext

# Production build
npm run vscode:prepublish

# Individual component builds
npm run build:ext
npm run prod:ext
npm run prod:dashboard
npm run prod:panel

# Clean build artifacts
npm run clean
```

### Development Scripts

Key scripts from package.json:
- `dev:ext` - Development build with watching
- `vscode:prepublish` - Production build for publishing
- `build:ext` - Build extension
- `watch:*` - Watch mode for individual components
- `prod:*` - Production builds for individual components
- `lint` - Run ESLint
- `prettier` - Run Prettier formatter
- `localization:*` - Localization management scripts

## Architecture

### Entry Point
The extension starts from `src/extension.ts` which:
- Initializes the extension context
- Registers commands and listeners
- Sets up the dashboard and sidebar panel
- Handles content watching and parsing
- Manages localization

### Key Components
- **Dashboard**: Full-featured webview dashboard for content management
- **Panel**: Sidebar panel for quick access to content properties
- **Commands**: Various functionality organized in the `commands/` directory
- **Providers**: VS Code extension providers (ContentProvider, PanelProvider, etc.)
- **Services**: Core business logic (GitListener, PagesParser, etc.)

### Technologies Used
- TypeScript
- React (for webviews)
- Webpack (for bundling)
- Tailwind CSS (for styling)
- VS Code Extension API
- JSON Schema for configuration validation

## Development Conventions

### Code Style
- TypeScript strict mode with strictNullChecks enabled
- ESLint for linting with custom configuration
- Prettier for code formatting
- React with JSX support

### Testing
- Unit tests likely exist (not directly visible in structure but referenced in scripts)
- Test compilation script: `npm run test-compile`

### Localization
- Multi-language support (English, German, Japanese, Chinese)
- Uses VS Code's localization API
- Localization files in the `l10n/` directory

## Configuration

The extension provides extensive configuration options through VS Code settings, including:
- Content management settings
- Dashboard configuration
- Data files/folders management
- Git integration settings
- Media handling
- SEO optimization settings
- Taxonomy management
- Template and snippet settings
