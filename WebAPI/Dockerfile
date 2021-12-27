FROM php:7.2.19-fpm
FROM composer
FROM imega/mysql-client
FROM octava/php7.4-mysql5.7
RUN mkdir /usr/src/REST-API/
WORKDIR /usr/src/REST-API
COPY . /usr/src/REST-API
RUN cd /usr/src/REST-API
RUN cat .env
RUN composer install
CMD php artisan serve --host 0.0.0.0
