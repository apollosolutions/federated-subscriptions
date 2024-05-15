FROM node:18-bullseye-slim

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY reviews.js .
COPY reviews.graphql .

CMD [ "node", "reviews.js" ]
