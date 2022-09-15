// POSTGRES
// follow wiki to set up first
https://wiki.archlinux.org/title/PostgreSQL

// npm i 

// to set up postgres pasword \password and set password 

// once in postgres do createdb binOfRequests

// .env 
PGHOST='localhost'
PGUSER='postgres'
PGDATABASE='binOfRequests'
PGPASSWORD='1234'
PGPORT=5432


// these are to create the table schemas in postgres
CREATE TABLE bin(
id serial PRIMARY KEY,
binkey varchar(255),
last_accessed timestamp DEFAULT now(),
created_at timestamp DEFAULT now()
);
CREATE TABLE request(
id serial PRIMARY KEY,
mongokey varchar(255),
created timestamp DEFAULT now(),
binid int
);

// MONGO 
// follow these instructions to set up
https://wiki.archlinux.org/title/MongoDB

// mongosh (put that in command line)
mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4/requests
// place this in your .env ^
