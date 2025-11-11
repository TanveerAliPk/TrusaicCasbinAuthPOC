# Casbin RBAC/ABAC Hybrid Authorization POC

A full-stack proof of concept demonstrating hybrid Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC) using Casbin, Express.js backend, and Angular frontend.

## 🚀 Quick Start

### Fastest Way (Docker)
```bash
docker-compose up
```
Then open: `http://localhost:3000`

### Traditional Setup
```bash
npm install
npm run dev
```
Then open: `http://localhost:3000`

## 📋 Requirements

### For Simple Setup
- Node.js v18+
- MySQL 8.0+
- npm or pnpm

### For Docker Setup
- Docker Desktop

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `DOWNLOAD_INSTRUCTIONS.md` | How to download and run on your laptop |
| `QUICK_START.md` | 5-minute quick reference |
| `SETUP_GUIDE.md` | Comprehensive setup guide with troubleshooting |
| `DOCKER_SETUP.md` | Docker and Docker Compose setup |
| `ANGULAR_ARCHITECTURE.md` | Frontend architecture and code structure |

## 🏗️ Architecture

### Backend
- **Framework**: Express.js + tRPC
- **Authorization**: Casbin (RBAC/ABAC)
- **Database**: MySQL with Drizzle ORM
- **Authentication**: JWT-based

### Frontend
- **Framework**: Angular 20 (Standalone Components)
- **State Management**: RxJS Observables
- **Styling**: Tailwind CSS
- **Architecture**: Services → Models → Components

## 🎯 Features

### Policy Management
- Create, read, update, delete authorization policies
- Support for both RBAC and ABAC models
- Visual policy editor with real-time feedback

### Resource Management
- Define and classify resources
- Set security levels (public, internal, confidential, secret)
- Organize by department

### User Attributes
- Assign custom attributes to users
- Support for ABAC-based decisions
- Dynamic attribute management

### Access Control Testing
- Real-time access verification
- Interactive policy testing interface
- Immediate allow/deny feedback

## 📁 Project Structure

```
casbin-poc/
├── client/                      # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/         # Data interfaces
│   │   │   ├── services/       # API services
│   │   │   └── components/     # UI components
│   │   └── main.ts
│   └── index.html
├── server/                      # Express Backend
│   ├── casbin.ts               # Casbin setup
│   ├── db.ts                   # Database queries
│   ├── routers.ts              # tRPC routes
│   └── _core/                  # Core setup
├── drizzle/                     # Database schema
│   └── schema.ts
├── Dockerfile                   # Docker image
├── docker-compose.yml           # Docker Compose
└── package.json
```

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm build

# Start production server
npm start

# Database migrations
pnpm db:push

# View database UI
pnpm db:studio

# Type check
pnpm type-check

# Lint code
pnpm lint
```

## 🐳 Docker Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f app

# Rebuild images
docker-compose build --no-cache
```

## 🔐 Security Notes

⚠️ **For Production:**
- Change `JWT_SECRET` to a strong random string
- Use strong database passwords
- Enable HTTPS/SSL
- Implement rate limiting
- Validate all user inputs
- Use environment variables for secrets

## 🚨 Troubleshooting

### Port 3000 already in use
```bash
PORT=3001 npm run dev
```

### Database connection failed
- Ensure MySQL is running
- Check `DATABASE_URL` in `.env`
- Verify credentials

### Angular components not loading
- Check browser console (F12)
- Ensure backend is running
- Clear browser cache

### Module not found
```bash
npm install
```

For more help, see `SETUP_GUIDE.md`

## 📖 Learning Resources

- **Casbin**: https://casbin.org/
- **Angular**: https://angular.io/
- **Express**: https://expressjs.com/
- **tRPC**: https://trpc.io/
- **Drizzle ORM**: https://orm.drizzle.team/

## 🎓 Understanding the Code

### Architecture Overview
See `ANGULAR_ARCHITECTURE.md` for detailed explanation of:
- Models (Data Structures)
- Services (Business Logic)
- Components (UI)
- Data Flow
- Reactive Programming with RxJS

### Backend Flow
1. User request → Express middleware
2. tRPC procedure → Casbin enforcement
3. Database query → Response

### Frontend Flow
1. User interaction → Component
2. Component calls Service
3. Service calls Backend API
4. Response updates Observable
5. Component updates View

## 🤝 Contributing

To add new features:
1. Update database schema (if needed)
2. Add tRPC procedures
3. Create Angular components
4. Test thoroughly

See documentation for detailed guides.

## 📝 License

This project is provided as-is for educational and demonstration purposes.

## 🆘 Support

- Check `SETUP_GUIDE.md` for detailed help
- Review `ANGULAR_ARCHITECTURE.md` for code structure
- See `DOCKER_SETUP.md` for deployment
- Refer to `QUICK_START.md` for quick reference

---

**Ready to get started?** Read `DOWNLOAD_INSTRUCTIONS.md` for step-by-step setup instructions.
