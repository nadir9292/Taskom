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

INSERT INTO scrum_steps (title, list_of_id_sprint, color) VALUES
('Backlog', ARRAY['1', '2'], '#ffb3ba'),
('To Do', ARRAY['3', '4'], '#ffdfba'),
('In Progress', ARRAY['5'], '#ffffba'),
('Done', ARRAY['6', '7'], '#baffc9');

INSERT INTO scrum_tabs (title, list_of_scrum_step_id, color) VALUES
('Scrum tab 1', ARRAY['1', '2', '3', '4'], '	#bae1ff'),
('Scrum tab 2', ARRAY['4'], '	#bae1ff'),
('Scrum tab 3', ARRAY['1', '3'], '	#bae1ff');

INSERT INTO sprints (title, tag, short_description, long_description, start_date, end_date, list_of_members_id, history, color) VALUES
('Sprint Alpha', 'ALPHA', 'Premier sprint du projet', 'Ce sprint inclut les bases du projet.', '2025-01-01 09:00:00', '2025-01-15 18:00:00', ARRAY['1','2','3'], ARRAY['Création','Initialisation'], '#FF5733'),
('Sprint Beta', 'BETA', 'Ajout des fonctionnalités principales', 'On implémente le cœur du projet.', '2025-01-16 09:00:00', '2025-01-30 18:00:00', ARRAY['2','3','4'], ARRAY['Développement','Test unitaire'], '#33C1FF'),
('Sprint Gamma', 'GAMMA', 'Focus sur l’expérience utilisateur', 'Amélioration du design et de l’ergonomie.', '2025-02-01 09:00:00', '2025-02-14 18:00:00', ARRAY['1','4','5'], ARRAY['UI','UX'], '#33FFAA'),
('Sprint Delta', 'DELTA', 'Optimisation du backend', 'Refactorisation et optimisation des services.', '2025-02-15 09:00:00', '2025-02-28 18:00:00', ARRAY['3','4','6'], ARRAY['Refactor','Perf tests'], '#FF33A6'),
('Sprint Epsilon', 'EPS', 'Sprint correctif', 'Corrections des bugs remontés.', '2025-03-01 09:00:00', '2025-03-07 18:00:00', ARRAY['1','2'], ARRAY['Bugs','QA'], '#A633FF'),
('Sprint Zeta', 'ZETA', 'Sécurité et gestion des accès', 'Ajout des rôles utilisateurs et permissions.', '2025-03-08 09:00:00', '2025-03-21 18:00:00', ARRAY['5','6','7'], ARRAY['Auth','Security'], '#33FFA6'),
('Sprint Eta', 'ETA', 'Documentation projet', 'Rédaction de la documentation technique.', '2025-03-22 09:00:00', '2025-04-01 18:00:00', ARRAY['4','7'], ARRAY['Docs','Wiki'], '#FF8F33'),
('Sprint Theta', 'THETA', 'Tests utilisateurs', 'Retour utilisateurs sur la V1.', '2025-04-02 09:00:00', '2025-04-10 18:00:00', ARRAY['1','3','6'], ARRAY['User tests','Feedback'], '#FF3333'),
('Sprint Iota', 'IOTA', 'Déploiement en staging', 'Préparation pour la mise en production.', '2025-04-11 09:00:00', '2025-04-17 18:00:00', ARRAY['2','5','6'], ARRAY['CI/CD','Docker'], '#3385FF'),
('Sprint Kappa', 'KAPPA', 'Sprint de maintenance', 'Nettoyage du code et mises à jour.', '2025-04-18 09:00:00', '2025-04-25 18:00:00', ARRAY['1','4','7'], ARRAY['Cleanup','Upgrade'], '#85FF33'),
('Sprint Lambda', 'LAMBDA', 'Ajout fonctionnalités secondaires', 'Ajout de fonctions non essentielles mais utiles.', '2025-04-26 09:00:00', '2025-05-05 18:00:00', ARRAY['2','3','5'], ARRAY['Features','Feedback'], '#FFAF33'),
('Sprint Mu', 'MU', 'Audit de code', 'Vérification de la qualité et standards.', '2025-05-06 09:00:00', '2025-05-13 18:00:00', ARRAY['1','6','7'], ARRAY['Audit','Quality'], '#3385FF'),
('Sprint Nu', 'NU', 'Optimisation front-end', 'Chargement, animations, composants.', '2025-05-14 09:00:00', '2025-05-20 18:00:00', ARRAY['3','4','6'], ARRAY['Perf','UX'], '#FF3399'),
('Sprint Xi', 'XI', 'Sécurité avancée', 'Protection contre les attaques XSS, CSRF.', '2025-05-21 09:00:00', '2025-05-30 18:00:00', ARRAY['2','5','7'], ARRAY['Security','Audit'], '#33FFD7'),
('Sprint Omicron', 'OMIC', 'Finalisation du produit', 'Derniers ajustements avant release.', '2025-06-01 09:00:00', '2025-06-15 18:00:00', ARRAY['1','2','3','4','5'], ARRAY['Finalisation','Release'], '#FF6633'),
('Sprint Pi', 'PI', 'Prototype rapide', 'Création d’un prototype fonctionnel pour les démos.', '2025-06-16 09:00:00', '2025-06-23 18:00:00', ARRAY['2','3'], ARRAY['Prototype','Pitch'], '#FFDD33'),
('Sprint Rho', 'RHO', 'Intégration API externe', 'Connexion avec une API de paiement.', '2025-06-24 09:00:00', '2025-07-01 18:00:00', ARRAY['1','4','6'], ARRAY['API','Webhooks'], '#33FFDD'),
('Sprint Sigma', 'SIG', 'Refonte visuelle', 'Nouvelle charte graphique et design system.', '2025-07-02 09:00:00', '2025-07-10 18:00:00', ARRAY['3','5'], ARRAY['Design','Refonte'], '#DD33FF'),
('Sprint Tau', 'TAU', 'Accessibilité', 'Mise en conformité avec les normes WCAG.', '2025-07-11 09:00:00', '2025-07-18 18:00:00', ARRAY['2','4','7'], ARRAY['A11Y','Tests'], '#33DDFF'),
('Sprint Upsilon', 'UPS', 'Amélioration mobile', 'Optimisation pour les appareils mobiles.', '2025-07-19 09:00:00', '2025-07-26 18:00:00', ARRAY['1','3','5'], ARRAY['Responsive','Mobile first'], '#FF33DD'),
('Sprint Phi', 'PHI', 'Retours client', 'Prise en compte des premiers retours utilisateurs.', '2025-07-27 09:00:00', '2025-08-03 18:00:00', ARRAY['4','6'], ARRAY['Feedback','Analyse'], '#AAFF33'),
('Sprint Chi', 'CHI', 'Mise en production', 'Déploiement officiel sur l’environnement de prod.', '2025-08-04 09:00:00', '2025-08-11 18:00:00', ARRAY['2','3','7'], ARRAY['Release','Hotfix'], '#FF4444'),
('Sprint Psi', 'PSI', 'Formation équipe', 'Onboarding des nouveaux développeurs.', '2025-08-12 09:00:00', '2025-08-19 18:00:00', ARRAY['1','4','5'], ARRAY['Docs','Support'], '#33AAFF'),
('Sprint Omega', 'OMG', 'Sprint libre', 'Sprint pour les tâches secondaires ou créatives.', '2025-08-20 09:00:00', '2025-08-27 18:00:00', ARRAY['3','6'], ARRAY['Libre','POC'], '#FFA533'),
('Sprint Phoenix', 'PHNX', 'Test de charge', 'Simulation de trafic élevé.', '2025-08-28 09:00:00', '2025-09-04 18:00:00', ARRAY['2','5','6'], ARRAY['Stress test','Monitoring'], '#FF3366'),
('Sprint Orion', 'ORION', 'Métriques & Logs', 'Ajout d’outils d’observabilité.', '2025-09-05 09:00:00', '2025-09-12 18:00:00', ARRAY['1','4','7'], ARRAY['Logs','Metrics'], '#66FF33'),
('Sprint Nova', 'NOVA', 'Support multilingue', 'Internationalisation de l’application.', '2025-09-13 09:00:00', '2025-09-20 18:00:00', ARRAY['2','3','5'], ARRAY['i18n','l10n'], '#3366FF'),
('Sprint Vega', 'VEGA', 'Statistiques avancées', 'Ajout de dashboards analytiques.', '2025-09-21 09:00:00', '2025-09-28 18:00:00', ARRAY['4','6','7'], ARRAY['Charts','Analytics'], '#FF8833'),
('Sprint Hydra', 'HYDRA', 'Nettoyage base de données', 'Purge, indexation, archivage.', '2025-09-29 09:00:00', '2025-10-05 18:00:00', ARRAY['1','5','7'], ARRAY['Purge','Optimisation'], '#33FF99'),
('Sprint Atlas', 'ATLAS', 'Évolutions backend', 'Nouvelles routes et refactor logique métier.', '2025-10-06 09:00:00', '2025-10-13 18:00:00', ARRAY['2','3','6'], ARRAY['API','Refonte'], '#9966FF')

