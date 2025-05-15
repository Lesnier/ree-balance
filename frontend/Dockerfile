# Etapa de construcción
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción con un servidor web (opcional)
# O simplemente usar Vite en modo desarrollo:
# FROM node:18
# WORKDIR /app
# COPY . .
# RUN npm install
# EXPOSE 5173
# CMD ["npm", "run", "dev"]

# Para servir el frontend con nginx:
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
