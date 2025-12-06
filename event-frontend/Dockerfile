# --- Build Stage ---
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build Vite project -> output goes to /app/dist
RUN npm run build

# --- Production Stage ---
FROM nginx:stable-alpine AS production

# Replace default nginx static website with your Vite dist
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
