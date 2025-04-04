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
    list_of_id_sprint TEXT[],
    color VARCHAR(255) NOT NULL
);

CREATE TABLE scrum_tabs (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    list_of_scrum_step_id TEXT[],
    color VARCHAR(255) NOT NULL
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
    history TEXT[],
    color VARCHAR(255) NOT NULL
);

INSERT INTO users (first_name, last_name, email, profil_image) VALUES
('Alice', 'Durand', 'alice.durand@example.com', 'alice.jpg'),
('Bob', 'Martin', 'bob.martin@example.com', 'bob.jpg'),
('Charlie', 'Lemoine', 'charlie.lemoine@example.com', 'charlie.jpg'),
('Diane', 'Dupont', 'diane.dupont@example.com', 'diane.jpg');

INSERT INTO scrum_steps (title, list_of_id_sprint) VALUES
('Backlog', ARRAY['1', '2'], '#ffb3ba'),
('To Do', ARRAY['3', '4'], '#ffdfba'),
('In Progress', ARRAY['5'], '#ffffba'),
('Done', ARRAY['6', '7'], '#baffc9');

INSERT INTO scrum_tabs (title, list_of_scrum_step_id) VALUES
('Sprint 1', ARRAY['1', '2', '3'], '	#bae1ff'),
('Sprint 2', ARRAY['4', '5', '6'], '	#bae1ff'),
('Sprint 3', ARRAY['7'], '	#bae1ff');
