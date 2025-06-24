# Port Forwarding Setup (Advanced)

## When to Use Port Forwarding
- ✅ Want to access from anywhere on internet
- ✅ Multiple people need access
- ✅ Don't want to run app locally
- ❌ Security risk (robot exposed to internet)
- ❌ More complex setup

## Router Configuration

### 1. Find Your Router's IP
\`\`\`bash
# Windows
ipconfig | findstr "Default Gateway"

# Mac/Linux
route -n get default
\`\`\`

### 2. Access Router Admin Panel
- Open browser to router IP (usually 192.168.1.1)
- Login with admin credentials

### 3. Configure Port Forwarding

#### Forward Robot Ports
- **Service Name**: Unitree G1 Cameras
- **External Port**: 8080
- **Internal IP**: [G1_IP_ADDRESS]
- **Internal Port**: 8080
- **Protocol**: TCP

#### Forward Additional Ports (if needed)
- **Port 8000**: Alternative camera port
- **Port 9000**: Control interface
- **Port 22**: SSH access (optional)

### 4. Configure Dynamic DNS (Optional)
If your ISP changes your IP address:
- Use services like No-IP, DynDNS, or Duck DNS
- Configure your router to update DNS automatically

## Security Considerations

### ⚠️ Important Security Notes
- **Robot exposed to internet** - potential security risk
- **Use strong passwords** on robot and router
- **Enable firewall rules** to limit access
- **Consider VPN** instead of direct port forwarding

### Recommended Security Measures
1. **Change default passwords** on G1 and router
2. **Enable WPA3** on WiFi network
3. **Use non-standard ports** (e.g., 18080 instead of 8080)
4. **Set up access logs** to monitor connections
5. **Regular firmware updates** for G1 and router

## VPN Alternative (More Secure)

### Setup VPN Server
1. **Router VPN**: Many routers support built-in VPN
2. **Raspberry Pi VPN**: Set up PiVPN on local network
3. **Cloud VPN**: Use services like Tailscale or ZeroTier

### Benefits of VPN
- ✅ Secure encrypted connection
- ✅ No ports exposed to internet
- ✅ Access entire local network
- ✅ Better than port forwarding

## Testing Port Forwarding

### External Access Test
1. **Find Public IP**: Visit whatismyipaddress.com
2. **Test Connection**: `http://[YOUR_PUBLIC_IP]:8080`
3. **Port Checker**: Use online port checking tools

### Common Issues
- **ISP Blocking**: Some ISPs block common ports
- **Double NAT**: Router behind another router
- **Firewall**: Router or ISP firewall blocking
- **Dynamic IP**: Public IP address changes

## Example Router Configurations

### Netgear
1. Advanced → Dynamic DNS / Port Forwarding
2. Add Custom Service
3. Enter port details

### Linksys
1. Smart Wi-Fi Tools → Port Range Forwarding
2. Add new forwarding rule

### TP-Link
1. Advanced → NAT Forwarding → Port Forwarding
2. Add forwarding rule

### ASUS
1. Adaptive QoS → Port Forwarding
2. Enable port forwarding
\`\`\`

Now let me update the main app to better handle both local and remote scenarios:
