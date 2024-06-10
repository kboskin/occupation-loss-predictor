FROM node:21.3

MAINTAINER Kostiantyn Boskin
WORKDIR /app
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install
EXPOSE 3000

COPY . /app
RUN npm run build

CMD ["npm", "run", "start"]