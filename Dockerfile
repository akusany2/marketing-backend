FROM node:alpine

USER root
RUN if [ -d "/api" ]; then rm -Rf /api; fi
RUN mkdir -p /api

WORKDIR /api
COPY . /api
# RUN npm i -g nodemon ts-node typescript
RUN npm install
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
# CMD [ "npm", "start" ]
# CMD ["node", "start:dev"]
RUN npm run start:dev
EXPOSE 3000

# Install development packages if NODE_ENV is set to "development"

# RUN if [ "$NODE_ENV" == "development" ]; then npm install ; fi
