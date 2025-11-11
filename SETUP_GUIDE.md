# Casbin RBAC/ABAC POC - Local Setup Guide

This guide will help you download and run the Casbin POC application on your laptop.

## Prerequisites

Before you start, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm or pnpm** (Node package manager)
   - npm comes with Node.js
   - Or install pnpm: `npm install -g pnpm`
   - Verify: `npm --version` or `pnpm --version`

3. **Git** (for cloning the repository)
   - Download from: https://git-scm.com/
   - Verify: `git --version`

4. **MySQL** (for database)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use Docker: `docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0`

## Step 1: Download the Application

### Option A: Clone from Repository (if available)
```bash
git clone <repository-url>
cd casbin-poc
```

### Option B: Download as ZIP
1. Download the project files as ZIP
2. Extract to your desired location
3. Open terminal/command prompt in the extracted folder

## Step 2: Install Dependencies

Navigate to the project directory and install all required packages:

```bash
# Using npm
npm install

# Or using pnpm (faster)
pnpm install
```

This will install:
- Backend dependencies (Express, Casbin, Drizzle ORM, etc.)
- Frontend dependencies (Angular, RxJS, etc.)

## Step 3: Configure Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database Configuration
DATABASE_URL=mysql://root:password@localhost:3306/casbin_poc

# JWT Configuration
JWT_SECRET=your-secret-key-here-change-this

# OAuth Configuration (if using Manus OAuth)
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Application Configuration
VITE_APP_TITLE=Casbin RBAC/ABAC POC
VITE_APP_LOGO=C

# Owner Information
OWNER_NAME=Admin
OWNER_OPEN_ID=admin-id
```

### For Local Development (Simpler Setup)

If you want to skip OAuth and use local authentication:

```env
# Database Configuration
DATABASE_URL=mysql://root:password@localhost:3306/casbin_poc

# JWT Configuration
JWT_SECRET=your-local-secret-key

# Application Configuration
VITE_APP_TITLE=Casbin RBAC/ABAC POC
VITE_APP_LOGO=C
```

## Step 4: Set Up the Database

### Option A: Using MySQL Locally

1. **Start MySQL Server**
   ```bash
   # On Windows
   mysql -u root -p

   # On macOS/Linux
   sudo mysql -u root
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE casbin_poc;
   USE casbin_poc;
   ```

3. **Run Migrations**
   ```bash
   pnpm db:push
   ```

### Option B: Using Docker

```bash
# Start MySQL in Docker
docker run --name casbin-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=casbin_poc \
  -p 3306:3306 \
  -d mysql:8.0

# Wait for MySQL to start (about 10 seconds)
sleep 10

# Run migrations
pnpm db:push
```

## Step 5: Run the Application

### Development Mode

```bash
# Start both backend and frontend in development mode
pnpm dev
```

This will:
- Start the Express backend on `http://localhost:3000`
- Start the Angular frontend (also served on port 3000)
- Watch for file changes and auto-reload

### Production Build

```bash
# Build frontend
pnpm build

# Start production server
pnpm start
```

## Step 6: Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

You should see the Casbin POC landing page.

## Project Structure

```
casbin-poc/
├── client/                  # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/     # Data interfaces
│   │   │   ├── services/   # API services
│   │   │   └── components/ # UI components
│   │   └── main.ts         # Bootstrap
│   └── index.html
├── server/                  # Express Backend
│   ├── casbin.ts           # Casbin integration
│   ├── db.ts               # Database queries
│   ├── routers.ts          # tRPC routes
│   └── _core/              # Core setup
├── drizzle/                # Database schema
│   └── schema.ts
└── package.json
```

## Available Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Database migrations
pnpm db:push

# View database
pnpm db:studio

# Lint code
pnpm lint

# Type check
pnpm type-check
```

## Troubleshooting

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: Database connection failed

**Check:**
1. MySQL is running: `mysql -u root -p`
2. Database exists: `SHOW DATABASES;`
3. DATABASE_URL in `.env` is correct
4. Credentials match your MySQL setup

### Issue: Port 3000 already in use

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or use different port
PORT=3001 pnpm dev
```

