FROM node:21-alpine

WORKDIR /app/services/application

COPY package*.json ./

RUN npm install && npm cache clean --force
COPY . .

EXPOSE 5003

CMD ["npm", "start"]