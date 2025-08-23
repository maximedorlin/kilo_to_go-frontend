FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install pm2@latest -g
RUN npm install --legacy-peer-deps
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


