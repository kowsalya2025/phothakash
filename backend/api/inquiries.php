<?php
/**
 * API: Retrieve All Inquiries (Admin View)
 * Akash Photography Backend
 * 
 * Endpoint: GET /api/inquiries.php
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

// Accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method Not Allowed. Only GET requests are accepted.'
    ]);
    exit();
}

try {
    $pdo = Database::getConnection();

    $stmt = $pdo->query("
        SELECT id, name, email, phone, whatsapp, event_date, event_type, location, message, status, created_at
        FROM inquiries
        ORDER BY id DESC
    ");

    $inquiries = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'count'   => count($inquiries),
        'data'    => $inquiries
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to fetch inquiries: ' . $e->getMessage()
    ]);
}
