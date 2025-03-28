# # Stage 1: Build the Angular app
# FROM node:18 AS build-stage

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application source code
# COPY . .

# # Build the Angular app in production mode
# RUN npm run build --prod

# # Stage 2: Serve the app using Nginx
# FROM nginx:stable-alpine AS production-stage

# # Copy the Angular build output to Nginx's default html directory
# COPY --from=build-stage /app/dist/coreui-free-angular-admin-template/browser /usr/share/nginx/html

# # Copy a custom Nginx configuration file (optional)
# # Uncomment the following line if you have a custom Nginx config
# # COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


# Step 1: Build the Angular application using Node.js image
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the Angular app
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Step 2: Set up a web server (using Nginx to serve the built app)
FROM nginx:alpine

# Copy the built Angular app from the build stage
COPY --from=build /app/dist/coreui-free-angular-admin-template/browser /usr/share/nginx/html

# Expose port 80 to allow access to the web server
EXPOSE 80

# Start Nginx to serve the Angular app
CMD ["nginx", "-g", "daemon off;"]
