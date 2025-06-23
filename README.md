# Unitree G1 Camera Viewer

A web-based interface for viewing real-time camera feeds from the Unitree G1 Humanoid robot.

## Features

- 🎥 Real-time camera feed viewing
- 🤖 Support for multiple Unitree G1 cameras (Head Front, Left, Right, Depth)
- 🌐 Web-based interface accessible from any device
- 📱 Responsive design for desktop and mobile
- ⚡ Real-time connection status monitoring
- 🔧 Easy robot IP configuration

## Supported Cameras

- **Head Front Camera**: Primary forward-facing camera (1920x1080 @ 30fps)
- **Head Left Camera**: Left side camera for peripheral vision (1920x1080 @ 30fps)  
- **Head Right Camera**: Right side camera for peripheral vision (1920x1080 @ 30fps)
- **Depth Camera**: Depth sensing camera for spatial awareness (640x480 @ 15fps)

## Prerequisites

- Node.js 18+ installed
- Unitree G1 robot connected to the same network
- Robot's camera streaming service enabled

## Installation

1. Clone this repository:
\`\`\`bash
git clone https://github.com/yourusername/unitree-g1-camera-viewer.git
cd unitree-g1-camera-viewer
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to `http://localhost:3000`

## Configuration

### Robot Setup

1. Ensure your Unitree G1 is connected to your network
2. Note the robot's IP address (usually found in robot settings)
3. Verify the camera streaming service is running on the robot

### Application Setup

1. Enter your robot's IP address in the connection panel
2. Click "Connect" to establish connection
3. Camera feeds will automatically appear once connected

## Usage

1. **Connect to Robot**: Enter the robot's IP address and click connect
2. **View Cameras**: All available camera feeds will be displayed in a grid layout
3. **Toggle Feeds**: Use the show/hide buttons to control individual camera displays
4. **Monitor Status**: Connection and camera status are displayed in real-time

## API Endpoints

The application expects the following camera stream endpoints on the robot:

- `http://[ROBOT_IP]:8080/camera/head_front/stream`
- `http://[ROBOT_IP]:8080/camera/head_left/stream`
- `http://[ROBOT_IP]:8080/camera/head_right/stream`
- `http://[ROBOT_IP]:8080/camera/depth/stream`

## Development

### Project Structure

\`\`\`
├── app/
│   ├── page.tsx          # Main camera viewer component
│   ├── layout.tsx        # App layout and metadata
│   └── globals.css       # Global styles
├── components/ui/        # Reusable UI components
├── lib/                  # Utility functions
└── public/              # Static assets
\`\`\`

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Troubleshooting

### Common Issues

1. **Cannot connect to robot**
   - Verify robot IP address is correct
   - Ensure robot and computer are on same network
   - Check if robot's camera service is running

2. **Camera feeds not displaying**
   - Verify camera endpoints are accessible
   - Check robot camera permissions
   - Ensure sufficient network bandwidth

3. **Poor video quality**
   - Check network connection stability
   - Verify robot camera settings
   - Consider adjusting stream quality settings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Unitree Robotics for the G1 Humanoid platform
- Next.js and React communities for the excellent frameworks
- shadcn/ui for the beautiful UI components

## Support

For support and questions:
- Open an issue on GitHub
- Check the [Unitree G1 documentation](https://www.unitree.com/)
- Contact the development team

---

**Note**: This is a community-developed tool and is not officially affiliated with Unitree Robotics.
