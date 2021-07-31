FROM node:14.16.1-alpine

# prepare code tree
WORKDIR /app
COPY ./server /app/server

# build
WORKDIR /app/server
RUN yarn
RUN yarn tsc
RUN echo "01 01-13 * * 1-5 node /app/server/lib/main.js" >> crontab.tmp \
    && crontab crontab.tmp \
    && rm -rf crontab.tmp

CMD ["crond","-f"]
