[![Production](../../actions/workflows/frontend.yml/badge.svg?branch=main)](../../actions/workflows/frontend.yml?query=workflow%3A"Production")

# Дипломный проект Практикум веб-10

Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

* Макет: https://www.figma.com/file/VSiB5ljJFd5AwAZObWMgC5/Diploma_My?node-id=891%3A3857&t=miKZfdWuTp0Y1iFy-1
* Проект: https://diploma.melodyn.nomoredomains.icu

## Технологии

Фронтенд:
* HTML5: семантические теги;
* CSS3: медиа-запросы;
* JavaScript, React; React Router

## Установка и запуск

Требования:

* Node.js >= 14;
* npm >= 6.14;
* (опционально) make >= 4;

> 💡 Команды прописаны для утилиты `make`, но если её нет, то исходные команды можно найти в Makefile в каталогах с 
исходниками

Развёртывание:

* `make setup` - установка зависимостей и запуск;

Использование

* `make run` - запуск приложения;
* `make lint` - запустить линтер;
