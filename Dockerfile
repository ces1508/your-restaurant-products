FROM node:lts-alpine
WORKDIR /products
# ADD ./package.json ./package.json
# ADD ./ ./
RUN npm install
CMD ["npm", "run", "dev"]