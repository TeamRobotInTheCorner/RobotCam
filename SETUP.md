# Unitree G1 Camera Viewer Setup Guide

## Quick Start

1. **Clone and Install**
\`\`\`bash
git clone https://github.com/yourusername/unitree-g1-camera-viewer.git
cd unitree-g1-camera-viewer
npm install
\`\`\`

2. **Start Development Server**
\`\`\`bash
npm run dev
\`\`\`

3. **Configure Robot Connection**
   - Open http://localhost:3000
   - Enter your Unitree G1's IP address
   - Click "Connect"

## Robot Configuration

### Network Setup
1. Connect your Unitree G1 to your WiFi network
2. Note the assigned IP address (check robot display or network settings)
3. Ensure your computer is on the same network

### Camera Service
The robot should have a camera streaming service running. If not available, you may need to:
1. SSH into the robot (if supported)
2. Start the camera streaming service
3. Configure camera endpoints

### Default Camera Endpoints
\`\`\`
Head Front: http://[ROBOT_IP]:8080/camera/head_front/stream
Head Left:  http://[ROBOT_IP]:8080/camera/head_left/stream  
Head Right: http://[ROBOT_IP]:8080/camera/head_right/stream
Depth:      http://[ROBOT_IP]:8080/camera/depth/stream
\`\`\`

## Deployment Options

### Local Network Deployment
\`\`\`bash
npm run build
npm start
\`\`\`
Access via http://[YOUR_IP]:3000

### Docker Deployment
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Cloud Deployment
Deploy to Vercel, Netlify, or your preferred hosting platform.

## Customization

### Adding New Cameras
Edit `app/page.tsx` and add to the cameras array:
\`\`\`typescript
{
  id: "new_camera",
  name: "New Camera",
  url: "",
  status: "disconnected",
  resolution: "1920x1080", 
  fps: 30
}
\`\`\`

### Styling
Modify Tailwind classes in components or add custom CSS to `app/globals.css`.

## Security Considerations

- Use HTTPS in production
- Implement authentication if needed
- Restrict network access to authorized users
- Keep robot firmware updated
