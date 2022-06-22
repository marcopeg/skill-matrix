###
### BUILD THE SERVICE
###

FROM node:16-alpine AS builder

# NPM Install for building
WORKDIR /usr/src/app
ADD package.json /usr/src/app
RUN npm install --production

# Copy source files:
WORKDIR /usr/src/app
ADD src /usr/src/app/src

CMD ["node", "src/index.js"]