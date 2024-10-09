FROM node:21-alpine

WORKDIR /app/services/user

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5001

CMD ["npm", "start"]