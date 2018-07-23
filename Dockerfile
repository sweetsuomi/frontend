FROM node:8

ENV ROOTPATH /app/src

COPY . ${ROOTPATH}

RUN npm i npm@latest -g
RUN npm install -g cordova
RUN npm install -g ionic@latest

RUN cordova telemetry off

WORKDIR $ROOTPATH
RUN npm install

EXPOSE 35729 8100
CMD ionic serve --lab