<?php

$receiving_email_address = 'yakshdarji2@gmail.com';

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Validate and sanitize form data
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die('Invalid email address.');
}

$name = htmlspecialchars(strip_tags($name));
$email = htmlspecialchars(strip_tags($email));
$subject = htmlspecialchars(strip_tags($subject));
$message = htmlspecialchars(strip_tags($message));

// Create the email headers
$headers = "From: $name <$email>" . "\r\n" .
           "Reply-To: $email" . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

// Create the email body
$email_body = "You have received a new message from your website contact form.\n\n";
$email_body .= "Here are the details:\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Subject: $subject\n";
$email_body .= "Message:\n$message\n";

// Send the email
if (mail($receiving_email_address, $subject, $email_body, $headers)) {
    echo 'Your message has been sent. Thank you!';
} else {
    echo 'Sorry, something went wrong. Please try again later.';
}

?>
