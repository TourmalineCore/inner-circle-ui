FROM node:20.11.1-alpine3.19 AS build

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.26.0-alpine3.19-slim
COPY /ci/nginx.conf /data/conf/nginx.conf
COPY --from=build /dist /usr/share/nginx/html

EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY ./ci/env.sh .
COPY .env-vars .
RUN apk add --no-cache bash
RUN chmod +x /usr/share/nginx/html/env.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g 'daemon off;' -c /data/conf/nginx.conf"]
