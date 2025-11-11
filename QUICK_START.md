# Quick Start - 5 Minutes

## For the Impatient

### 1. Install Node.js
Download from https://nodejs.org/ (v18+)

### 2. Clone/Download Project
```bash
git clone <repo-url>
cd casbin-poc
```

### 3. Install & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Open Browser
```
http://localhost:3000
```

Done! 🎉

---

## If You Get Errors

### "Cannot find module"
```bash
npm install
```

### "Port 3000 in use"
```bash
PORT=3001 npm run dev
```

### "Database connection failed"
- Make sure MySQL is running
- Check `.env` file has correct DATABASE_URL

### "Angular not found"
```bash
npm install @angular/core @angular/common @angular/platform-browser @angular/platform-browser-dynamic @angular/forms @angular/router @angular/animations
```

---

## What's Running?

- **Backend**: Express.js + Casbin on port 3000
- **Frontend**: Angular on port 3000 (same server)
- **Database**: MySQL (must be running separately)

---

## Next: Read Full Setup Guide

See `SETUP_GUIDE.md` for detailed instructions and troubleshooting.
