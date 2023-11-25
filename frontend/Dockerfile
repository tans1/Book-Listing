FROM node:alpine

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","run","dev" ]