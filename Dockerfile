FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install -g typescript

RUN npm run build

COPY . .

EXPOSE 3000/tcp

CMD ["npm run start"]
