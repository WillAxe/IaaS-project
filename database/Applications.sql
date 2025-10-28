CREATE TABLE Applications(id serial PRIMARY KEY, Status text default 'Not Applied', Application_Date date NOT NULL, User_id INT REFERENCES Users(id), Job_id INT REFERENCES Job_Posts(id), FOREIGN KEY (Job_id) REFERENCES Job_Posts(id), FOREIGN KEY (User_id) REFERENCES Users(id));

-- Rember to create the tables for users and Job_Posts before creating Applications table

