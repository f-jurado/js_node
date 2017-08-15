DROP TABLE fbusers;
CREATE TABLE fbusers(name VARCHAR(50) PRIMARY KEY NOT NULL);
DROP TABLE users;
CREATE TABLE users(name VARCHAR(50) PRIMARY KEY NOT NULL, password VARCHAR(10485760) not null);

insert into users(name,password) values('arnold','9a85db6a0e0003fe1293737c39acc824');