#!/bin/bash

echo "🔧 Setting up VS Code configuration for Unitree G1 Camera Viewer..."

# Create .vscode directory if it doesn't exist
mkdir -p .vscode

# Create launch.json
cat > .vscode/launch.json << 'EOF'
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
      },
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new",
        "showReuseMessage": true,
        "clear": false
      },
      "problemMatcher": [],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "name": "🔧 Debug Next.js Server",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}",
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal",
      "serverReadyAction": {
        "pattern": "- Local:.*?(https?://.*?)\\s",
        "uriFormat": "%s",
        "action": "openExternally"
      },
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "🌐 Launch with Browser Debug",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "cwd": "${workspaceFolder}",
      "env": {
        "NODE_ENV": "development"
      },
      "postDebugTask": "open-browser",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "name": "🚀 Production Build & Start",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run build && npm start",
      "cwd": "${workspaceFolder}",
      "env": {
        "NODE_ENV": "production"
      },
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "name": "📦 Install Dependencies",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm install",
      "cwd": "${workspaceFolder}",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": true,
        "panel": "new"
      }
    },
    {
      "name": "🧹 Clean & Reinstall",
      "type": "node-terminal",
      "request": "launch",
      "command": "rm -rf node_modules package-lock.json && npm install",
      "cwd": "${workspaceFolder}",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": true,
        "panel": "new"
      }
    }
  ],
  "compounds": [
    {
      "name": "🎯 Full Stack Debug",
      "configurations": ["🔧 Debug Next.js Server"],
      "stopAll": true,
      "presentation": {
        "hidden": false,
        "group": "debug",
        "order": 1
      }
    }
  ]
}
EOF

# Create tasks.json
cat > .vscode/tasks.json << 'EOF'
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "open-browser",
      "type": "shell",
      "command": "sleep 3 && open http://localhost:3000",
      "group": "build",
      "presentation": {
        "echo": false,
        "reveal": "never",
        "focus": false,
        "panel": "shared",
        "showReuseMessage": false,
        "clear": false
      },
      "options": {
        "shell": {
          "executable": "/bin/bash",
          "args": ["-c"]
        }
      },
      "windows": {
        "command": "timeout 3 && start http://localhost:3000",
        "options": {
          "shell": {
            "executable": "cmd.exe",
            "args": ["/c"]
          }
        }
      },
      "problemMatcher": []
    },
    {
      "label": "dev",
      "type": "npm",
      "script": "dev",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "build",
      "type": "npm",
      "script": "build",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "start",
      "type": "npm",
      "script": "start",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      },
      "problemMatcher": []
    }
  ]
}
EOF

# Create settings.json
cat > .vscode/settings.json << 'EOF'
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\$$([^)]*)\$$", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\$$([^)]*)\$$", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true,
    "**/build": true
  },
  "files.exclude": {
    "**/.next": true,
    "**/node_modules": true
  },
  "npm.packageManager": "npm",
  "terminal.integrated.defaultProfile.windows": "Command Prompt",
  "debug.terminal.clearBeforeReusing": true,
  "debug.console.fontSize": 14,
  "debug.console.lineHeight": 1.2
}
EOF

# Create extensions.json
cat > .vscode/extensions.json << 'EOF'
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-eslint",
    "usernamehw.errorlens",
    "ms-vscode.vscode-npm-script",
    "gruntfuggly.todo-tree"
  ],
  "unwantedRecommendations": []
}
EOF

echo "✅ VS Code configuration created successfully!"
echo ""
echo "📁 Created files:"
echo "   .vscode/launch.json    - Debug configurations"
echo "   .vscode/tasks.json     - Build tasks"
echo "   .vscode/settings.json  - Workspace settings"
echo "   .vscode/extensions.json - Recommended extensions"
echo ""
echo "🚀 To launch the app:"
echo "   1. Press F5 in VS Code"
echo "   2. Select '🤖 Launch Unitree G1 Camera Viewer'"
echo "   3. Or use Ctrl+Shift+D to open Debug panel"
echo ""
echo "🔧 Next steps:"
echo "   1. Install recommended extensions when prompted"
echo "   2. Run 'npm install' if you haven't already"
echo "   3. Connect your Unitree G1 to the same WiFi network"
echo ""
