FROM node:12.2.0

USER root
RUN if [ -d "/api" ]; then rm -Rf /api; fi
RUN mkdir -p /api

WORKDIR /api
COPY ./package.json /api

RUN rm -rf node_modules
RUN npm install
# RUN npm uninstall bcrypt && npm i bcrypt

COPY . /api

# ARG NODE_ENV
# ENV NODE_ENV $NODE_ENV

EXPOSE 3000
# CMD [ "npm", "start" ]
CMD npm run start:dev
# RUN npm run start:dev


# Install development packages if NODE_ENV is set to "development"

# RUN if [ "$NODE_ENV" == "development" ]; then npm install ; fi
