<?php
header('Content-Type: application/json');

$imageDirectory = 'assets/img/';

if (isset($_GET['type'])) {
  $type = $_GET['type'];
  switch ($type) {
    case 'clients':
      $imageDirectory .= 'clients/';
      break;
    case 'partners':
      $imageDirectory .= 'partners/';
      break;
    default:
      http_response_code(400);
      echo json_encode(['error' => 'Invalid type']);
      exit;
  }
} else {
  http_response_code(400);
  echo json_encode(['error' => 'Type parameter is required']);
  exit;
}

// Disable error reporting to prevent any warnings or errors from being outputted
error_reporting(0);
ini_set('display_errors', 0);

$images = [];
foreach (glob($imageDirectory . '*.{jpg,jpeg,png,gif,svg,webp,ico}', GLOB_BRACE) as $image) {
  $images[] = ['path' => $image, 'name' => basename($image)];
}

if (empty($images)) {
  http_response_code(404);
  echo json_encode(['error' => 'No images found']);
} else {
  echo json_encode($images);
}
?>
