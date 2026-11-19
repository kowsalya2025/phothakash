<?php
/**
 * API: Client Testimonials
 * Akash Photography Backend
 * 
 * Endpoint: GET /api/testimonials.php
 */

require_once __DIR__ . '/../config/cors.php';

$testimonials = [
    [
        'id' => 1,
        'name' => 'Priya Sharma',
        'quote' => 'Exceptional work! The photos are beyond our expectations.',
        'rating' => 5,
        'avatar' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    ],
    [
        'id' => 2,
        'name' => 'Arun Kumar',
        'quote' => 'Truly professional and creative. Highly recommended!',
        'rating' => 5,
        'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    ],
    [
        'id' => 3,
        'name' => 'Sneha Ramesh',
        'quote' => 'Captured our special moments perfectly. Thank you!',
        'rating' => 5,
        'avatar' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
    ]
];

echo json_encode([
    'success' => true,
    'count'   => count($testimonials),
    'data'    => $testimonials
]);
