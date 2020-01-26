FROM alpine:3.11

WORKDIR /api

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

EXPOSE 3000
CMD npm run start:dev