<?php
/**
 * API: Photography Session Inquiry Submission
 * Akash Photography Backend
 * 
 * Endpoint: POST /api/inquiry.php
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method Not Allowed. Only POST requests are accepted.'
    ]);
    exit();
}

// Read raw body if sent as JSON, or fallback to $_POST
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// Extract fields
$name      = isset($data['name']) ? trim($data['name']) : '';
$email     = isset($data['email']) ? trim($data['email']) : '';
$phone     = isset($data['phone']) ? trim($data['phone']) : '';
$whatsapp  = isset($data['whatsapp']) ? trim($data['whatsapp']) : '';
$date      = isset($data['date']) ? trim($data['date']) : '';
$eventType = isset($data['eventType']) ? trim($data['eventType']) : '';
$location  = isset($data['location']) ? trim($data['location']) : '';
$message   = isset($data['message']) ? trim($data['message']) : '';

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Your Name is required.';
}
if (empty($email)) {
    $errors[] = 'Your Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please provide a valid email address.';
}
if (empty($phone)) {
    $errors[] = 'Phone Number is required.';
}
if (empty($date)) {
    $errors[] = 'Event Date is required.';
}
if (empty($eventType)) {
    $errors[] = 'Event Type is required.';
}
if (empty($location)) {
    $errors[] = 'Event Location is required.';
}
if (empty($message)) {
    $errors[] = 'Please share more details about your event.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Validation error',
        'errors'  => $errors,
        'error'   => implode(' ', $errors)
    ]);
    exit();
}

try {
    $pdo = Database::getConnection();

    $stmt = $pdo->prepare("
        INSERT INTO inquiries (name, email, phone, whatsapp, event_date, event_type, location, message, status)
        VALUES (:name, :email, :phone, :whatsapp, :event_date, :event_type, :location, :message, 'new')
    ");

    $stmt->execute([
        ':name'       => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
        ':email'      => $email,
        ':phone'      => htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
        ':whatsapp'   => htmlspecialchars($whatsapp, ENT_QUOTES, 'UTF-8'),
        ':event_date' => htmlspecialchars($date, ENT_QUOTES, 'UTF-8'),
        ':event_type' => htmlspecialchars($eventType, ENT_QUOTES, 'UTF-8'),
        ':location'   => htmlspecialchars($location, ENT_QUOTES, 'UTF-8'),
        ':message'    => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
    ]);

    $inquiryId = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for contacting Akash Photography! Your inquiry has been received. Our team will review your event details and reach out within 24 hours.',
        'inquiry_id' => $inquiryId,
        'data' => [
            'id'        => $inquiryId,
            'name'      => $name,
            'email'     => $email,
            'eventType' => $eventType,
            'date'      => $date
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to save inquiry: ' . $e->getMessage()
    ]);
}
