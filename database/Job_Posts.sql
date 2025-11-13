
CREATE TABLE job_posts (
    job_id SERIAL PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    job_role VARCHAR(255),
    job_description TEXT,
    company_name VARCHAR(255),
    posted_date DATE DEFAULT CURRENT_DATE
);