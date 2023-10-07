FROM node:18-alpine

WORKDIR /bitvote-front/

COPY public/ /bitvote-front/public
COPY src/ /bitvote-front/src
COPY package.json /bitvote-front/
COPY package-lock.json /bitvote-front/
COPY . /bitvote-front/

RUN npm install

CMD ["npm", "run", "dev"]

