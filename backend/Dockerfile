FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm i
COPY src/ src/

CMD [ "npm", "start" ]