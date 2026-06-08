<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'codeholdings');

// Site configuration
define('SITE_NAME', 'Code Holdings Limited');
define('SITE_URL', 'http://localhost/codeholdings');
define('WHATSAPP_NUMBER', '+8801789555500');
define('PHONE', '+880 1789-555500');
define('EMAIL', 'codeholdingsltd@gmail.com');
define('ADDRESS', 'Apt. A-1, House-3/10, Block-F, Lalmatia, Dhaka-1207');

function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(['error' => 'Database connection failed']));
        }
    }
    return $pdo;
}
?>
