<?php
require_once 'config.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$action = $_GET['action'] ?? '';

switch ($action) {

    // GET all projects
    case 'get_projects':
        $db = getDB();
        $stmt = $db->query("SELECT * FROM projects ORDER BY created_at DESC");
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    // GET single project by slug
    case 'get_project':
        $slug = $_GET['slug'] ?? '';
        if (!$slug) { echo json_encode(['error' => 'Slug required']); break; }
        $db = getDB();
        $stmt = $db->prepare("SELECT * FROM projects WHERE slug = ?");
        $stmt->execute([$slug]);
        $project = $stmt->fetch();
        if (!$project) { echo json_encode(['error' => 'Project not found']); break; }
        // Get images
        $img = $db->prepare("SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order");
        $img->execute([$project['id']]);
        $project['images'] = $img->fetchAll();
        echo json_encode(['success' => true, 'data' => $project]);
        break;

    // GET all services
    case 'get_services':
        $db = getDB();
        $stmt = $db->query("SELECT * FROM services ORDER BY sort_order");
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    // GET stats
    case 'get_stats':
        $db = getDB();
        $stmt = $db->query("SELECT * FROM stats ORDER BY sort_order");
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    // POST contact inquiry
    case 'contact':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode(['error' => 'POST required']); break;
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $name    = htmlspecialchars(trim($input['name'] ?? ''));
        $phone   = htmlspecialchars(trim($input['phone'] ?? ''));
        $email   = htmlspecialchars(trim($input['email'] ?? ''));
        $subject = htmlspecialchars(trim($input['subject'] ?? ''));
        $message = htmlspecialchars(trim($input['message'] ?? ''));
        $project_interest = htmlspecialchars(trim($input['project_interest'] ?? ''));

        if (!$name || !$phone) {
            echo json_encode(['error' => 'Name and phone are required']); break;
        }

        $db = getDB();
        $stmt = $db->prepare(
            "INSERT INTO inquiries (name, phone, email, subject, message, project_interest)
             VALUES (?, ?, ?, ?, ?, ?)"
        );
        $stmt->execute([$name, $phone, $email, $subject, $message, $project_interest]);
        echo json_encode(['success' => true, 'message' => 'Inquiry submitted successfully']);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Invalid action']);
}
?>
