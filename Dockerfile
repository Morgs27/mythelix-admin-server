FROM node:17

# working dir
WORKDIR /app

# copy package json files
COPY package*.json ./

# install Files
RUN npm install

# copy source files
COPY . .

# Expose the api port
EXPOSE 8080

# exec form
CMD [ "npm", "start"]