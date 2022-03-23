#stage 1
FROM node:14.17.4-alpine3.12 as node
WORKDIR /app
COPY . .
RUN ls
RUN npm install -g @angular/cli@11.2.18
RUN npm install
RUN ng version
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html