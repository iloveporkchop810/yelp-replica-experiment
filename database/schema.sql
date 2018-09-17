DROP DATABASE IF EXISTS zelp;
CREATE DATABASE zelp;

USE zelp;

CREATE TABLE users (
    UserName VARCHAR(60) NOT NULL,
    Location VARCHAR(60) NOT NULL,
    FriendsCount INT,
    ReviewsCount INT,
    PhotosCount INT,
    PhotoLink VARCHAR(100),
    Status VARCHAR(10),
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);

CREATE TABLE businesses (
    BizName VARCHAR(60) NOT NULL,
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);

CREATE TABLE reviews (
    StarRating INT NOT NULL,
    ReviewBody TEXT NOT NULL,
    DateTime DATETIME NOT NULL,
    Language VARCHAR(10) DEFAULT 'Engrish',
    usefulButton INT,
    funnyButton INT,
    coolButton INT,
    Businesskey INT NOT NULL,
    UserKey INT NOT NULL,
    id INT NOT NULL AUTO_INCREMENT, 
    FOREIGN KEY (Businesskey) REFERENCES businesses (id),
    FOREIGN KEY (UserKey) REFERENCES users (id),
    PRIMARY KEY (id)
);


-- CREATE TABLE test (
--     StarRating INT NOT NULL,
--     ReviewBody VARCHAR(500) NOT NULL,
--     DateTime DATETIME NOT NULL,
--     Language VARCHAR(10),
--     usefulButton INT,
--     funnyButton INT,
--     coolButton INT,
--     Businesskey INT NOT NULL,
--     UserKey INT NOT NULL,
--     id INT NOT NULL AUTO_INCREMENT, 
--     PRIMARY KEY (id)
-- );

