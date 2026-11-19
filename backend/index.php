<?php
/**
 * Akash Photography API Index & Health Check
 */

require_once __DIR__ . '/config/cors.php';

echo json_encode([
    'status'      => 'online',
    'app'         => 'Akash Photography Backend API',
    'version'     => '1.0.0',
    'timestamp'   => date('c'),
    'endpoints'   => [
        'POST /api/inquiry.php'       => 'Submit a photography session inquiry',
        'GET  /api/inquiries.php'     => 'List all submitted inquiries (Admin)',
        'GET  /api/services.php'      => 'Fetch photography services list',
        'GET  /api/testimonials.php'  => 'Fetch client testimonials'
    ]
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
