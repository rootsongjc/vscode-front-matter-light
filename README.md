# Hugo CMS

A lightweight VS Code extension for managing Hugo static site projects. Hugo CMS simplifies content creation, front matter editing, and site management directly within your editor.

## Features

### Content Management
- **Front Matter Editor**: Easily edit YAML/TOML front matter in a user-friendly panel interface
- **Content Creation**: Quickly create new posts and pages with customizable templates
- **Metadata Management**: Manage tags, categories, dates, and custom front matter fields

### Site Integration
- **Live Preview**: Preview your content changes in real-time
- **Server Control**: Start/stop your Hugo development server directly from the extension
- **Website Navigation**: Open published pages directly on your website

### Developer Experience
- **Syntax Highlighting**: Hugo-specific syntax highlighting for templates and configuration
- **Quick Actions**: Optimized slug generation, media insertion, and snippet support
- **Custom Scripts**: Run custom build and deployment scripts with one click

## Getting Started

### Installation
1. Install the extension from VS Code Marketplace
2. Open your Hugo project in VS Code
3. The extension will automatically detect your site configuration

### Basic Usage

#### Opening the Panel
- Open the Front Matter panel from the sidebar to start managing your content

#### Creating Content
- Use the "Create Content" action to generate new posts with your defined templates
- Customize front matter fields in the editor

#### Managing Server
- Use the "Start/Stop Server" action to control your local Hugo development server
- View live previews as you edit

## Configuration

Add these settings to your `.vscode/settings.json` to customize the extension:

```json
{
  "frontMatter.website.baseUrl": "https://yourdomain.com",
  "frontMatter.preview.host": "http://localhost:1313",
  "frontMatter.content.pageFolders": [
    {
      "title": "Blog",
      "path": "[[workspace]]/content/blog"
    },
    {
      "title": "Pages",
      "path": "[[workspace]]/content/pages"
    }
  ]
}
```

## Supported Content Types

Works seamlessly with Hugo projects using:
- Markdown (`.md`)
- Front matter formats: YAML, TOML
- Custom content organization and templates

## Keyboard Shortcuts

- `Ctrl+Shift+Alt+D` (Windows/Linux) / `Cmd+Shift+Alt+D` (Mac): Open Dashboard
- `Ctrl+Shift+Alt+M` (Windows/Linux) / `Cmd+Shift+Alt+M` (Mac): Insert Media
- `Ctrl+Shift+Alt+I` (Windows/Linux) / `Cmd+Shift+Alt+I` (Mac): Insert Snippet

## Settings

### Content Settings
- `frontMatter.content.pageFolders` - Define your content folders
- `frontMatter.content.modifiedField` - Track last modified date
- `frontMatter.content.publicationField` - Define publication date field

### Preview Settings
- `frontMatter.preview.host` - Local preview server URL
- `frontMatter.website.baseUrl` - Production website URL

### Panel Actions
- `frontMatter.panel.actions.disabled` - Disable specific actions in the panel

## Customization

### Custom Front Matter Fields
Define custom fields in your Hugo site configuration to appear in the editor.

### Custom Scripts
Add custom build, test, or deployment scripts that appear as actions in the extension panel.

## Troubleshooting

### Panel Not Showing Content
- Ensure your Hugo content files are in the configured `pageFolders`
- Check that front matter is properly formatted (valid YAML/TOML)

### Preview Not Working
- Verify `frontMatter.preview.host` is set to your Hugo development server URL
- Ensure Hugo server is running on the specified port

### Server Control Issues
- Check that Hugo is installed and accessible from your terminal
- Verify terminal configuration in VS Code settings

## Contributing

Contributions are welcome! Please submit issues and pull requests to improve Hugo CMS.

## License

MIT © 2024

## Support

For issues, feature requests, and discussions, visit the [GitHub repository](https://github.com/rootsongjc/vscode-front-matter-light).

---

Made with ❤️ for Hugo developers
