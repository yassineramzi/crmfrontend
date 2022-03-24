#stage 1
FROM node:14.17.4-alpine3.12 as node
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm config set legacy-peer-deps true
RUN npm install
COPY . /app
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html