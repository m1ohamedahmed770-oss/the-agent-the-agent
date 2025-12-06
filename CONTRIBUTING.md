# Contributing to The Agent The Agent

Thank you for your interest in contributing! We welcome contributions from everyone. This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or pnpm package manager
- Git
- Chrome or Firefox browser for testing

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Visit https://github.com/yourusername/the-agent-the-agent
   # Click the "Fork" button
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/the-agent-the-agent.git
   cd the-agent-the-agent
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/yourusername/the-agent-the-agent.git
   ```

4. **Install dependencies**
   ```bash
   pnpm install
   ```

5. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Extension Locally

**Chrome:**
```bash
# Build the extension
pnpm run build

# Open Chrome and navigate to chrome://extensions/
# Enable "Developer mode" (top right)
# Click "Load unpacked"
# Select the client/public directory
```

**Firefox:**
```bash
# Build the extension
pnpm run build

# Open Firefox and navigate to about:debugging#/runtime/this-firefox
# Click "Load Temporary Add-on"
# Select manifest.json from client/public
```

### Making Changes

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes** in the appropriate files:
   - Extension UI: `client/public/popup.html` and `popup.js`
   - Settings: `client/public/options.html` and `options.js`
   - Core logic: `client/public/background.js`
   - Page interaction: `client/public/content.js`

3. **Test your changes**:
   - Reload the extension in your browser
   - Test on multiple websites
   - Check browser console for errors

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

## Commit Message Guidelines

We follow conventional commits for clear and organized commit history:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, or tooling

### Examples
```bash
git commit -m "feat(popup): add task history panel"
git commit -m "fix(background): resolve API timeout issue"
git commit -m "docs: update installation instructions"
git commit -m "refactor(content): simplify DOM interaction logic"
```

## Pull Request Process

1. **Update your branch** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**:
   - Go to https://github.com/yourusername/the-agent-the-agent
   - Click "New Pull Request"
   - Select your feature branch
   - Fill in the PR template with:
     - Clear description of changes
     - Related issues (if any)
     - Testing instructions
     - Screenshots (if UI changes)

4. **PR Title Format**:
   ```
   feat: add task history panel
   fix: resolve API timeout issue
   docs: update installation guide
   ```

5. **Wait for review**:
   - Maintainers will review your PR
   - Address any requested changes
   - Be patient and respectful

## Code Style

### JavaScript/TypeScript
- Use 2 spaces for indentation
- Use semicolons
- Use `const` by default, `let` when needed, avoid `var`
- Use arrow functions for callbacks
- Use template literals for string concatenation

```javascript
// Good
const getMessage = (name) => {
  return `Hello, ${name}!`;
};

// Bad
var getMessage = function(name) {
  return "Hello, " + name + "!";
}
```

### CSS
- Use kebab-case for class names
- Group related properties
- Use CSS variables for colors and spacing
- Keep specificity low

```css
/* Good */
.popup-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  background: var(--color-background);
}

/* Bad */
.popup-container {
  display: flex;
  background: #ffffff;
  margin: 10px;
  padding: 10px;
}
```

### HTML
- Use semantic HTML elements
- Use meaningful class names
- Use data attributes for JavaScript hooks
- Keep nesting reasonable

```html
<!-- Good -->
<div class="popup-container">
  <header class="popup-header">
    <h1>The Agent</h1>
  </header>
  <main class="popup-content">
    <textarea id="task-input" placeholder="Enter your task"></textarea>
  </main>
</div>

<!-- Bad -->
<div class="container">
  <div class="header">
    <div class="title">The Agent</div>
  </div>
  <div class="content">
    <input type="text" class="input" />
  </div>
</div>
```

## Testing

### Manual Testing
- Test on multiple websites
- Test with different AI providers
- Test error scenarios
- Test with different task types

### Automated Testing
```bash
# Run tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage
```

## Documentation

### Updating README
- Keep the README up-to-date with new features
- Include examples for new functionality
- Update the roadmap if applicable

### Adding Comments
- Comment complex logic
- Use JSDoc for functions
- Explain the "why", not the "what"

```javascript
/**
 * Analyzes a user task and generates an action plan
 * @param {string} task - The user's natural language task
 * @returns {Object} Action plan with steps and expected outcome
 */
async analyzeTask(task) {
  // Implementation
}
```

## Reporting Issues

### Bug Reports
Include:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots or error logs

### Feature Requests
Include:
- Clear description of the feature
- Use case and motivation
- Possible implementation approach
- Examples of similar features

## Areas for Contribution

### High Priority
- 🐛 Bug fixes
- 📚 Documentation improvements
- ✨ Performance optimizations
- 🧪 Test coverage

### Medium Priority
- 🎨 UI/UX improvements
- 🌍 Internationalization
- ♿ Accessibility improvements
- 📱 Mobile support

### Lower Priority
- 🎉 New AI providers
- 🚀 Advanced features
- 🔧 Refactoring

## Questions?

- 📖 Check the [Wiki](https://github.com/yourusername/the-agent-the-agent/wiki)
- 💬 Join [Discussions](https://github.com/yourusername/the-agent-the-agent/discussions)
- 📧 Email: contact@theagent.dev

## Recognition

Contributors will be recognized in:
- The README contributors section
- GitHub contributors page
- Release notes for major contributions

Thank you for contributing to The Agent The Agent! 🎉
