<?php

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
      echo 'Invalid type';
      exit;
  }
} else {
  http_response_code(400);
  echo 'Type parameter is required';
  exit;
}

$html = '';
foreach (glob($imageDirectory . '*.{jpg,jpeg,png,gif,svg,webp,ico}', GLOB_BRACE) as $image) {
  $imagePath = htmlspecialchars($image);
  $imageName = htmlspecialchars(basename($image));
  $html .= "<img src='$imagePath' alt='$imageName'>";
}

if (empty($html)) {
  http_response_code(404);
  echo 'No images found';
} else {
  echo $html;
}
?>