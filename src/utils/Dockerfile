FROM node:18-alpine


WORKDIR user/src/app


COPY package*.json ./

RUN npm install --silent 

COPY . .

EXPOSE 6000

CMD ["npm" 'start']