FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY src/database/schema.sql /app/schema.sql

EXPOSE 5000

CMD ["npm", "start"]
