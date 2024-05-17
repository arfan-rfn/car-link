# Use the official Node.js 18 image as a parent image
FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to work directory
COPY package*.json ./
# If you are using yarn, you might want to copy the yarn.lock file as well
# COPY yarn.lock ./

# Install dependencies
RUN npm install
# If you are using yarn, use the following command instead:
# RUN yarn install

# Copy the rest of your application's code
COPY . .

# Build your Next.js application
RUN npm run build
# If you are using yarn, use the following command instead:
# RUN yarn build

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
# If you are using yarn, use the following command instead:
# CMD ["yarn", "start"]
