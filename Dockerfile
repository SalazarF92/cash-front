FROM node as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3002
# FROM node:lts-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --production
# COPY --from=builder /app/build ./build

