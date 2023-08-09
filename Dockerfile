# Use an official Node.js runtime as the base image
FROM node:20-alpine3.17

# Set the working directory in the container
WORKDIR /mor-talent-assessment

# Get source
COPY ["package-lock.json","babel.config.js","package.json", "./"]
COPY documentation documentation
COPY src src
COPY prisma prisma
COPY .env .env

# Install packages
RUN npm install

# Generate database
RUN npx prisma generate

# Define the command to run your application
CMD ["npm","start"]