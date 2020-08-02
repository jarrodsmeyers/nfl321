FROM node:latest

WORKDIR /usr/src/app

COPY packages/server .
RUN npm i

RUN npm run build

ENV NODE_ENV=production
ENV CURRENT_SEASON=2019
ENV GOOGLE_APPLICATION_CREDENTIALS="/home/dokku/nfl321-firebase-admin.json"

CMD ["npm", "run", "serve"]
EXPOSE 3000