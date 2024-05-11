FROM node:21.7

USER node
WORKDIR /home/ubuntu/


COPY package.json .
COPY yarn.lock .

RUN yarn install
COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]