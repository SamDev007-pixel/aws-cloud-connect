# AWS Cloud Connect - Production Deployment Guide

A real-time chat and live broadcast system with room management, user approval, and message moderation.

## Quick Deploy

### Step 1: Deploy Backend to Render

1. Go to [Render.com](https://render.com) and create a new **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add these Environment Variables:
   - `MONGO_URI` = Your MongoDB connection string (from MongoDB Atlas)
   - `PORT` = 5001
5. Click **Deploy**

Once deployed, you'll get a URL like: `https://your-app.onrender.com`

### Step 2: Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com) and import your GitHub repo
2. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variable:
   - `VITE_SERVER_URL` = Your Render backend URL (e.g., `https://your-app.onrender.com`)
4. Click **Deploy**

Your app will be live at: `https://your-project.vercel.app`

---

## Configuration Required

### Update Client Server URL

After deploying to Render, update the fallback URL in these files:

**Files to update:**
- `client/src/pages/ChatRoom.jsx`
- `client/src/pages/SuperAdmin.jsx`
- `client/src/pages/Admin.jsx`
- `client/src/pages/Broadcast.jsx`

Find this line in each file:
```
javascript
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "https://aws-cloud-connect-server.onrender.com";
```

Replace `https://aws-cloud-connect-server.onrender.com` with your actual Render URL.

---

## Features

- 🔴 **Live Broadcast** - Real-time message broadcasting
- 👥 **User Management** - Super Admin can create rooms and manage users
- ✅ **Approval System** - Users need approval before participating
- 🛡️ **Moderation** - Admin can approve or delete messages
- 💬 **Chat Room** - Real-time chat with room codes

---

## Usage Flow

1. **Super Admin** goes to `/super-admin`, creates a room
2. Share the room code with users
3. **Users** go to `/chat`, enter username and room code, wait for approval
4. **Super Admin** approves users from the Super Admin panel
5. **Users** can now send messages (they go to pending)
6. **Admin** goes to `/admin`, enters room code, moderates messages
7. **Broadcast** viewers at `/broadcast` see only approved messages

---

## Environment Variables

### Server (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| MONGO_URI | MongoDB connection string | Yes |
| PORT | Server port (default: 5001) | No |

### Client (Vercel)
| Variable | Description | Required |
|----------|-------------|----------|
| VITE_SERVER_URL | Your Render backend URL | Yes |

---

## Troubleshooting

### If Socket.io not connecting:
1. Check that your Render backend is running
2. Verify VITE_SERVER_URL is correct in Vercel
3. Check browser console for CORS errors

### If MongoDB connection fails:
1. Verify MONGO_URI is correct
2. Check MongoDB Atlas network settings (allow all IPs)
3. Check Render logs for connection errors

### If pages not loading:
1. Verify vercel.json rewrite rules
2. Check that all routes work locally first
