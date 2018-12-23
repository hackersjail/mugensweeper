FROM node:10.14.2-slim

RUN mkdir -p /app
ADD . /app
WORKDIR /app
ENV HOST 0.0.0.0

COPY ./package.json package.json
RUN npm install
