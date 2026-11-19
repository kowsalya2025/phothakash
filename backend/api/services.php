<?php
/**
 * API: Photography Services Catalog
 * Akash Photography Backend
 * 
 * Endpoint: GET /api/services.php
 */

require_once __DIR__ . '/../config/cors.php';

$services = [
    [
        'id' => 1,
        'title' => 'Wedding Photography',
        'subtitle' => 'Your special day, our focus',
        'category' => 'Wedding',
        'desc' => 'Comprehensive cinematic wedding coverage capturing traditional ceremonies, joyful tears, and timeless marital vows in high resolution.'
    ],
    [
        'id' => 2,
        'title' => 'Pre-Wedding Photography',
        'subtitle' => 'Love In Every Frame',
        'category' => 'Couple',
        'desc' => 'Dreamy outdoor portraits with artistic direction and stunning natural landscapes celebrating your personal love story.'
    ],
    [
        'id' => 3,
        'title' => 'Engagement & Roka Ceremony',
        'subtitle' => 'A New Beginning',
        'category' => 'Ceremony',
        'desc' => 'Capturing the official promise, ring exchange, and heartfelt family blessings in elegant style.'
    ],
    [
        'id' => 4,
        'title' => 'Haldi Ceremony',
        'subtitle' => 'Tradition in Every Splash',
        'category' => 'Ceremony',
        'desc' => 'Vibrant golden hues, spontaneous laughter, and playful turmeric splashes immortalized in dynamic action shots.'
    ],
    [
        'id' => 5,
        'title' => 'Mehendi Ceremony',
        'subtitle' => 'Art on Your Hands',
        'category' => 'Ceremony',
        'desc' => 'Intricate macro photography celebrating artistic henna designs, bridal adornments, and musical festivities.'
    ],
    [
        'id' => 6,
        'title' => 'Sangeet & Reception',
        'subtitle' => 'Dance, Celebrate, Repeat',
        'category' => 'Celebration',
        'desc' => 'High-energy stage performances, choreography beats, and royal reception glamour under sparkling chandeliers.'
    ],
    [
        'id' => 7,
        'title' => 'Portrait Photography',
        'subtitle' => 'Timeless Expressions',
        'category' => 'Portraits',
        'desc' => 'Classic and contemporary portraits with studio lighting that highlight authentic emotions and timeless elegance.'
    ],
    [
        'id' => 8,
        'title' => 'Fashion & Model Photography',
        'subtitle' => 'Style in Every Shot',
        'category' => 'Fashion',
        'desc' => 'Editorial and commercial fashion shoots with creative lighting, professional styling, and dynamic poses.'
    ],
    [
        'id' => 9,
        'title' => 'Cocktail & Pool Party Photography',
        'subtitle' => 'Vibes, Shots & Cheers',
        'category' => 'Celebration',
        'desc' => 'Candid celebratory moments, pool party toasts, and lively party atmospheres captured in crisp vivid detail.'
    ]
];

echo json_encode([
    'success' => true,
    'count'   => count($services),
    'data'    => $services
]);
