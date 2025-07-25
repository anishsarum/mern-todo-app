# Use a Node.js LTS image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app/backend

# Copy package.json and package-lock.json first for caching
# The context is already 'backend/', so just copy from current context root
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
# Again, the context is 'backend/', so just copy from current context root
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port your Express app runs on
EXPOSE 5001

# Command to run the application
CMD ["npm", "start"]