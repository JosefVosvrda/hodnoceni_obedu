drop database if exists reviews;
create database reviews;
use reviews;

create table DishType
(
id int primary key auto_increment,
name varchar(20) not null unique
);

create table Dish
(
id int primary key auto_increment,
name varchar(30) not null unique,
type_id int not null,
serving_date date not null,
constraint foreign key (type_id) references DishType(id) 
);

use reviews;
drop table User;
drop table Review;

create table User
(
id int primary key auto_increment,
username varchar(30) not null unique,
newsletter bit
);


create table Lunch
(
id int primary key auto_increment,
description varchar(150),
serving_date date
);

drop table Review;
create table Review
(
id int primary key auto_increment,
user_id int not null,
lunch_id int not null,
soup_quality int not null,
soup_comment varchar(150) not null,
main_taste int not null,
main_look int not null,
main_temperature int not null,
main_portion int not null,
desert_quality int,
desert_comment varchar(150),
overall_score float not null,
constraint foreign key (lunch_id) references Lunch(id),
constraint foreign key (user_id) references User(id)
);







CREATE USER 'reviewer'@'localhost' IDENTIFIED BY 'password';
grant select, insert, update, delete on reviews.* to 'reviewer'@'localhost' ;
flush privileges;

insert into DishType(name) values('Main'),('Soup'),('Dessert')

select * from DishType;
