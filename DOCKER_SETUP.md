# Docker Setup Guide

Run the Casbin POC using Docker - no need to install Node.js or MySQL locally!

## Prerequisites

- Docker installed: https://www.docker.com/products/docker-desktop
- Docker Compose (usually included with Docker Desktop)

## Quick Start with Docker

### 1. Create docker-compose.yml

In the project root, create a file named `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: casbin-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: casbin_poc
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10

  app:
    build: .
    container_name: casbin-app
    environment:
      DATABASE_URL: mysql://root:root@mysql:3306/casbin_poc
      JWT_SECRET: your-secret-key
      VITE_APP_TITLE: Casbin RBAC/ABAC POC
      NODE_ENV: development
    ports:
      - "3000:3000"
    depends_on:
      mysql:
        condition: service_healthy
    volumes:
      - .:/app
      - /app/node_modules

volumes:
  mysql_data:
```

### 2. Create Dockerfile

Create a file named `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Expose port
EXPOSE 3000

# Run migrations and start app
CMD ["sh", "-c", "pnpm db:push && pnpm dev"]
```

### 3. Run with Docker Compose

```bash
# Start all services
docker-compose up

# Or run in background
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### 4. Access Application

Open browser: `http://localhost:3000`

---

## Docker Commands Reference

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

# Access MySQL
docker-compose exec mysql mysql -u root -proot casbin_poc

# Run database migrations
docker-compose exec app pnpm db:push

# View database UI
docker-compose exec app pnpm db:studio
```

---

## Troubleshooting Docker

### Port already in use

```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use 3001 instead of 3000
```

### MySQL not starting

```bash
# Check MySQL logs
docker-compose logs mysql

# Restart MySQL
docker-compose restart mysql
```

### App not connecting to database

```bash
# Verify MySQL is healthy
docker-compose ps

# Check DATABASE_URL in docker-compose.yml
# Should be: mysql://root:root@mysql:3306/casbin_poc
```

### Clear everything and start fresh

```bash
# Stop and remove all containers and volumes
docker-compose down -v

# Rebuild and start
docker-compose up --build
```

---

## Production Deployment

For production, use a more robust configuration:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: casbin_poc
    volumes:
      - mysql_data:/var/lib/mysql
    restart: always

  app:
    build: .
    environment:
      DATABASE_URL: mysql://root:${DB_PASSWORD}@mysql:3306/casbin_poc
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    ports:
      - "80:3000"
    depends_on:
      - mysql
    restart: always

volumes:
  mysql_data:
```

Create `.env` file:
```env
DB_PASSWORD=strong-password-here
JWT_SECRET=strong-secret-here
```

---

## Next Steps

1. Modify `docker-compose.yml` for your needs
2. Set strong passwords in `.env`
3. Deploy to cloud (AWS, Azure, DigitalOcean, etc.)
4. Set up SSL/HTTPS with nginx reverse proxy

For more info, see `SETUP_GUIDE.md`
