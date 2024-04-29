# Imagem do Node 18 
FROM node:18-alpine
RUN mkdir -p /usr/src/sportsstore

# Aplicativo estático do Angular 16
COPY dist/SportsStore/browser /usr/src/sportsstore/dist/SportsStore/browser

# Certificados SSL
COPY ssl* /usr/src/sportsstore/ssl

# Servers e Middleware
COPY authMiddleware.js /usr/src/sportsstore/
COPY serverdata.json /usr/src/sportsstore/
COPY server.js /usr/src/sportsstore/server.js
COPY deploy-package.json /usr/src/sportsstore/package.json

# Pasta de trabalho
WORKDIR /usr/src/sportsstore

RUN npm install

EXPOSE 80

CMD ["node", "server.js"]