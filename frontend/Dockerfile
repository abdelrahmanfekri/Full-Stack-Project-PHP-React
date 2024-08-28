# Dockerfile for frontend

# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code
COPY . .

RUN npm run build

# Use an Nginx image to serve the app
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
