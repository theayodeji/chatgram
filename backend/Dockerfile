FROM node:18 AS builder
WORKDIR /build
COPY package*.json .
RUN npm ci
COPY . .

FROM alpine:3.19
RUN apk add --update nodejs
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/src ./src
COPY --from=builder /build/package*.json ./

EXPOSE 5173

CMD ["node", "src/index.js"]
