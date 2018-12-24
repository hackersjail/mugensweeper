FROM node:10.14.2
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
