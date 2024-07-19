FROM node:latest

# Create the directory!
RUN mkdir -p /usr/src/site
WORKDIR /usr/src/site

# Copy and Install our site
COPY package.json /usr/src/site
RUN npm install

# For Debugging
#RUN apt-get update && apt-get install -y \
#    nano \
#    curl \
#    git \
#    && rm -rf /var/lib/apt/lists/*

# Our precious site
COPY . /usr/src/site

# Start me!
CMD ["npm", "start"]