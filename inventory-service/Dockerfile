FROM node:16-alpine AS builder

# couchbase sdk requirements
# RUN apk update 
# RUN apk add curl bash 
# RUN rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
# RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

# run node prune
# RUN /usr/local/bin/node-prune

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000
CMD [ "node", "./dist/index.js" ]