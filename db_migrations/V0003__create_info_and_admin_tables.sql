CREATE TABLE about_info (
    id SERIAL PRIMARY KEY,
    greeting TEXT NOT NULL,
    description1 TEXT NOT NULL,
    description2 TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_info (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    response_time VARCHAR(255) NOT NULL,
    github_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    twitter_url VARCHAR(500),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);