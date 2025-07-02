FROM node:24-alpine

WORKDIR /app
COPY . .
RUN rm -rf node_modules .env
RUN npm install

EXPOSE 4983

CMD ["npm", "run", "dev"]
# docker build -t huakunshen/drizzle-studio-docker .
# docker run --rm -p 4983:4983 -e DATABASE_URL=xxx \
# -e SSL_REJECT_UNAUTHORIZED=false \
# huakunshen/drizzle-studio-docker
