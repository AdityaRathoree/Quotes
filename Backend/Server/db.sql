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
    contactNo VARCHAR(15),
    profileImage VARCHAR(100),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quotes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    category_id INT,
    text VARCHAR(10000),
    author VARCHAR(100),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    editedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likescount INT DEFAULT 0,
    Foreign Key (user_id) references user(id),
    Foreign Key (category_id) references category(id)
);

CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(100)
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


ALTER TABLE quotes
MODIFY text VARCHAR(10000);

ALTER TABLE quotes
ADD likescount INT DEFAULT 0;

ALTER TABLE quotes
ADD category_id INT;



INSERT INTO category (category) VALUES 
('Love and Relationships'),
('Success and Motivation'),
('Wisdom and Knowledge'),
('Nature and Beauty'),
('Mindfulness and Well-being');

INSERT INTO quotes (user_id, category_id, text, author)
VALUES 
(1, 1, 'The best thing to hold onto in life is each other.', 'Audrey Hepburn'),
(1, 1, 'Love is composed of a single soul inhabiting two bodies.', 'Aristotle'),
(2, 1, 'You don’t love someone for their looks, or their clothes, or for their fancy car, but because they sing a song only you can hear.', 'Oscar Wilde'),

(1, 2, 'The only limit to our realization of tomorrow will be our doubts of today.', 'Franklin D. Roosevelt'),
(2, 2, 'The only way to do great work is to love what you do.', 'Steve Jobs'),
(3, 2, 'Success is not final, failure is not fatal: It is the courage to continue that counts.', 'Winston Churchill'),

(1, 3, 'The only true wisdom is in knowing you know nothing.', 'Socrates'),
(2, 3, 'Education is the most powerful weapon which you can use to change the world.', 'Nelson Mandela'),
(3, 3, 'The more I read, the more I acquire, the more certain I am that I know nothing.', 'Voltaire'),

(1, 4, 'The earth has music for those who listen.', 'Shakespeare'),
(2, 4, 'In every walk with nature, one receives far more than he seeks.', 'John Muir'),
(3, 4, 'The beauty of the natural world lies in the details.', 'Natalie Angier'),

(1, 5, 'Happiness is not something ready-made. It comes from your own actions.', 'Dalai Lama'),
(2, 5, 'The present moment is filled with joy and happiness. If you are attentive, you will see it.', 'Thich Nhat Hanh'),
(3, 5, 'In today’s rush, we all think too much — seek too much — want too much — and forget about the joy of just being.', 'Eckhart Tolle');





 select category.category,category.id,quotes.id, quotes.user_id, quotes.text,quotes.author,quotes.createdDate, quotes.editedDate,quotes.likescount from quotes join category on category.id=category.id;
