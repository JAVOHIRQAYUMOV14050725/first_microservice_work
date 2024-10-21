FROM node:20-alpine3.19
WORKDIR /product_service
COPY ./package.json ./
RUN npm install
COPY ./ ./
EXPOSE 3004
CMD [ "npm","run","start:dev" ]
