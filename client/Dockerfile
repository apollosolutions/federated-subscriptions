# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .

ARG REACT_APP_SUPERGRAPH_URI

# ==== INSTALL =======
# Download build dependency
RUN npm install react-scripts

# ==== BUILD =======
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
ENV REACT_APP_SUPERGRAPH_URI ${REACT_APP_SUPERGRAPH_URI}  

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "build" ]
