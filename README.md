# The Agent The Agent 🤖

> An open-source, AI-powered browser extension that automates web tasks using natural language commands.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Available-brightgreen)](https://chromewebstore.google.com)
[![Firefox Add-ons](https://img.shields.io/badge/Firefox%20Add--ons-Available-orange)](https://addons.mozilla.org)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/the-agent-the-agent?style=social)](https://github.com/yourusername/the-agent-the-agent)

## Overview

**The Agent The Agent** is a powerful browser extension that brings AI-powered automation to your web browsing experience. Simply describe what you want to do in natural language, and the agent will intelligently navigate, interact with, and extract information from web pages on your behalf.

### Key Features

- 🎯 **Natural Language Commands**: Describe tasks in plain English, and the agent understands and executes them
- 🤖 **AI-Powered Automation**: Uses advanced AI models to understand page context and make intelligent decisions
- 🔒 **Privacy-First Design**: Your API keys and data stay on your machine—no cloud processing required
- 🌐 **Universal Web Support**: Works on any website without special configuration
- ⚡ **Fast & Lightweight**: Minimal performance impact on your browsing experience
- 🎨 **Beautiful UI**: Intuitive popup interface with real-time task execution logs
- 🔧 **Fully Customizable**: Configure AI providers, models, and behavior settings
- 📝 **Open Source**: MIT licensed—inspect, modify, and contribute to the code

## Installation

### From Chrome Web Store (Recommended)
1. Visit [The Agent The Agent on Chrome Web Store](https://chromewebstore.google.com)
2. Click **"Add to Chrome"**
3. Confirm the permissions and you're ready to go!

### From Firefox Add-ons
1. Visit [The Agent The Agent on Firefox Add-ons](https://addons.mozilla.org)
2. Click **"Add to Firefox"**
3. Confirm and start automating!

### Manual Installation (Development)
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/the-agent-the-agent.git
   cd the-agent-the-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the `client/public` directory

5. Load in Firefox:
   - Open `about:debugging#/runtime/this-firefox`
   - Click **Load Temporary Add-on**
   - Select the `manifest.json` file

## Quick Start

### 1. Configure Your AI Provider

1. Click the extension icon in your browser toolbar
2. Click the ⚙️ **Settings** button
3. Choose your AI provider (OpenAI, Anthropic, Google Gemini, or Local Model)
4. Enter your API key
5. Select the model you want to use
6. Click **Save Settings**

### 2. Use the Agent

1. Click the extension icon to open the popup
2. Type your task in natural language:
   - "Search for the best pizza restaurants near me"
   - "Extract all email addresses from this page"
   - "Click on the 'Sign Up' button and fill in my email"
   - "Scroll down and take a screenshot of the pricing section"
3. Click **Execute Task** (or press Ctrl+Enter)
4. Watch the agent work in real-time with detailed logs

## Supported AI Providers

The extension supports multiple AI providers for maximum flexibility:

| Provider | Model Examples | Free Tier | Notes |
|----------|---|---|---|
| **OpenAI** | gpt-4-turbo, gpt-4, gpt-3.5-turbo | Yes (limited) | Most capable, recommended for complex tasks |
| **Anthropic Claude** | claude-3-opus, claude-3-sonnet | Yes (limited) | Excellent reasoning, great for analysis |
| **Google Gemini** | gemini-pro, gemini-1.5-pro | Yes (limited) | Fast and efficient, good for general tasks |
| **Local Model** | Ollama, LM Studio | Free | Run models locally, no API key needed |

### Getting API Keys

**OpenAI:**
1. Visit [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to API keys section
4. Create a new API key
5. Copy and paste into extension settings

**Anthropic Claude:**
1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Create an API key
4. Copy and paste into extension settings

**Google Gemini:**
1. Visit [ai.google.dev](https://ai.google.dev)
2. Click "Get API Key"
3. Create a new API key
4. Copy and paste into extension settings

## Architecture

### Core Components

```
the-agent-the-agent/
├── client/
│   └── public/
│       ├── manifest.json          # Extension configuration
│       ├── popup.html             # Main UI popup
│       ├── popup.js               # Popup logic
│       ├── background.js          # Service worker (AI logic)
│       ├── content.js             # Page interaction script
│       ├── options.html           # Settings page
│       ├── options.js             # Settings logic
│       └── icons/                 # Extension icons
├── src/                           # React components (future UI)
├── package.json
└── README.md
```

### How It Works

1. **User Input**: You describe a task in the popup
2. **Task Analysis**: The background service worker analyzes your request
3. **Page Context**: Content script gathers information about the current page
4. **AI Processing**: The AI model generates an action plan based on task + page context
5. **Execution**: Content script executes the planned actions (clicks, typing, scrolling, etc.)
6. **Feedback**: Real-time logs show what the agent is doing
7. **Results**: Extracted data, screenshots, or confirmation of completed actions

### Data Flow

```
Popup UI
   ↓
Background Service Worker (AI Logic)
   ↓
Content Script (Page Interaction)
   ↓
Web Page DOM
```

## Configuration

### Settings Available

- **API Provider**: Choose your AI service (OpenAI, Anthropic, Google, Local)
- **API Key**: Your authentication token (stored locally in Chrome storage)
- **Model**: Specific model to use (e.g., gpt-4-turbo, claude-3-opus)
- **Auto-execute**: Skip confirmation dialog for faster execution
- **Verbose Logging**: Show detailed logs of all agent actions
- **Task Timeout**: Maximum time to wait for task completion (10-300 seconds)
- **Max Retries**: Number of times to retry failed actions (0-5)
- **Custom Instructions**: Add system prompts to guide the agent's behavior

## Example Tasks

### Web Search & Analysis
```
"Search for 'best JavaScript frameworks 2024' and summarize the top 3 results"
```

### Form Filling
```
"Fill in the contact form with my name 'John Doe', email 'john@example.com', and message 'Hello!'"
```

### Data Extraction
```
"Extract all product names and prices from this page and show them in a table"
```

### Navigation & Interaction
```
"Click on the 'Products' menu, then find and click on 'Electronics', and take a screenshot"
```

### Content Summarization
```
"Summarize the main content of this article in 3 bullet points"
```

## Permissions

The extension requests the following permissions:

| Permission | Reason |
|-----------|--------|
| `activeTab` | Access the currently active tab |
| `scripting` | Inject content scripts to interact with pages |
| `tabs` | Get tab information and URLs |
| `storage` | Save your settings and API keys locally |
| `contextMenus` | Add right-click context menu options |
| `<all_urls>` | Work on any website |

**Privacy Note**: All data processing happens locally. Your API keys are stored in Chrome's secure storage and never transmitted to our servers.

## Development

### Prerequisites
- Node.js 18+ and npm/pnpm
- Chrome or Firefox browser
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/the-agent-the-agent.git
cd the-agent-the-agent

# Install dependencies
pnpm install

# Build the extension
pnpm run build

# Watch for changes (development)
pnpm run dev
```

### Project Structure

```
├── client/public/
│   ├── manifest.json       # Chrome/Firefox manifest
│   ├── popup.html/js       # Main popup UI
│   ├── background.js       # Service worker with AI logic
│   ├── content.js          # Page interaction script
│   ├── options.html/js     # Settings page
│   └── icons/              # Extension icons
├── src/                    # Future React UI components
├── package.json
└── tsconfig.json
```

### Building

```bash
# Development build
pnpm run dev

# Production build
pnpm run build

# Watch mode
pnpm run watch
```

### Testing

```bash
# Run tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch
```

## Troubleshooting

### Extension Not Appearing
- Refresh the page (Ctrl+R or Cmd+R)
- Check if extension is enabled in `chrome://extensions/`
- Restart your browser

### Tasks Not Executing
- Verify your API key is correct in settings
- Check that you have API credits available
- Review the error logs in the popup
- Ensure the website allows automation (some sites block it)

### Slow Performance
- Check your internet connection
- Try with a faster AI model
- Reduce the task complexity
- Close other browser tabs

### API Key Issues
- Verify the key is for the correct provider
- Check that the key hasn't expired
- Ensure you have sufficient API credits
- Try regenerating a new API key

## Contributing

We welcome contributions! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add amazing feature'`)
5. Push to your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Areas for Contribution
- 🐛 **Bug fixes**: Report and fix issues
- ✨ **Features**: Add new capabilities
- 📚 **Documentation**: Improve guides and examples
- 🎨 **UI/UX**: Enhance the interface
- 🧪 **Tests**: Improve test coverage
- 🌍 **Translations**: Add language support

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Format with Prettier
- Write meaningful commit messages

## Roadmap

### Version 1.1 (Q1 2025)
- [ ] Multi-step task workflows
- [ ] Screenshot and video recording
- [ ] Task history and replay
- [ ] Keyboard shortcuts customization

### Version 1.2 (Q2 2025)
- [ ] Advanced scheduling (run tasks at specific times)
- [ ] Team collaboration features
- [ ] API for third-party integrations
- [ ] Mobile app companion

### Version 2.0 (Q3 2025)
- [ ] Vision-based element detection
- [ ] Advanced error recovery
- [ ] Custom model training
- [ ] Enterprise features

## Security & Privacy

### Your Data is Safe
- ✅ All processing happens locally in your browser
- ✅ API keys stored in Chrome's secure storage
- ✅ No data sent to our servers
- ✅ No tracking or analytics
- ✅ Open source for transparency

### Best Practices
- Never share your API keys
- Use strong, unique API keys
- Regularly rotate your keys
- Review extension permissions
- Keep the extension updated

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 The Agent The Agent Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## Support

### Getting Help
- 📖 **Documentation**: Check the [Wiki](https://github.com/yourusername/the-agent-the-agent/wiki)
- 🐛 **Bug Reports**: Open an [Issue](https://github.com/yourusername/the-agent-the-agent/issues)
- 💬 **Discussions**: Join our [Discussions](https://github.com/yourusername/the-agent-the-agent/discussions)
- 📧 **Email**: contact@theagent.dev

### Community
- ⭐ Star the repository if you find it useful
- 🔗 Share with others who might benefit
- 💡 Suggest features and improvements
- 🤝 Contribute to the project

## Credits

### Built With
- [Chrome Extensions API](https://developer.chrome.com/docs/extensions/)
- [Firefox WebExtensions API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [OpenAI API](https://openai.com/api/)
- [Anthropic Claude API](https://www.anthropic.com/api)
- [Google Gemini API](https://ai.google.dev/)

### Contributors
- [Your Name](https://github.com/yourusername) - Creator & Maintainer

## Changelog

### Version 1.0.0 (December 2024)
- 🎉 Initial release
- ✅ Core automation features
- ✅ Multi-provider AI support
- ✅ Settings management
- ✅ Real-time logging
- ✅ Open source release

## Disclaimer

This extension is provided "as is" without warranty. Users are responsible for:
- Complying with website terms of service
- Using the extension ethically and legally
- Protecting their API keys and credentials
- Understanding the limitations of AI automation

Some websites may prohibit automated access. Always check the website's terms of service before using this extension.

## Future Vision

We envision **The Agent The Agent** becoming the standard tool for intelligent web automation. Our goal is to:
- 🌟 Make web automation accessible to everyone
- 🔓 Maintain 100% open source and community-driven development
- 🚀 Support cutting-edge AI models as they emerge
- 🌍 Enable global collaboration and knowledge sharing
- 💪 Empower users to automate their digital lives

---

**Made with ❤️ by the open-source community**

[⬆ Back to top](#the-agent-the-agent-)
