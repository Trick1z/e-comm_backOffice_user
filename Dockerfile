# Stage 1: Build the Angular app
FROM node:18 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Stage 2: Serve the app using Nginx
FROM nginx:stable-alpine AS production-stage

# Copy the Angular build output to Nginx's default html directory
COPY --from=build-stage /app/dist/coreui-free-angular-admin-template/browser /usr/share/nginx/html

# Copy a custom Nginx configuration file (optional)
# Uncomment the following line if you have a custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
