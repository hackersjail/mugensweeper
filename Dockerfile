FROM node:10.24.1-alpine

WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN apk update && \
  apk add git && \
  yarn install

CMD ["sh"]
