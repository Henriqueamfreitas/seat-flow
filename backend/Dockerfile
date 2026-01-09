# The image we will be pulling from dockerhub ... its a very simple "machine"
# FROM alpine:3.21 
FROM node:23-alpine


# We need to install node and npm in this "machine" 
RUN apk add --no-cache nodejs npm

# We wll be creating and entering the folder app
WORKDIR /app

# We are going to copy everything that is in out folder locally and paste it into the app folder inside the container
# it is going to copy the node modules, .env, in others words, the files that are in the .gitignore
# COPY . .

# Instead of COPY . ., we can just copy package.json and run npm install -- this will be faster, because we are not 
# copying and pasting node_modules
COPY package*.json ./
RUN npm install

# i use the comand below if i want to runt without -it
# CMD [ "npm", "run", "dev" ]

# Its not necessary, but its a good practice
EXPOSE 5000

# to create the image
  # $ docker build -t henriqueannicchino/node:latest .

# to run the container with the image
  # docker run -it --name node_inventory_manager --network nodenet -v $(pwd -W):/app -p 5000:5000 henriqueannicchino/node:latest

# npm run dev inside the container