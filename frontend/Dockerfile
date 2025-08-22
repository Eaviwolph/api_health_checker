FROM node:24.6.0-alpine3.22

EXPOSE 3000
EXPOSE 5173

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

CMD ["npm", "run", "dev" , "--", "--host"]