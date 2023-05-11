-- Create database 
CREATE DATABASE company;

-- Switch to the new database
USE company;

-- Create tables and Indexes
CREATE TABLE employees
(
   id INT AUTO_INCREMENT,
   name VARCHAR(50) NOT NULL,
   age SMALLINT NOT NULL,
   active BIT DEFAULT 0,
   CONSTRAINT pk_employee PRIMARY KEY(id)
);

CREATE INDEX idx_id
ON employees(id);

