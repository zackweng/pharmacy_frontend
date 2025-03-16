FROM node:20-slim

WORKDIR /app/frontend

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

EXPOSE 3000
EXPOSE 4173

CMD ["sh", "-c", "pnpm i && pnpm dev"]