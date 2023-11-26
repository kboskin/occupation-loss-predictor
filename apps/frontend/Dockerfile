FROM node:21

MAINTAINER Kostiantyn Boskin
ARG API_URL
WORKDIR /app
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install
ENV NEXT_PUBLIC_BASE_URL=$API_URL
EXPOSE 3000

COPY . /app
RUN npm run build

CMD ["npm", "run", "start"]