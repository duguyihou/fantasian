FROM node:16 AS development

WORKDIR /usr/src/main

COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install glob rimraf

RUN pnpm install --only=development

COPY . .

RUN pnpm run build

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/main

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/main/dist ./dist

CMD ["node", "dist/main"]