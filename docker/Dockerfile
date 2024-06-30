# Первый этап: сборка приложения
FROM node:20.13.1-alpine AS builder

# Задайте рабочую директорию внутри контейнера
WORKDIR /app

# Копируйте файлы package.json и package-lock.json (если есть)
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте все остальные файлы в рабочую директорию
COPY . .

# Соберите приложение
RUN npm run build

# Второй этап: сервировка собранных файлов
FROM nginx:alpine

# Удалите файл стандартной конфигурации Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируйте вашу собственную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d

# Копируйте собранные файлы из предыдущего этапа
COPY --from=builder /app/build /usr/share/nginx/html

# Экспонируйте порт, который будет использоваться приложением
EXPOSE 3000

# По умолчанию Nginx запускается в форграунд режиме
CMD ["nginx", "-g", "daemon off;"]
