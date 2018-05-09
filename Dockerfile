FROM node:8-alpine

WORKDIR /app

ADD . /app

RUN npm install

CMD npm run go

EXPOSE 3001