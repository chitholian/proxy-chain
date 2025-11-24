FROM node:22-alpine

ENV PORT=3210
ENV UPSTREAM=

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm ci

CMD [ "node", "src/server.js" ]
