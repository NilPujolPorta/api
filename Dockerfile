FROM node:latest as node

WORKDIR /api
COPY package.json .
RUN npm install
COPY . .
CMD npm start


