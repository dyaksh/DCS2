<?php

$receiving_email_address = 'resume@dcyber.in';

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];
$college = $_POST['college'];
$qualification = $_POST['qualification'];
$domain = $_POST['domain'];
$type = $_POST['type'];

// Handle resume upload
$resume = $_FILES['resume'];
$resume_path = 'uploads/' . basename($resume['name']);

if (move_uploaded_file($resume['tmp_name'], $resume_path)) {
    $resume_url = $resume_path;
} else {
    die('Failed to upload resume.');
}

// Create the email headers
$headers = "From: $name <$email>" . "\r\n" .
           "Reply-To: $email" . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

// Create the email body
$email_body = "You have received a new career inquiry.\n\n";
$email_body .= "Here are the details:\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Mobile: $mobile\n";
$email_body .= "College: $college\n";
$email_body .= "Qualification: $qualification\n";
$email_body .= "Domain: $domain\n";
$email_body .= "Type: $type\n";
$email_body .= "Resume: $resume_url\n";

// Send the email
if (mail($receiving_email_address, "New Career Inquiry from $name", $email_body, $headers)) {
    echo 'Your message has been sent. Thank you!';
} else {
    echo 'Sorry, something went wrong. Please try again later.';
}

?>
