FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src ./src
COPY views ./views

FROM node:20-alpine

WORKDIR /app

# Segurança: usuário não-root
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp

COPY --from=builder /app /app

USER nodeapp

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget --quiet --spider http://localhost:3000 || exit 1

CMD ["node", "src/server.js"]
