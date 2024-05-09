# Base image
FROM node:20-alpine

# Define variables
ARG APP_NAME
ENV APP_NAME=${APP_NAME}

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .
RUN npx nx reset

# Creates a "dist" folder with the production build
RUN npx nx run ${APP_NAME}:build --prod

RUN npx nx reset

# Start the server using the production build
CMD node dist/apps/${APP_NAME}/main.js
