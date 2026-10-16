CREATE DATABASE IF NOT EXISTS vibe_coder_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vibe_coder_portfolio;

CREATE TABLE IF NOT EXISTS admins (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS projects (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  summary VARCHAR(2000) NOT NULL,
  tech_stack VARCHAR(500) NULL,
  project_url VARCHAR(2048) NULL,
  image_path VARCHAR(500) NULL,
  is_published TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS skills (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  level VARCHAR(80) NOT NULL DEFAULT 'Beginner / learning',
  category VARCHAR(100) NULL,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS certificates (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  issuer VARCHAR(200) NULL,
  issued_on DATE NULL,
  file_path VARCHAR(500) NOT NULL,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL,
  message TEXT NOT NULL,
  ip_hash CHAR(64) NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contact_read_created (is_read, created_at)
) ENGINE=InnoDB;

INSERT INTO projects(title,slug,summary,tech_stack,project_url,image_path,sort_order)
SELECT 'School Supply Inventory & Sales Management System','school-supply-inventory-sales','Academic inventory-system project covering products, suppliers, stock movement, and dashboard summaries.','Web application; database-backed', 'https://inventory-management-system-production-7080.up.railway.app/','assets/projects/inventory-dashboard.png',1
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug='school-supply-inventory-sales');
INSERT INTO skills(name,level,category,sort_order)
SELECT 'HTML, CSS, JavaScript','Beginner / currently learning','Web',1 WHERE NOT EXISTS(SELECT 1 FROM skills WHERE name='HTML, CSS, JavaScript');
INSERT INTO skills(name,level,category,sort_order)
SELECT 'PHP and MySQL','Beginner / currently learning','Backend',2 WHERE NOT EXISTS(SELECT 1 FROM skills WHERE name='PHP and MySQL');
INSERT INTO skills(name,level,category,sort_order)
SELECT 'Git and GitHub','Beginner / currently learning','Tools',3 WHERE NOT EXISTS(SELECT 1 FROM skills WHERE name='Git and GitHub');
INSERT INTO certificates(title,issuer,file_path,sort_order)
SELECT 'DEVCON Bits of Light Roadshow — Frontend Forge','DEVCON','assets/certificates/devcon-bits-of-light.jpg',1 WHERE NOT EXISTS(SELECT 1 FROM certificates WHERE title='DEVCON Bits of Light Roadshow — Frontend Forge');
INSERT INTO certificates(title,issuer,file_path,sort_order)
SELECT 'Code.org Hour of AI — Mix & Move with AI','Code.org','assets/certificates/mix-move-with-ai.jpg',2 WHERE NOT EXISTS(SELECT 1 FROM certificates WHERE title='Code.org Hour of AI — Mix & Move with AI');
INSERT INTO certificates(title,issuer,file_path,sort_order)
SELECT 'BSIT Seminar-Workshop 2026: Code + Communicate','Torres Capitol College, Inc.','assets/certificates/bsit-seminar-workshop-2026.pdf',3 WHERE NOT EXISTS(SELECT 1 FROM certificates WHERE title='BSIT Seminar-Workshop 2026: Code + Communicate');
INSERT INTO certificates(title,issuer,file_path,sort_order)
SELECT 'Digital Danger Zone: Protecting Yourself in the Age of Digital Deception','Training certificate','assets/certificates/digital-danger-zone.pdf',4 WHERE NOT EXISTS(SELECT 1 FROM certificates WHERE title='Digital Danger Zone: Protecting Yourself in the Age of Digital Deception');