### Issue: Angular components not loading

**Check:**
1. Browser console for errors (F12)
2. Network tab to see API calls
3. Ensure backend is running on port 3000
4. Check that services are properly injected

### Issue: "EACCES: permission denied"

**Solution:**
```bash
# Use sudo if needed
sudo pnpm install
sudo pnpm dev

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

## Testing the Application

### 1. Test Backend API

```bash
# Check if backend is running
curl http://localhost:3000/api/trpc/auth.me

# Should return user info or null
```

### 2. Test Frontend

1. Open `http://localhost:3000` in browser
2. You should see the landing page
3. Click "Sign In" or "Get Started"
4. After authentication, you should see the dashboard

### 3. Test Casbin Policies

1. Go to Dashboard → Policies tab
2. Add a test policy:
   - Subject: `user1`
   - Object: `resource1`
   - Action: `read`
   - Effect: `allow`
3. Click "Add Policy"
4. Go to Access Check tab
5. Enter the same values and click "Check Access"
6. Should show "Access Allowed"

## Development Workflow

### Adding a New Feature

1. **Update Database Schema** (if needed)
   ```typescript
   // Edit drizzle/schema.ts
   export const newTable = mysqlTable("newTable", { ... });
   ```

2. **Run Migration**
   ```bash
   pnpm db:push
   ```

3. **Add Database Query Helper** (in server/db.ts)
   ```typescript
   export async function getNewData() {
     const db = await getDb();
     return db.select().from(newTable);
   }
   ```

4. **Add tRPC Procedure** (in server/routers.ts)
   ```typescript
   newFeature: router({
     getData: publicProcedure.query(async () => {
       const { getNewData } = await import("./db");
       return await getNewData();
     })
   })
   ```

5. **Create Angular Component** (in client/src/app/components/)
   ```typescript
   // Create new component
   @Component({ ... })
   export class NewFeatureComponent { ... }
   ```

6. **Add to Dashboard** (in dashboard.component.ts)
   ```typescript
   // Import component
   // Add tab
   // Add conditional rendering
   ```

## Performance Tips

1. **Use pnpm instead of npm** - Faster installation
2. **Enable caching** - `pnpm install --frozen-lockfile`
3. **Use production build** - `pnpm build && pnpm start`
4. **Monitor database** - Use `pnpm db:studio` to inspect data

## Security Considerations

⚠️ **Important for Production:**

1. **Change JWT_SECRET** - Use a strong, random string
2. **Use environment variables** - Never commit `.env` file
3. **Enable HTTPS** - Use SSL certificates in production
4. **Validate inputs** - All user inputs should be validated
5. **Use strong database passwords** - Not "root" or "password"
6. **Implement rate limiting** - Prevent brute force attacks
7. **Add CORS configuration** - Restrict allowed origins

## Next Steps

1. **Explore the codebase** - Read `ANGULAR_ARCHITECTURE.md`
2. **Understand Casbin** - Visit https://casbin.org/
3. **Learn Express & tRPC** - Check server/routers.ts
4. **Customize policies** - Modify policy model in server/casbin.ts
5. **Deploy** - Use Docker, Heroku, AWS, or your preferred platform

## Getting Help

- **Documentation**: Check `ANGULAR_ARCHITECTURE.md` and `README.md`
- **Casbin Docs**: https://casbin.org/docs/
- **Angular Docs**: https://angular.io/docs
- **Express Docs**: https://expressjs.com/
- **tRPC Docs**: https://trpc.io/

## Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `pnpm install` |
| Start dev server | `pnpm dev` |
| Build for production | `pnpm build` |
| Run production | `pnpm start` |
| Database migration | `pnpm db:push` |
| View database UI | `pnpm db:studio` |
| Type check | `pnpm type-check` |
| Lint code | `pnpm lint` |

---

**Ready to go!** Follow the steps above and you should have the Casbin POC running on your laptop. If you encounter any issues, refer to the Troubleshooting section or check the documentation files.
