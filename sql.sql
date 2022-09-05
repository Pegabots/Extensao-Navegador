CREATE DATABASE IF NOT EXISTS test;
USE test;

DROP TABLE IF EXISTS names;


CREATE TABLE names(
    id int auto_increment primary key,
    nome varchar(50) not null
) ENGINE=INNODB;
