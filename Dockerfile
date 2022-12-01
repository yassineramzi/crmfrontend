#stage 1
FROM trion/ng-cli:11.0.4 as builder
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN ng build --prod

#stage 2
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
