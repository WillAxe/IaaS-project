CREATE TABLE Job_Posts(id serial PRIMARY KEY, Job_Title text NOT NULL, Job_Role text NOT NULL, Job_Description text NOT NULL, Company_Name text UNIQUE NOT NULL, Date_Posted date NOT NULL);

