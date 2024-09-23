FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN npm install --production

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

EXPOSE 8080


CMD ["npm", "run", "start:prod"]