FROM node:12-alpine as builder

WORKDIR /app

COPY . /app

RUN yarn

RUN REACT_APP_SERVER_ENV=development yarn build

FROM nginx:alpine

WORKDIR /app

COPY --from=builder /app/build /app

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN adduser -D myuser

USER myuser

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'