FROM node:18 as build

#
# INSTALL DEPENDENCIES
#

WORKDIR /usr/src/app

COPY out/json/ .
# COPY out/json/package-lock.json ./package-lock.json

RUN npm install

COPY out/full/ .

RUN npm run build
RUN dir -s



FROM node:20-slim
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY out/json/ .

RUN npm ci

COPY --from=build /usr/src/app/apps/backend/dist /usr/src/app/apps/backend/dist
COPY --from=build /usr/src/app/apps/dashboard/dist /usr/src/app/apps/dashboard/dist

WORKDIR /usr/src/app/apps/backend

COPY .env /usr/src/app/apps/backend/.env
COPY .env.production /usr/src/app/apps/backend/.env.production

USER node

EXPOSE 3000
CMD ["node", "./dist/main.js", "--config", "./.env", "--config", "./.env.production"]