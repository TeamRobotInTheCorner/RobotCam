# VS Code Setup Guide

## Quick Start with VS Code

### 1. Open Project in VS Code
\`\`\`bash
code unitree-g1-camera-viewer
\`\`\`

### 2. Install Recommended Extensions
VS Code will prompt you to install recommended extensions, or run:
- **Ctrl+Shift+P** → "Extensions: Show Recommended Extensions"

### 3. Launch the App
**Method 1: Using Debug Panel**
1. Press **F5** or **Ctrl+Shift+D**
2. Select "🤖 Launch Unitree G1 Camera Viewer"
3. Click the green play button

**Method 2: Using Command Palette**
1. Press **Ctrl+Shift+P**
2. Type "Debug: Start Debugging"
3. Select "🤖 Launch Unitree G1 Camera Viewer"

**Method 3: Using Terminal**
1. Press **Ctrl+\`** to open terminal
2. Run: \`npm run dev\`

## Available Launch Configurations

### 🤖 Launch Unitree G1 Camera Viewer (Default)
- **Purpose**: Quick development start
- **Action**: Runs \`npm run dev\`
- **Opens**: http://localhost:3000
- **Best for**: Regular development

### 🔧 Debug Next.js Server
- **Purpose**: Full debugging with breakpoints
- **Action**: Starts Next.js with debugging enabled
- **Features**: Set breakpoints in server code
- **Best for**: Debugging server-side issues

### 🌐 Launch with Browser Debug
- **Purpose**: Auto-opens browser after starting
- **Action**: Runs dev server + opens browser
- **Best for**: Quick testing

### 🚀 Production Build & Start
- **Purpose**: Test production build locally
- **Action**: Runs \`npm run build && npm start\`
- **Best for**: Testing before deployment

### 📦 Install Dependencies
- **Purpose**: Install/update npm packages
- **Action**: Runs \`npm install\`
- **Best for**: First-time setup

### 🧹 Clean & Reinstall
- **Purpose**: Clean install of dependencies
- **Action**: Removes node_modules and reinstalls
- **Best for**: Fixing dependency issues

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Start Debugging | **F5** |
| Stop Debugging | **Shift+F5** |
| Restart Debugging | **Ctrl+Shift+F5** |
| Open Debug Panel | **Ctrl+Shift+D** |
| Open Terminal | **Ctrl+\`** |
| Command Palette | **Ctrl+Shift+P** |

## VS Code Features Enabled

### ✅ Auto-formatting
- **Prettier** formatting on save
- **ESLint** auto-fix on save
- **Import organization** on save

### ✅ IntelliSense
- **TypeScript** support
- **Tailwind CSS** class suggestions
- **Path** auto-completion
- **Auto imports** for components

### ✅ Debugging
- **Breakpoints** in TypeScript/JavaScript
- **Console logging** in Debug Console
- **Variable inspection** in Debug Panel
- **Call stack** viewing

### ✅ Extensions
- **Tailwind CSS IntelliSense**: Class name suggestions
- **Prettier**: Code formatting
- **ESLint**: Code linting
- **Error Lens**: Inline error display
- **Auto Rename Tag**: Sync HTML/JSX tag renaming

## Troubleshooting

### Port Already in Use
If port 3000 is busy:
1. Kill the process: \`npx kill-port 3000\`
2. Or use different port: \`npm run dev -- -p 3001\`

### Dependencies Issues
1. Use "🧹 Clean & Reinstall" launch config
2. Or manually: \`rm -rf node_modules package-lock.json && npm install\`

### TypeScript Errors
1. Restart TypeScript server: **Ctrl+Shift+P** → "TypeScript: Restart TS Server"
2. Check \`.vscode/settings.json\` for TypeScript config

### Debugging Not Working
1. Ensure Node.js is installed and in PATH
2. Check launch.json configuration
3. Try restarting VS Code

## Tips for Unitree G1 Development

### 🔍 Finding Robot IP
Use VS Code terminal to scan network:
\`\`\`bash
# Windows
arp -a | findstr "192.168"

# Mac/Linux  
nmap -sn 192.168.1.0/24
\`\`\`

### 🎥 Testing Camera Streams
Use VS Code's integrated browser or external browser to test:
\`\`\`
http://[G1_IP]:8080/camera/front/stream
\`\`\`

### 📝 Code Organization
- Use **Ctrl+Shift+O** to navigate symbols in file
- Use **Ctrl+T** to search across all files
- Use **F12** to go to definition
- Use **Shift+F12** to find all references
\`\`\`

Now you have a complete VS Code setup! Here's how to use it:

## 🚀 **Quick Launch Steps:**

1. **Open VS Code** in your project folder
2. **Press F5** (or go to Debug panel)
3. **Select "🤖 Launch Unitree G1 Camera Viewer"**
4. **App starts automatically** at `localhost:3000`

## 🎯 **Key Features:**

- **One-click launch** with F5
- **Auto-opens browser** (optional)
- **Full debugging support** with breakpoints
- **Multiple launch options** for different scenarios
- **Recommended extensions** auto-install
- **Optimized settings** for React/Next.js development

## 📋 **What Each File Does:**

- **`launch.json`**: Debug configurations (the main file you wanted)
- **`tasks.json`**: Background tasks (like opening browser)
- **`settings.json`**: VS Code workspace settings
- **`extensions.json`**: Recommended extensions for the project

Just press **F5** and you're ready to connect to your Unitree G1! 🤖
