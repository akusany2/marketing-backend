FROM node:10

USER root
RUN if [ -d "/api" ]; then rm -Rf /api; fi
RUN mkdir -p /api

WORKDIR /api
COPY . /api
# RUN npm i -g nodemon ts-node typescript
# RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
# RUN npm install --quiet node-gyp -g

RUN npm install
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

EXPOSE 3000
# CMD [ "npm", "start" ]
CMD ["npm", "run", "start:dev"]
# RUN npm run start:dev


# Install development packages if NODE_ENV is set to "development"

# RUN if [ "$NODE_ENV" == "development" ]; then npm install ; fi
