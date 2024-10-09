FROM node:21-alpine

WORKDIR /app/gateway

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5000

CMD ["npm", "start"]