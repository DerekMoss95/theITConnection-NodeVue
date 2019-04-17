-- Specify database to use
\c users;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,
 firstName VARCHAR (80) NOT NULL,
 lastName VARCHAR (80) NOT NULL,
 email VARCHAR (256) NOT NULL,
 phone VARCHAR (10) NOT NULL,
 projects VARCHAR (256) NULL,
 projectSubscriptions VARCHAR (256) NULL,
 password VARCHAR (20) NOT NULL,
);

-- Create indexes
CREATE INDEX email ON users (email);
