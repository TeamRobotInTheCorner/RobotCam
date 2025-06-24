# VS Code Setup Instructions

## Problem: Missing .vscode/launch.json after cloning

The VS Code configuration files might not be included when you clone the repository. Here are **3 ways** to fix this:

## Method 1: Run Setup Script (Easiest)

### On Mac/Linux:
\`\`\`bash
chmod +x setup-vscode.sh
./setup-vscode.sh
\`\`\`

### On Windows:
\`\`\`cmd
setup-vscode.bat
\`\`\`

## Method 2: Manual Creation

1. **Create .vscode folder** in your project root:
   \`\`\`bash
   mkdir .vscode
   \`\`\`

2. **Create launch.json file** in `.vscode/launch.json`:
   \`\`\`json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "🤖 Launch Unitree G1 Camera Viewer",
         "type": "node-terminal",
         "request": "launch",
         "command": "npm run dev",
         "cwd": "${workspaceFolder}",
         "env": {
           "NODE_ENV": "development"
         }
       }
     ]
   }
   \`\`\`

## Method 3: Use VS Code Command Palette

1. **Open Command Palette**: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. **Type**: "Debug: Open launch.json"
3. **Select**: "Node.js" when prompted
4. **Replace** the generated content with the configuration above

## Verification

After setup, you should see:
\`\`\`
your-project/
├── .vscode/
│   ├── launch.json      ✅
│   ├── settings.json    ✅
│   └── extensions.json  ✅
├── app/
├── components/
└── package.json
\`\`\`

## Quick Test

1. **Press F5** in VS Code
2. **Select** "🤖 Launch Unitree G1 Camera Viewer"
3. **App should start** at http://localhost:3000

## Troubleshooting

### Still can't see launch.json?
- Check if `.vscode` folder exists in project root
- Restart VS Code after creating the files
- Make sure you're in the correct project folder

### F5 doesn't work?
- Open Debug panel: `Ctrl+Shift+D`
- Click the green play button
- Select the launch configuration from dropdown

### Node.js not found?
- Install Node.js from https://nodejs.org
- Restart VS Code after installation
- Check terminal: `node --version`

## Alternative: Use Terminal

If VS Code launch still doesn't work, use the integrated terminal:

1. **Open terminal**: `Ctrl+`` (backtick)
2. **Install dependencies**: `npm install`
3. **Start app**: `npm run dev`
4. **Open browser**: http://localhost:3000

## File Structure After Setup

\`\`\`
.vscode/
├── launch.json         # Debug configurations (F5 to launch)
├── settings.json       # VS Code workspace settings
├── tasks.json          # Background tasks
└── extensions.json     # Recommended extensions
\`\`\`

## Next Steps

1. ✅ **Install recommended extensions** when VS Code prompts
2. ✅ **Run `npm install`** to install dependencies
3. ✅ **Press F5** to launch the app
4. ✅ **Connect your Unitree G1** to the same WiFi network
5. ✅ **Enter G1's IP address** in the app and connect!

---

**Need help?** The setup scripts will create all necessary files automatically! 🚀
