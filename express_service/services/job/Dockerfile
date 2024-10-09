FROM node:21-alpine 

WORKDIR /app/services/job

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5002 
EXPOSE 8002

CMD ["npm", "start"]