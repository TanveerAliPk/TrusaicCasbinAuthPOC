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
