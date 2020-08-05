FROM node:latest

RUN mkdir /app
COPY packages/server /app
WORKDIR /app

RUN yarn
RUN yarn build

ENV NODE_ENV=production
ENV CURRENT_SEASON=2019
ENV GOOGLE_APPLICATION_CREDENTIALS="/storage/nfl321-firebase-admin.json"

CMD ["yarn", "serve"]
EXPOSE 3000