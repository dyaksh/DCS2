<?php
header('Content-Type: application/json');

// Define directory paths for images
$imageDirectoryClients = 'assets/img/clients';
$imageDirectoryPartners = 'assets/img/partners';

// Initialize an empty array to store image data
$images = [];
$type = isset($_GET['type']) ? $_GET['type'] : 'clients';

// Set the image directory based on the 'type' parameter
if ($type === 'clients') {
    $imageDirectory = $imageDirectoryClients;
} elseif ($type === 'partners') {
    $imageDirectory = $imageDirectoryPartners;
} else {
    // Handle unknown type or fallback to clients directory
    $imageDirectory = $imageDirectoryClients;
}

// Check if the directory exists
if (is_dir($imageDirectory)) {
    // Fetch images from the specified directory
    foreach (glob($imageDirectory . '/*.{jpg,jpeg,png,gif,svg,webp,ico}', GLOB_BRACE) as $image) {
        $images[] = ['path' => $image, 'name' => basename($image)];
    }
    // Send JSON response with image data
    echo json_encode($images);
} else {
    // Send JSON response with error message if directory doesn't exist
    http_response_code(404);
    echo json_encode(['error' => 'Image directory not found']);
}
?>
