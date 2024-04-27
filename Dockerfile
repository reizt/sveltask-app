FROM public.ecr.aws/lambda/nodejs:20 AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
RUN rm -rf node_modules && pnpm install --frozen-lockfile --prod


FROM public.ecr.aws/lambda/nodejs:20 AS product
WORKDIR /app

RUN npm install -g pnpm

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/build build

ENTRYPOINT ["node"]
CMD ["build"]
