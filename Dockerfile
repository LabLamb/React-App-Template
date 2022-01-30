FROM node:14 AS build
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.1-alpine
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html/