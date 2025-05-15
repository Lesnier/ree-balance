# Usa Node.js LTS
FROM node:18

# Crea el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto usado por Express
EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "start"]
