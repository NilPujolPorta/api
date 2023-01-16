FROM node:latest as node 
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#DESPRES
FROM nginx:alpine
COPY --from=node /app/dist/borsa-treball /usr/share/nginx/html
