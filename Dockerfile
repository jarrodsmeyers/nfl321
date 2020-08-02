FROM node:latest

WORKDIR /usr/src/app

COPY packages/server .
COPY /home/dokku/nfl321-firebase-admin.json .
RUN yarn

RUN yarn build

ENV NODE_ENV=production
ENV CURRENT_SEASON=2019
ENV GOOGLE_APPLICATION_CREDENTIALS="./nfl321-firebase-admin.json"

CMD ["yarn", "serve"]
EXPOSE 3000