# Cloud MCP Servers (Mac mini)

## Overview

The Mac mini can expose local MCP servers to Claude.ai via ngrok. This allows Claude.ai (web) to control tools on the Mac.

## Architecture

```
Mac mini:
  MCP Server (e.g., Playwright, Desktop Commander)
       ↓
  Supergateway (converts stdio → SSE on local port)
       ↓
  ngrok (exposes local port with permanent domain)
       ↓
  Claude.ai (connects via SSE)
```

## Current Status: DISABLED

As of January 14, 2026, cloud MCP servers have been disabled. Only the local Desktop Commander (via Claude Desktop app) is active.

## LaunchAgent Files

Located in `~/Library/LaunchAgents/_disabled/`:

| File | Purpose |
|:-----|:--------|
| `com.supergateway.playwright.plist` | Runs Playwright MCP via Supergateway on port 3010 |
| `com.supergateway.desktop-commander.plist` | Runs Desktop Commander via Supergateway on port 3011 |
| `com.ngrok.playwright.plist` | Exposes port 3010 via ngrok |
| `com.ngrok.desktop-commander.plist` | Exposes port 3011 via ngrok |

## ngrok Domains (Reserved)

| Server | Domain |
|:-------|:-------|
| Playwright | `kilometric-chocolaty-britney.ngrok-free.dev/sse` |
| Desktop Commander | `desktop-commander-mac.ngrok-free.dev/sse` |

---

## How to Re-enable Cloud MCP Servers

Run these commands to restore cloud access:

```bash
# Move plist files back to LaunchAgents
mv ~/Library/LaunchAgents/_disabled/com.supergateway.*.plist ~/Library/LaunchAgents/
mv ~/Library/LaunchAgents/_disabled/com.ngrok.*.plist ~/Library/LaunchAgents/

# Load the LaunchAgents
launchctl load ~/Library/LaunchAgents/com.supergateway.playwright.plist
launchctl load ~/Library/LaunchAgents/com.supergateway.desktop-commander.plist
launchctl load ~/Library/LaunchAgents/com.ngrok.playwright.plist
launchctl load ~/Library/LaunchAgents/com.ngrok.desktop-commander.plist

# Verify they're running
launchctl list | grep -E "(supergateway|ngrok)"
```

Then add the connectors in Claude.ai:
1. Go to claude.ai → Settings → Connectors
2. Add custom connector with ngrok URL (must end with `/sse`)

---

## How to Disable Cloud MCP Servers

Run these commands to disable cloud access:

```bash
# Unload the LaunchAgents
launchctl unload ~/Library/LaunchAgents/com.supergateway.playwright.plist
launchctl unload ~/Library/LaunchAgents/com.supergateway.desktop-commander.plist
launchctl unload ~/Library/LaunchAgents/com.ngrok.playwright.plist
launchctl unload ~/Library/LaunchAgents/com.ngrok.desktop-commander.plist

# Move plist files to _disabled folder
mkdir -p ~/Library/LaunchAgents/_disabled
mv ~/Library/LaunchAgents/com.supergateway.*.plist ~/Library/LaunchAgents/_disabled/
mv ~/Library/LaunchAgents/com.ngrok.*.plist ~/Library/LaunchAgents/_disabled/

# Verify nothing is running
ps aux | grep -E "(supergateway|ngrok|playwright)" | grep -v grep
```

---

## Troubleshooting

### Check if services are running
```bash
launchctl list | grep -E "(supergateway|ngrok)"
ps aux | grep -E "(supergateway|ngrok|playwright)" | grep -v grep
```

### Check ports
```bash
lsof -i :3010  # Playwright Supergateway
lsof -i :3011  # Desktop Commander Supergateway
```

### View logs
```bash
tail -f ~/Library/Logs/supergateway-playwright.log
tail -f ~/Library/Logs/ngrok-playwright.log
```

### Check ngrok tunnels
```bash
curl -s http://localhost:4040/api/tunnels | jq '.tunnels[].public_url'
```
