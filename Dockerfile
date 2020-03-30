ARG NODE_VERSION=12-alpine
ARG ROOT=/usr/src/app

FROM node:${NODE_VERSION} AS build

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

ENV NODE_ENV production
RUN npm ci

FROM node:${NODE_VERSION}

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

COPY . .

ENV NODE_ENV production

ENTRYPOINT [ "node", "/usr/src/app/index.js" ]