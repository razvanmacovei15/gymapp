# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /gym_management_frontend

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the app's code to the container
COPY . .

# Set the environment variable for the build process
ENV VITE_PORT=8020

# Build the React app for production
RUN npm run build

# Expose the desired port
EXPOSE 8020

# Use `npx` to serve the built app on port 8020
CMD ["npx", "serve", "-s", "dist", "-l", "8020"]
