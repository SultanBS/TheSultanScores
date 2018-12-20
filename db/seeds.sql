DROP DATABASE IF EXISTS project_scores;
CREATE DATABASE project_scores;

\c project_scores;

CREATE TABLE users(
  id serial primary key,
  email varchar UNIQUE NOT NULL,
  password_digest varchar NOT NULL,
  role varchar NOT NULL
);

CREATE TABLE team(
    id serial primary key,
    name varchar NOT NULL,
    country varchar NOT NULL,
    region varchar NOT NULL,
    established varchar NOT NULL,
    stadium varchar,
    image varchar
);

CREATE TABLE league(
    id serial primary key,
    name varchar NOT NULL,
    founded varchar,
    number_of_teams varchar NOT NULL,
    champion varchar,
    region varchar,
    country varchar,
    image varchar
);

CREATE TABLE standings(
   id serial primary key,
    matches_played int NOT NULL,
    win int NOT NULL,
    draw int NOT NULL,
    lose int NOT NULL,
    goals_for int NOT NULL,
    goals_against int NOT NULL,
    goals_difference int NOT NULL,
    points int NOT NULL,
    teams_id  int NOT NULL,
    league_id int NOT NULL,
    FOREIGN KEY (teams_id) REFERENCES team,
    FOREIGN KEY (league_id) REFERENCES league
);

Insert INTO team (name, country, region, established, stadium, image) VALUES 
('Alhilal', 'Saudi Arabia', 'Asia', '1957', 'King Saud Stadium', 'https://i.ibb.co/K5MwwLR/61d88fe769d1fc840cd7e1211e0f33e7.jpg'),
('Ittihad', 'Saudi Arabia', 'Asia', '1927', 'King Abdullah Stadium', 'https://i.ibb.co/56YRK4G/41-Mg4baa-P1-L.jpg'),
('Alahli', 'Saudi Arabia', 'Asia', '1937', 'King Abdullah Stadium', 'https://i.ibb.co/DKPbYTr/20459b76339aeae336bae55dcd31a026.png'),
('Alshabab', 'Saudi Arabia', 'Asia', '1947', 'King Fahad Stadium', 'https://i.ibb.co/GFbmvhJ/ROMAI-Al-Shabab-0099.jpg'),
('Chelsea', 'England', 'Europe', '1905', 'Stamford Bridge', 'https://i.ibb.co/bWw5W3v/Chelsea-logo-768x432.png'),
('Manchester United', 'England', 'Europe', '1878', 'Old Trafford', 'https://i.ibb.co/kg9RfKp/images.jpg'),
('Manchester City', 'England', 'Europe', '1880', 'Etihad Stadium', 'https://i.ibb.co/BwP1dkQ/1200px-Manchester-City-FC-badge-svg.png'),
('Liverpool', 'Englnd', 'Europe', '1892', 'Anfield', 'https://i.ibb.co/D5WNLjn/Liverpool-FC-svg.png'),
('Real Madrid', 'Spain', 'Europe', '1902', 'Santiago Bernabeu', 'https://i.ibb.co/jRQWJ60/download-1.png'),
('Barcelona', 'Spain', 'Europe', '1899', 'Camp Nou', 'https://i.ibb.co/yk09GGp/1200px-FC-Barcelona-crest-svg.png'),
('Atlético Madrid', 'Spain', 'Europe', '1903', 'Wanda Metropolitano', 'https://i.ibb.co/sPPWf54/Atletico-Madrid-logo-svg.png'),
('Valencia', 'Spain', '1919', 'Europe', 'Mestalla Stadium', 'https://i.ibb.co/tQ5vQPF/images-1.png');



INSERT INTO league (name, founded, number_of_teams, champion, region, country, image) VALUES 
('Saudi Professional League', '1976', '16', 'Alhilal', 'Asia', 'Saudi Arabia', 'https://i.ibb.co/ZVKRHyy/download.png'),
('Premier League', '1992', '20', 'Manchester City', 'Europe', 'England', 'https://i.ibb.co/R0wjMJv/premierleaguelogo0802a.jpg'),
('La Liga', '1929', '20', 'FC Barcelona', 'Europe', 'Spain', 'https://i.ibb.co/1Z3Qtxk/la-liga-logo-redesign.png');

INSERT INTO standings(matches_played, win, draw, lose, goals_for, goals_against, goals_difference, points, teams_id, league_id) VALUES
(9, 1, 3, 5, 10, 23, -13, 6, 2, 1),
(9, 6, 2, 1, 20, 9, 11, 20, 1, 1);

