<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Your email address
    $to = 'yakshdarji2@gmail.com';
    
    // Email subject and body
    $email_subject = "Contact Form: $subject";
    $email_body = "You have received a new message from your website contact form.\n\n".
                  "Here are the details:\n".
                  "Name: $name\n".
                  "Email: $email\n".
                  "Message:\n$message";

    // Email headers
    $headers = "From: noreply@yourdomain.com\n";
    $headers .= "Reply-To: $email";

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        http_response_code(200);
        echo "OK";
    } else {
        http_response_code(500);
        echo "Internal Server Error";
    }
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
