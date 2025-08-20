# Build stage
FROM node:alpine3.22 AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# Production stage
FROM node:alpine3.22
WORKDIR /app

# Copy only built app and node_modules
COPY --from=builder /app ./

EXPOSE 3000

# Run Next.js in production mode
CMD ["npm", "run", "start"]