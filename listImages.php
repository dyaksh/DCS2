<?php

// Define directory paths for images
$imageDirectoryClients = 'assets/img/clients';
$imageDirectoryPartners = 'assets/img/partners';

// Initialize an empty string to store image HTML
$imageHTML = '';

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
        $imageName = basename($image);
        $imageHTML .= "<img src='$image' alt='$imageName'>";
    }
    // Output image HTML
    echo $imageHTML;
} else {
    // Output error message if directory doesn't exist
    http_response_code(404);
    echo '<p>Image directory not found</p>';
}
?>