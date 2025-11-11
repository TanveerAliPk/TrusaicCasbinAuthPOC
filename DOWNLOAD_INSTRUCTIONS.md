# How to Download and Run Casbin POC on Your Laptop

## Step 1: Download the Project Files

### Option A: Using Git (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd casbin-poc
```

### Option B: Download as ZIP
1. Go to the repository page
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file to your desired location
4. Open terminal/command prompt in the extracted folder

## Step 2: Choose Your Setup Method

### Method 1: Simple Setup (Recommended for Beginners)

**Requirements:**
- Node.js v18+ (https://nodejs.org/)
- MySQL 8.0+ (https://dev.mysql.com/downloads/mysql/)

**Steps:**

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file in project root with:
   ```
   DATABASE_URL=mysql://root:password@localhost:3306/casbin_poc
   JWT_SECRET=your-secret-key
   VITE_APP_TITLE=Casbin RBAC/ABAC POC
   ```

3. Start MySQL server

4. Run the application:
   ```bash
   npm run dev
   ```

5. Open browser: `http://localhost:3000`

---

### Method 2: Docker Setup (Recommended for Advanced Users)

**Requirements:**
- Docker Desktop (https://www.docker.com/products/docker-desktop/)

**Steps:**

1. Run with Docker Compose:
   ```bash
   docker-compose up
   ```

2. Open browser: `http://localhost:3000`

That's it! Docker handles everything.

---

### Method 3: Quick Start (5 Minutes)

See `QUICK_START.md` for minimal setup instructions.

---

## Full Documentation

- **Setup Guide**: `SETUP_GUIDE.md` - Detailed setup and troubleshooting
- **Docker Guide**: `DOCKER_SETUP.md` - Docker deployment instructions
- **Architecture**: `ANGULAR_ARCHITECTURE.md` - Frontend architecture overview
- **Quick Start**: `QUICK_START.md` - Minimal 5-minute setup

---

## Troubleshooting

### "Command not found: npm"
- Install Node.js from https://nodejs.org/

### "Cannot connect to database"
- Make sure MySQL is running
- Check DATABASE_URL in `.env` file

### "Port 3000 already in use"
- Use different port: `PORT=3001 npm run dev`

### "Module not found"
- Run: `npm install`

---

## What's Next?

1. Read `SETUP_GUIDE.md` for detailed instructions
2. Explore the application features
3. Check `ANGULAR_ARCHITECTURE.md` to understand the code
4. Modify and customize for your needs

---

## Support

For detailed help, see:
- `SETUP_GUIDE.md` - Comprehensive setup guide
- `QUICK_START.md` - Quick reference
- `DOCKER_SETUP.md` - Docker deployment
- `ANGULAR_ARCHITECTURE.md` - Code structure

Happy coding! 🚀
