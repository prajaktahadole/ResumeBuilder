FROM node:16

#Create working directory
WORKDIR /usr/src/app

#RUN npm i -g serve

COPY . . /usr/src/app/

RUN npm install --force

RUN npm run build

# RUN npm install -g serve

# CMD ["serve", "-s", "build"]

EXPOSE 3000
CMD [ "npm", "run", "start"]

#FROM nginx:alpine
#COPY default.conf /etc/nginx/conf.d/default.conf
#COPY --from=0 /usr/src/app/build/ /usr/share/nginx/html/
#CMD ["nginx", "-s", "reload"]
