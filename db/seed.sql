CREATE TABLE trek_users 
(
id SERIAL PRIMARY KEY, 
username VARCHAR(200) NOT NULL, 
password VARCHAR(2500) NOT NULL,
first_name VARCHAR (45),
last_name VARCHAR(45),
profile_pic TEXT,
date_created TIMESTAMP
)
;

CREATE TABLE trek_posts 
(
id SERIAL PRIMARY KEY, 
title VARCHAR(45) NOT NULL, 
content TEXT,
img TEXT,
author_id INTEGER REFERENCES trek_users(id),
date_created TIMESTAMP
)
;