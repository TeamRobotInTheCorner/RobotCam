@echo off
echo 🔧 Setting up VS Code configuration for Unitree G1 Camera Viewer...

REM Create .vscode directory if it doesn't exist
if not exist ".vscode" mkdir .vscode

REM Create launch.json
(
echo {
echo   "version": "0.2.0",
echo   "configurations": [
echo     {
echo       "name": "🤖 Launch Unitree G1 Camera Viewer",
echo       "type": "node-terminal",
echo       "request": "launch",
echo       "command": "npm run dev",
echo       "cwd": "${workspaceFolder}",
echo       "env": {
echo         "NODE_ENV": "development"
echo       },
echo       "presentation": {
echo         "echo": true,
echo         "reveal": "always",
echo         "focus": false,
echo         "panel": "new",
echo         "showReuseMessage": true,
echo         "clear": false
echo       },
echo       "problemMatcher": [],
echo       "group": {
echo         "kind": "build",
echo         "isDefault": true
echo       }
echo     },
echo     {
echo       "name": "🔧 Debug Next.js Server",
echo       "type": "node",
echo       "request": "launch",
echo       "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
echo       "args": ["dev"],
echo       "cwd": "${workspaceFolder}",
echo       "env": {
echo         "NODE_ENV": "development"
echo       },
echo       "console": "integratedTerminal",
echo       "serverReadyAction": {
echo         "pattern": "- Local:.*?^(https?://.*?^)\\s",
echo         "uriFormat": "%%s",
echo         "action": "openExternally"
echo       },
echo       "skipFiles": ["^<node_internals^>/**"]
echo     },
echo     {
echo       "name": "📦 Install Dependencies",
echo       "type": "node-terminal",
echo       "request": "launch",
echo       "command": "npm install",
echo       "cwd": "${workspaceFolder}",
echo       "presentation": {
echo         "echo": true,
echo         "reveal": "always",
echo         "focus": true,
echo         "panel": "new"
echo       }
echo     }
echo   ]
echo }
) > .vscode\launch.json

REM Create basic settings.json
(
echo {
echo   "typescript.preferences.importModuleSpecifier": "relative",
echo   "typescript.suggest.autoImports": true,
echo   "editor.formatOnSave": true,
echo   "npm.packageManager": "npm"
echo }
) > .vscode\settings.json

REM Create extensions.json
(
echo {
echo   "recommendations": [
echo     "esbenp.prettier-vscode",
echo     "ms-vscode.vscode-typescript-next",
echo     "bradlc.vscode-tailwindcss",
echo     "ms-vscode.vscode-eslint"
echo   ]
echo }
) > .vscode\extensions.json

echo ✅ VS Code configuration created successfully!
echo.
echo 📁 Created files:
echo    .vscode\launch.json    - Debug configurations
echo    .vscode\settings.json  - Workspace settings
echo    .vscode\extensions.json - Recommended extensions
echo.
echo 🚀 To launch the app:
echo    1. Press F5 in VS Code
echo    2. Select '🤖 Launch Unitree G1 Camera Viewer'
echo.
echo 🔧 Next steps:
echo    1. Install recommended extensions when prompted
echo    2. Run 'npm install' if you haven't already
echo    3. Connect your Unitree G1 to the same WiFi network
echo.
pause
