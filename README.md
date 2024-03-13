# Для запуска проекта, необходимо выполнить следующие шаги:

1. Склонировать репозиторий с api

2. Переименовать файл .env.local (убрать .local)

3. Запустить БД с помощьб команды
```
docker compose up
```

4. Откройте новый терминал и перейдите в папку backend
```
cd backend
```

5. Создайте миграцию
```
yarn migration
```

5. Выполните миграцию
```
yarn migrate
```

7. Запустить backend 
```
yarn dev или yarn start
```
