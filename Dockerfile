FROM node:latest

RUN npm i -g nodemon

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

HEALTHCHECK --interval=30s --timeout=3s CMD npm run health-check

CMD ["nodemon", "index.js"]