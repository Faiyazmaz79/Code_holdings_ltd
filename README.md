# Code Holdings Limited — Website

A full-stack real estate website for Code Holdings Limited.

## Tech Stack
- **Frontend**: HTML5, CSS3 (custom properties, grid, flexbox), Vanilla JavaScript (SPA router)
- **Backend**: PHP 8+ with PDO
- **Database**: MySQL 8.0+

## Project Structure
```
codeholdings/
├── index.html          ← Main SPA entry point (all 5 pages)
├── css/
│   └── style.css       ← Full stylesheet with animations & responsive design
├── js/
│   └── main.js         ← SPA router, API calls, animations, project modal
├── php/
│   ├── config.php      ← DB credentials & site config
│   └── api.php         ← REST API (projects, services, stats, contact)
├── database.sql        ← Full schema + seed data
└── README.md
```

## Pages (Single Page Application)
| Page | Description |
|------|-------------|
| Home | Hero, About strip, Stats, Services preview, Projects preview, CTA |
| About | Company story, Stats, Journey (Starting Humble / Going Strong / Future) |
| Services | Construction, Design, Consultation, Property Buy-Sell, Halal Investment |
| Projects | All projects grid + Code Brishti Bilash detail + Project updates |
| Contact | Contact form (PHP + MySQL), contact info |

## Setup Instructions

### 1. Database
```sql
mysql -u root -p < database.sql
```

### 2. PHP Config
Edit `php/config.php` and update:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'your_mysql_user');
define('DB_PASS', 'your_mysql_password');
define('DB_NAME', 'codeholdings');
```

### 3. Web Server
Deploy to Apache/Nginx with PHP support.
- Place the folder in your web root (e.g. `/var/www/html/codeholdings`)
- Access at: `http://localhost/codeholdings/`

For local dev with XAMPP/WAMP:
- Place in `htdocs/codeholdings`
- Start Apache + MySQL
- Import `database.sql` via phpMyAdmin

### 4. Static Mode (No PHP)
The site works fully without PHP! The JavaScript falls back to static project data automatically.

## API Endpoints
```
GET  php/api.php?action=get_projects          → all projects
GET  php/api.php?action=get_project&slug=...  → single project
GET  php/api.php?action=get_services          → all services
GET  php/api.php?action=get_stats             → stats numbers
POST php/api.php?action=contact               → submit inquiry (JSON body)
```

## Features
- Responsive (mobile-first)
- Animated counters (70 clients, 15 engineers, 10 projects)
- Project detail modal with all specs
- Smooth scroll fade-up animations
- WhatsApp integration
- Contact form with PHP/MySQL storage + JS fallback
- Dark footer with dark hero sections
- Green (#2eab6f) brand color throughout
