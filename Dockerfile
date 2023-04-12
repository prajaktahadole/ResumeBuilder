FROM node:16

#Create working directory
WORKDIR /usr/src/app

#RUN npm i -g serve

COPY . . /usr/src/app/

RUN npm install --force

RUN npm run build
