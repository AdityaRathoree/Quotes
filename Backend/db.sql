CREATE DATABASE quotes_db;
USE quotes_db;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS Favquotes;


CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100),
    contactNo VARCHAR(15)
);

CREATE TABLE quotes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    text VARCHAR(100),
    author VARCHAR(100),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Foreign Key (user_id) references user(id)
);

CREATE TABLE Favquotes (
    user_id INT,
    quote_id INT,
    Foreign Key (user_id) references user(id),
    Foreign Key (quote_id) references quotes(id)
);


INSERT INTO user (firstName, lastName, email, password, contactNo)
VALUES ('Aditya', 'Rathore', 'aditya@gmail.com', 'Adi@123', '8780193594'),
       ('Emma', 'Johnson', 'emma@example.com', 'emma123', '1234567890'),
       ('Michael', 'Smith', 'michael@example.com', 'pass123', '9876543210'),
       ('Sophia', 'Williams', 'sophia@example.com', 'sophia456', '1112223333'),
       ('James', 'Brown', 'james@example.com', 'jamespass', '4445556666'),
       ('Olivia', 'Jones', 'olivia@example.com', 'olivia789', '7778889999');

INSERT INTO quotes (user_id, text, author)
VALUES (1, 'The only way to do great work is to love what you do.', 'Steve Jobs'),
       (2, 'Success is not final, failure is not fatal: It is the courage to continue that counts.', 'Winston Churchill'),
       (3, 'Your time is limited, so don’t waste it living someone else’s life.', 'Steve Jobs'),
       (4, 'Believe you can and you’re halfway there.', 'Theodore Roosevelt'),
       (5, 'Strive not to be a success, but rather to be of value.', 'Albert Einstein');

INSERT INTO quotes (user_id, text, author)
VALUES (1, 'In the middle of every difficulty lies opportunity.', 'Albert Einstein'),
       (2, 'The future belongs to those who believe in the beauty of their dreams.', 'Eleanor Roosevelt'),
       (3, 'The only limit to our realization of tomorrow will be our doubts of today.', 'Franklin D. Roosevelt'),
       (4, 'If you want to achieve greatness stop asking for permission.', 'Anonymous'),
       (5, 'Opportunities don’t happen, you create them.', 'Chris Grosser'),
       (1, 'Failure is the opportunity to begin again more intelligently.', 'Henry Ford'),
       (2, 'The only source of knowledge is experience.', 'Albert Einstein'),
       (3, 'The journey of a thousand miles begins with one step.', 'Lao Tzu'),
       (4, 'Don’t watch the clock; do what it does. Keep going.', 'Sam Levenson'),
       (5, 'The best way to predict the future is to create it.', 'Peter Drucker');





