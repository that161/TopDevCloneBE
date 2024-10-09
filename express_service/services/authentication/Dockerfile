FROM node:21-alpine

WORKDIR /app/services/authentication

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5004
EXPOSE 8004

CMD ["npm", "start"]