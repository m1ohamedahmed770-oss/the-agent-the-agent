# The Agent The Agent - Installation Guide

Complete guide for installing and setting up The Agent The Agent browser extension.

## Table of Contents

1. [Chrome Installation](#chrome-installation)
2. [Firefox Installation](#firefox-installation)
3. [Manual Installation (Development)](#manual-installation-development)
4. [Initial Setup](#initial-setup)
5. [Troubleshooting](#troubleshooting)

## Chrome Installation

### From Chrome Web Store (Recommended)

The easiest way to install The Agent The Agent is through the Chrome Web Store:

1. **Visit the Chrome Web Store**
   - Open your Chrome browser
   - Go to [The Agent The Agent on Chrome Web Store](https://chromewebstore.google.com)

2. **Click "Add to Chrome"**
   - You'll see the extension details page
   - Click the blue "Add to Chrome" button

3. **Confirm Permissions**
   - A dialog will appear asking to confirm permissions
   - Review the permissions and click "Add extension"

4. **Verify Installation**
   - The extension icon should appear in your toolbar
   - Click the icon to open the popup

### From GitHub (Manual Installation)

If you prefer to install from the source code:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/m1ohamedahmed770-oss/the-agent-the-agent.git
   cd the-agent-the-agent
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Build the Extension**
   ```bash
   npm run build
   # or
   pnpm run build
   ```

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top right corner)
   - Click **Load unpacked**
   - Select the `client/public` directory from the cloned repository
   - The extension should now appear in your toolbar

5. **Verify Installation**
   - Click the extension icon in your toolbar
   - You should see the popup interface

## Firefox Installation

### From Firefox Add-ons (Recommended)

1. **Visit Firefox Add-ons**
   - Open your Firefox browser
   - Go to [The Agent The Agent on Firefox Add-ons](https://addons.mozilla.org)

2. **Click "Add to Firefox"**
   - You'll see the extension details page
   - Click the blue "Add to Firefox" button

3. **Confirm Installation**
   - A dialog will appear asking to confirm
   - Click "Add"

4. **Verify Installation**
   - The extension icon should appear in your toolbar
   - Click the icon to open the popup

### From GitHub (Manual Installation)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/m1ohamedahmed770-oss/the-agent-the-agent.git
   cd the-agent-the-agent
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Build the Extension**
   ```bash
   npm run build
   # or
   pnpm run build
   ```

4. **Load in Firefox**
   - Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
   - Click **Load Temporary Add-on**
   - Navigate to `client/public` directory
   - Select the `manifest.json` file
   - The extension should now appear in your toolbar

5. **Verify Installation**
   - Click the extension icon in your toolbar
   - You should see the popup interface

**Note**: In Firefox, temporary add-ons are only loaded for the current session. To make it permanent, you'll need to package it as an XPI file or use the permanent installation method.

## Manual Installation (Development)

### Prerequisites

- Node.js 18 or higher
- npm or pnpm package manager
- Git
- Chrome or Firefox browser

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/m1ohamedahmed770-oss/the-agent-the-agent.git
   cd the-agent-the-agent
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Build the Extension**
   ```bash
   pnpm run build
   ```

4. **Load the Extension**

   **For Chrome:**
   - Open `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select `client/public` directory

   **For Firefox:**
   - Open `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select `client/public/manifest.json`

5. **Start Development Server (Optional)**
   ```bash
   pnpm run dev
   ```

## Initial Setup

### 1. Configure Your AI Provider

After installation, you need to set up your AI provider:

1. **Open Settings**
   - Click the extension icon in your toolbar
   - Click the ⚙️ **Settings** button

2. **Choose Your AI Provider**
   - Select from: OpenAI, Anthropic Claude, Google Gemini, or Local Model
   - Each provider has different capabilities and pricing

3. **Enter Your API Key**
   - Get your API key from your chosen provider
   - Paste it into the "API Key" field
   - Your key is stored locally and never sent to our servers

4. **Select a Model**
   - Enter the model name (e.g., `gpt-4-turbo`, `claude-3-opus`)
   - Different models have different capabilities and costs

5. **Save Settings**
   - Click the **Save Settings** button
   - You should see a success message

### 2. Test the Extension

1. **Open a Website**
   - Navigate to any website (e.g., Google, Wikipedia)

2. **Open the Extension**
   - Click the extension icon in your toolbar

3. **Enter a Simple Task**
   - Try a simple task like "Search for 'hello world'"
   - Click **Execute Task**

4. **Watch the Agent Work**
   - You'll see real-time logs of what the agent is doing
   - The agent will interact with the page on your behalf

## Getting API Keys

### OpenAI

1. Visit [platform.openai.com](https://platform.openai.com)
2. Sign up or log in to your account
3. Go to **API keys** section
4. Click **Create new secret key**
5. Copy the key and paste it into the extension settings

**Pricing**: Pay-as-you-go, typically $0.01-0.10 per task

### Anthropic Claude

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in to your account
3. Go to **API keys** section
4. Click **Create Key**
5. Copy the key and paste it into the extension settings

**Pricing**: Pay-as-you-go, similar to OpenAI

### Google Gemini

1. Visit [ai.google.dev](https://ai.google.dev)
2. Click **Get API Key**
3. Create a new API key
4. Copy the key and paste it into the extension settings

**Pricing**: Free tier available, then pay-as-you-go

### Local Model (Ollama)

For privacy-conscious users, you can run models locally:

1. Install [Ollama](https://ollama.ai)
2. Download a model: `ollama pull llama2`
3. Start the Ollama server
4. Select "Local Model" in extension settings
5. No API key needed!

**Pricing**: Free (just download the model)

## Troubleshooting

### Extension Not Appearing

**Problem**: The extension icon doesn't appear in your toolbar

**Solutions**:
1. Refresh the page (Ctrl+R or Cmd+R)
2. Check if extension is enabled:
   - Chrome: Go to `chrome://extensions/` and ensure it's enabled
   - Firefox: Go to `about:addons` and ensure it's enabled
3. Restart your browser
4. Try reinstalling the extension

### Tasks Not Executing

**Problem**: When you click "Execute Task", nothing happens

**Solutions**:
1. **Check API Key**
   - Open settings and verify your API key is entered
   - Make sure there are no extra spaces

2. **Check API Credits**
   - Verify you have credits/balance with your AI provider
   - Check your provider's dashboard

3. **Check Browser Console**
   - Right-click on the page → Inspect → Console tab
   - Look for error messages
   - Share the error in a GitHub issue

4. **Try a Different Website**
   - Some websites block automation
   - Try a simple website like Google or Wikipedia first

### Slow Performance

**Problem**: Tasks are taking too long to execute

**Solutions**:
1. **Check Internet Connection**
   - Ensure you have a stable, fast internet connection

2. **Try a Faster Model**
   - In settings, try a faster model like `gpt-3.5-turbo` or `claude-3-sonnet`

3. **Simplify Your Task**
   - Break complex tasks into smaller steps
   - Try a simpler task first

4. **Close Other Tabs**
   - Close unnecessary browser tabs to free up resources

### API Key Issues

**Problem**: "Invalid API Key" or "Unauthorized" error

**Solutions**:
1. **Verify the Key**
   - Copy your API key again from your provider's dashboard
   - Make sure there are no extra spaces or characters

2. **Check Key Permissions**
   - Some providers require specific permissions for API keys
   - Regenerate a new key with all permissions

3. **Check Key Expiration**
   - Some API keys expire after a certain time
   - Generate a new key if needed

4. **Try a Different Provider**
   - If one provider isn't working, try another
   - All providers are supported

### Extension Crashes

**Problem**: The extension crashes or becomes unresponsive

**Solutions**:
1. **Reload the Extension**
   - Chrome: Go to `chrome://extensions/` and click the reload icon
   - Firefox: Go to `about:addons` and click the reload icon

2. **Clear Extension Data**
   - Chrome: Go to `chrome://extensions/` → Details → Clear data
   - Firefox: Go to `about:addons` → Details → Clear data

3. **Reinstall the Extension**
   - Uninstall the extension
   - Restart your browser
   - Reinstall the extension

4. **Check Browser Compatibility**
   - Ensure you're using a recent version of Chrome or Firefox
   - Update your browser if needed

### Website Blocking Automation

**Problem**: The extension works on some websites but not others

**Solutions**:
1. **Check Website Terms of Service**
   - Some websites prohibit automated access
   - Respect website policies

2. **Try a Different Approach**
   - Some websites require different interaction methods
   - Try a simpler task first

3. **Disable Browser Protections**
   - Some browser protections may interfere
   - Check your browser security settings

## Getting Help

If you encounter issues not covered here:

1. **Check GitHub Issues**
   - Visit [GitHub Issues](https://github.com/m1ohamedahmed770-oss/the-agent-the-agent/issues)
   - Search for similar issues

2. **Create a New Issue**
   - Include your browser version
   - Include the error message
   - Include steps to reproduce
   - Include screenshots if helpful

3. **Join Discussions**
   - Visit [GitHub Discussions](https://github.com/m1ohamedahmed770-oss/the-agent-the-agent/discussions)
   - Ask questions and get help from the community

4. **Contact Support**
   - Email: contact@theagent.dev
   - Include as much detail as possible

## Next Steps

After installation and setup:

1. **Explore Features**
   - Try different types of tasks
   - Experiment with different AI providers
   - Discover what works best for you

2. **Customize Settings**
   - Adjust timeout and retry settings
   - Enable verbose logging for debugging
   - Add custom instructions for your use case

3. **Join the Community**
   - Star the repository on GitHub
   - Follow for updates
   - Contribute improvements

4. **Read Documentation**
   - Check the [README](README.md)
   - Review [CONTRIBUTING.md](CONTRIBUTING.md)
   - Explore [TOPICS.md](TOPICS.md)

---

**Happy automating! 🤖**

For the latest updates and support, visit [GitHub](https://github.com/m1ohamedahmed770-oss/the-agent-the-agent)
