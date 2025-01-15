FROM node:18 AS build

#
# INSTALL DEPENDENCIES
#

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build
RUN npm run turbo:prune:backend

# COPY out/json/ .
# COPY out/json/package-lock.json ./package-lock.json

# RUN npm install

# COPY out/full/ .

# RUN npm run build
# RUN dir -s



FROM node:18-slim AS runtime

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/out/json/ .

RUN npm ci

COPY --from=build /usr/src/app/apps/backend/dist ./apps/backend/dist
COPY --from=build /usr/src/app/apps/dashboard/dist ./apps/dashboard/dist

WORKDIR /usr/src/app/apps/backend

COPY .env .env
COPY .env.production .env.production

USER node

ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "./dist/main.js", "--config", "./.env", "--config", "./.env.production"]