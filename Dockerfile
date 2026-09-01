FROM node:24-alpine AS build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/mntn-landing/browser /usr/share/nginx/html
EXPOSE 80
