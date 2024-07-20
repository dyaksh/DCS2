<?php
header('Content-Type: application/json');

$imageDirectoryClients = 'assets/img/clients'; // Directory path for client images
$imageDirectoryPartners = 'assets/img/partners'; // Directory path for partner images

$images = [];
$type = isset($_GET['type'])? $_GET['type'] : 'clients';

if ($type === 'clients') {
    $imageDirectory = $imageDirectoryClients;
} elseif ($type === 'partners') {
    $imageDirectory = $imageDirectoryPartners;
} else {
    // Handle unknown type or fallback
    $imageDirectory = $imageDirectoryClients; // Default to clients if type is not specified or recognized
}

// Fetch images from the specified directory
foreach (glob($imageDirectory. '/*.{jpg,jpeg,png,gif,svg,webp,ico}', GLOB_BRACE) as $image) {
    $images[] = ['path' => $image, 'name' => basename($image)]; // Adjust the structure as per your needs
}

if (empty($images)) {
    http_response_code(404);
    echo json_encode(['error' => 'No images found']);
} else {
    echo json_encode($images);
}
?>