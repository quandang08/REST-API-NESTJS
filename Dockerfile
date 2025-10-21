FROM node:20-bullseye-slim

#create app directory
WORKDIR /usr/src/app

# update OS packages to address known vulnerabilities
RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

#install app dependencies
COPY package*.json ./

RUN npm install

#bundle app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]