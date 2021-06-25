# syntax=docker/dockerfile:1
FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 8080
ENV PORT 8080
CMD ["yarn", "start"]
