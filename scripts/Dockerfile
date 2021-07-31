FROM node:14.16.1-alpine

# prepare code tree
WORKDIR /app
COPY ./server /app/server

# build
WORKDIR /app/server
RUN npm install
RUN npm build
RUN echo "01 01-13 * * 1-5 node /app/server/lib/index.js" >> crontab.tmp \
    && crontab crontab.tmp \
    && rm -rf crontab.tmp

CMD ["crond","-f"]