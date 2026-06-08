-- Code Holdings Limited - Database Schema
-- MySQL 8.0+

CREATE DATABASE IF NOT EXISTS codeholdings;
USE codeholdings;

-- Projects table
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  location VARCHAR(255),
  description TEXT,
  type VARCHAR(100),
  floors INT,
  apt_per_floor INT,
  land_area VARCHAR(100),
  apt_size VARCHAR(255),
  bedrooms INT,
  bathrooms INT,
  facing VARCHAR(100),
  completion_status ENUM('Ongoing','Completed','Upcoming') DEFAULT 'Ongoing',
  furnished_status ENUM('Furnished','Unfurnished','Semi-Furnished') DEFAULT 'Unfurnished',
  land_share TINYINT(1) DEFAULT 0,
  featured_image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Project images table
CREATE TABLE project_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  caption VARCHAR(255),
  sort_order INT DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Services table
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(100),
  sort_order INT DEFAULT 0
);

-- Contact inquiries table
CREATE TABLE inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  email VARCHAR(255),
  subject VARCHAR(255),
  message TEXT,
  project_interest VARCHAR(255),
  status ENUM('new','read','replied') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stats table
CREATE TABLE stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  value INT NOT NULL,
  sort_order INT DEFAULT 0
);

-- Seed data
INSERT INTO projects (name, slug, location, description, type, floors, apt_per_floor, land_area, apt_size, bedrooms, bathrooms, facing, completion_status, furnished_status, land_share) VALUES
('Code Green Villa', 'code-green-villa', 'West Manipur, Mirpur, Dhaka', 'A premium living experience with 1600 sqft cosy living area, Code Green Villa is a perfect investment for your home.', 'Residential', 8, 2, '5 Katha', 'Type-A 1600 sft', 3, 3, 'North', 'Ongoing', 'Unfurnished', 1),
('Code Rawshanara Heights', 'code-rawshanara-heights', 'North Pirerbag, Mirpur, Dhaka', 'Rawshanara Heights is located close to Agargaon - the vibrant centre of Dhaka city. Each flat comes with 1500+ sqft.', 'Residential', 10, 2, '5 Katha', 'Type-A 1500 sft', 3, 3, 'South', 'Ongoing', 'Unfurnished', 1),
('Code Jolly Tower', 'code-jolly-tower', 'Gazipur', 'Jolly Tower is a spacious living destination for the people of Gazipur. The space is surrounded by greenery and close to Dhaka.', 'Residential', 9, 2, '4 Katha', 'Type-A 1400 sft', 3, 2, 'East', 'Upcoming', 'Unfurnished', 0),
('Code Brishti Bilash', 'code-brishti-bilash', 'Road #04, House# 08, Block-C, Future Town, Bosila, Mohammadpur, Dhaka-1207', '10 Storied (G+09) Residential Building with premium amenities.', 'Residential', 10, 2, '5 Katha', 'Type-A 1600 sft, Type-B 1600 sft (Approx.)', 3, 3, 'North', 'Ongoing', 'Unfurnished', 1);

INSERT INTO services (title, slug, description, icon, sort_order) VALUES
('Construction', 'construction', 'As a leading construction company, we take pride in our expertise and knowledge. We specialize in building construction, interior design, renovation, and project management.', 'building', 1),
('Design', 'design', 'We are committed to providing innovative and functional design solutions that meet the unique needs of our clients. Our design services are tailored from exteriors to interiors.', 'ruler', 2),
('Consultation', 'consultation', 'Are you planning to buy your dream house or give your land to a developer company? We are here to help you! Consult with our experts for free.', 'messages', 3),
('Property Buy-Sell', 'property-buy-sell', 'We offer comprehensive property buying and selling services to help our clients navigate the complex real estate market in Bangladesh with transparency and professionalism.', 'home', 4),
('Halal Investment', 'halal-investment', 'As a Shariah-compliant company, Code Holdings Ltd. offers halal investment opportunities for individuals who are looking to invest their money in a responsible and ethical manner.', 'shield', 5);

INSERT INTO stats (label, value, sort_order) VALUES
('Satisfied Clients', 70, 1),
('Graduate Engineers', 15, 2),
('Upcoming Projects', 10, 3);
