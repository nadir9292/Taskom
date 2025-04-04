CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    profil_image VARCHAR(255)
);

CREATE TABLE scrum_steps (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    list_of_id_sprint TEXT[]
);

CREATE TABLE scrum_tabs (
    id BIGSERIAL PRIMARY KEY,
    list_of_scrum_step_id TEXT[]
);

CREATE TABLE teams (
    id BIGSERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    list_of_id_user TEXT[],
    list_of_id_scrum_tab TEXT[]
);

CREATE TABLE sprints (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tag VARCHAR(100),
    short_description VARCHAR(255),
    long_description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    list_of_members_id TEXT[],
    history TEXT[]
);
