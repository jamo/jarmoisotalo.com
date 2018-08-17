FROM mhart/alpine-node:8.4.0
LABEL name testit
RUN mkdir /app
COPY * /app
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]


