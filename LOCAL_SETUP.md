# Local Setup Guide (Recommended)

## Why Run Locally?
- ✅ No port forwarding needed
- ✅ Better security (stays on local network)
- ✅ Lower latency
- ✅ No internet dependency
- ✅ Direct robot communication

## Quick Local Setup

### 1. Download the Code
\`\`\`bash
# Clone or download the repository
git clone https://github.com/yourusername/unitree-g1-camera-viewer.git
cd unitree-g1-camera-viewer
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

### 4. Access the App
- Open your browser to: `http://localhost:3000`
- Or access from other devices on your network: `http://[YOUR_LAPTOP_IP]:3000`

## Network Setup

### Connect G1 to WiFi
1. Access G1's network settings
2. Connect to your home/office WiFi
3. Note the IP address (e.g., 192.168.1.100)

### Connect Your Laptop
1. Connect laptop to the same WiFi network
2. Open the app at `localhost:3000`
3. Enter G1's IP address
4. Click "Connect"

## Finding Your G1's IP Address

### Method 1: Robot Display
- Check the G1's screen/interface for network info
- Look for "Network Settings" or "WiFi Status"

### Method 2: Router Admin Panel
- Access your router (usually 192.168.1.1 or 192.168.0.1)
- Look for "Connected Devices" or "DHCP Clients"
- Find "Unitree" or similar device name

### Method 3: Network Scanner
\`\`\`bash
# On Windows
arp -a

# On Mac/Linux
nmap -sn 192.168.1.0/24
# or
arp -a
\`\`\`

## Troubleshooting Local Setup

### Can't Connect to Robot
1. **Ping Test**: `ping [G1_IP_ADDRESS]`
2. **Port Test**: `telnet [G1_IP_ADDRESS] 8080`
3. **Firewall**: Disable laptop firewall temporarily
4. **Network**: Ensure both on same subnet

### Camera Streams Not Working
1. **Check G1 Camera Service**: Ensure streaming service is running
2. **Try Different Ports**: Common ports: 8080, 8000, 9000
3. **Browser Console**: Check for error messages
4. **Direct Stream Test**: Try `http://[G1_IP]:8080/camera/front/stream` in browser

## Production Build (Optional)
\`\`\`bash
npm run build
npm start
\`\`\`
Access at `http://localhost:3000`
