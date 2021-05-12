FROM node:12.16.1-alpine

ARG api

ENV APP_ROOT /src
ENV API_BASE_URL=$api

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=80

RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

RUN apk update && apk upgrade

COPY ./package.json ${APP_ROOT}/
RUN npm install --production

COPY . ${APP_ROOT}/
RUN npm run build

# start the app
CMD [ "npm", "start" ]
