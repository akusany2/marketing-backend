# FROM node:12.2.0

# USER root
# RUN if [ -d "/api" ]; then rm -Rf /api; fi
# RUN mkdir -p /api

FROM alpine:3.11


WORKDIR /api
# COPY ./package.json /api
# COPY . /api



COPY package.json package-lock*.json npm-shrinkwrap*.json /api/
RUN apk --no-cache add --virtual native-deps \
  git g++ gcc libgcc libstdc++ linux-headers make python && \
  apk add --update nodejs nodejs-npm && \
  npm install node-gyp -g &&\
  npm install &&\
  npm rebuild bcrypt --build-from-source && \
  npm cache clean --force &&\
  apk del native-deps

COPY . /api



# RUN rm -rf node_modules
# RUN npm install
# RUN npm rebuild bcrypt --update-binary && npm rebuild node-pty --update-binary
# RUN npm uninstall bcrypt && npm i bcrypt

EXPOSE 3000
CMD npm run start:dev



# Install development packages if NODE_ENV is set to "development"

# RUN if [ "$NODE_ENV" == "development" ]; then npm install ; fi
