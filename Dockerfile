FROM node:alpine
LABEL MAINTAINER "Subash SN"

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]