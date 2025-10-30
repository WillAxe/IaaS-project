CREATE TABLE Applications (
    application_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    job_id INTEGER REFERENCES Job_Posts(job_id),
    status VARCHAR(255) DEFAULT 'Pending' NOT NULL,
    application_date DATE DEFAULT CURRENT_DATE
);


-- Rember to create the tables for users and Job_Posts before creating Applications table

