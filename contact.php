<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Collect and sanitize form data
    $name = htmlspecialchars(trim($_GET['name']));
    $email = htmlspecialchars(trim($_GET['email']));
    $subject = htmlspecialchars(trim($_GET['subject']));
    $message = htmlspecialchars(trim($_GET['message']));

    // Recipient email
    $to = 'yakshdarji2@gmail.com';
    $subject = "Contact Form Submission: $subject";

    // Email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Subject: $subject\n";
    $email_content .= "Message:\n$message\n";

    // Email headers
    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        echo 'OK';
    } else {
        echo 'There was a problem sending the email.';
    }
} else {
    // Not a GET request
    echo 'Invalid request.';
}
?>
