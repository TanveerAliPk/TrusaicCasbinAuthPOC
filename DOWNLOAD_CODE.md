# How to Download Casbin POC Code

There are several ways to download the complete Casbin POC code to your laptop. Choose the method that works best for you.

---

## Method 1: Download as ZIP File (Easiest)

### Steps:

1. **Go to the Management UI**
   - Click the "Code" button in the Management UI (right panel)
   - Or use the project card in the Chatbox

2. **Download All Files**
   - Click "Download all files" button
   - A ZIP file will be downloaded to your Downloads folder

3. **Extract the ZIP**
   - Right-click the ZIP file
   - Select "Extract All" (Windows) or "Extract" (Mac/Linux)
   - Choose your desired location

4. **Open Terminal/Command Prompt**
   ```bash
   cd path/to/extracted/casbin-poc
   ```

5. **Install and Run**
   ```bash
   npm install
   npm run dev
   ```

6. **Open Browser**
   ```
   http://localhost:3000
   ```

---

## Method 2: Clone from Git Repository

### Prerequisites:
- Git installed (https://git-scm.com/)

### Steps:

1. **Get the Repository URL**
   - Ask for the Git repository URL if you have one
   - Or use the GitHub/GitLab link if available

2. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd casbin-poc
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   ```
   http://localhost:3000
   ```

---

## Method 3: Manual File Download from Management UI

### Steps:

1. **Open Management UI**
   - Click the "Code" button in the right panel

2. **Browse Files**
   - View the file tree structure
   - Download individual files if needed

3. **Download Specific Folders**
   - Download client folder
   - Download server folder
   - Download drizzle folder
   - Download other necessary files

4. **Organize Locally**
   - Create a folder structure matching the project
   - Place downloaded files in correct locations

---

## Method 4: Copy from Manus Project

### If You Have Access to Manus Platform:

1. **Access the Project**
   - Log into Manus platform
   - Navigate to casbin-poc project

2. **Export Project**
   - Use the export feature if available
   - Download as ZIP or clone

3. **Extract and Use**
   - Follow the extraction steps above

---

## What You'll Get

After downloading, your folder structure will look like:

```
casbin-poc/
├── client/                    # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── components/
│   │   └── main.ts
│   └── index.html
├── server/                    # Express Backend
│   ├── casbin.ts
│   ├── db.ts
│   ├── routers.ts
│   └── _core/
├── drizzle/                   # Database Schema
│   └── schema.ts
├── Dockerfile                 # Docker Image
├── docker-compose.yml         # Docker Compose
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript Config
├── vite.config.ts             # Vite Config
├── SETUP_GUIDE.md             # Setup Instructions
├── QUICK_START.md             # Quick Reference
├── DOWNLOAD_INSTRUCTIONS.md   # Download Guide
├── DOCKER_SETUP.md            # Docker Guide
├── ANGULAR_ARCHITECTURE.md    # Architecture Guide
├── TEST_PROCEDURES.md         # Testing Guide
└── README_LOCAL.md            # Local README
```

---

## After Downloading

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Create `.env` file in project root:
```env
DATABASE_URL=mysql://root:password@localhost:3306/casbin_poc
JWT_SECRET=your-secret-key
VITE_APP_TITLE=Casbin RBAC/ABAC POC
```

### 3. Start MySQL
Make sure MySQL is running on your system

### 4. Run the Application
```bash
npm run dev
```

### 5. Open in Browser
```
http://localhost:3000
```

---

## Troubleshooting Download

### Issue: ZIP file won't extract
- **Solution**: Use 7-Zip (https://www.7-zip.org/) or WinRAR
- Try downloading again if file is corrupted

### Issue: Can't find download button
- **Solution**: 
  - Look for "Code" button in Management UI
  - Or check the project card in Chatbox
  - Click "Download all files"

### Issue: Missing files after download
- **Solution**:
  - Check if all files extracted properly
  - Try downloading again
  - Verify folder structure matches above

### Issue: Git clone not working
- **Solution**:
  - Verify Git is installed: `git --version`
  - Check repository URL is correct
  - Ensure you have access to the repository

---

## Recommended Setup Method

**For Most Users**: Use **Method 1 (ZIP Download)**
- Easiest and fastest
- No Git knowledge required
- Works on all systems

**For Developers**: Use **Method 2 (Git Clone)**
- Easy to update with `git pull`
- Track changes with Git
- Collaborate with team

**For Advanced Users**: Use **Method 4 (Manus Export)**
- Direct from platform
- Integrated with Manus
- Automatic updates

---

## Next Steps After Download

1. **Read SETUP_GUIDE.md** for detailed setup instructions
2. **Follow QUICK_START.md** for 5-minute setup
3. **Use TEST_PROCEDURES.md** to test the application
4. **Check ANGULAR_ARCHITECTURE.md** to understand the code
5. **Use DOCKER_SETUP.md** for Docker deployment

---

## File Sizes

- **Total Project**: ~500MB (with node_modules)
- **Without node_modules**: ~50MB
- **ZIP File**: ~30MB

---

## System Requirements

After downloading, ensure you have:
- **Node.js**: v18 or higher
- **npm**: 10.x or higher
- **MySQL**: 8.0 or higher
- **Disk Space**: 1GB minimum
- **RAM**: 2GB minimum

---

## Support

If you have issues downloading:
1. Check your internet connection
2. Try a different download method
3. Verify you have enough disk space
4. Check the SETUP_GUIDE.md for troubleshooting
5. Review DOWNLOAD_INSTRUCTIONS.md for detailed steps

---

## Quick Reference

| Method | Ease | Speed | Requirements |
|--------|------|-------|--------------|
| ZIP Download | ⭐⭐⭐⭐⭐ | Fast | None |
| Git Clone | ⭐⭐⭐⭐ | Fast | Git |
| Manual Download | ⭐⭐⭐ | Slow | Browser |
| Manus Export | ⭐⭐⭐⭐ | Medium | Manus Access |

---

**Ready to download?** Choose your preferred method above and follow the steps. If you need help, refer to the documentation files included in the project.
