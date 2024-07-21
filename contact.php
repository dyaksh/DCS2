<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Your reCAPTCHA secret key
    $recaptchaSecret = 'YOUR_RECAPTCHA_SECRET_KEY';
    $recaptchaResponse = $_POST['recaptcha-response'];

    // Verify reCAPTCHA
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
    $responseKeys = json_decode($response, true);

    if ($responseKeys["success"]) {
        // Form fields
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $subject = htmlspecialchars($_POST['subject']);
        $message = htmlspecialchars($_POST['message']);

        // Recipient email address
        $to = 'yakshdarji2@gmail.com';
        $headers = "From: $email" . "\r\n" .
                   "Reply-To: $email" . "\r\n" .
                   "Content-Type: text/html; charset=UTF-8";

        // Email subject and body
        $emailSubject = "Contact Form Submission: $subject";
        $emailBody = "<html><body>";
        $emailBody .= "<h2>Contact Form Submission</h2>";
        $emailBody .= "<p><strong>Name:</strong> $name</p>";
        $emailBody .= "<p><strong>Email:</strong> $email</p>";
        $emailBody .= "<p><strong>Subject:</strong> $subject</p>";
        $emailBody .= "<p><strong>Message:</strong><br>$message</p>";
        $emailBody .= "</body></html>";

        // Send email
        if (mail($to, $emailSubject, $emailBody, $headers)) {
            echo 'OK';
        } else {
            echo 'Email sending failed.';
        }
    } else {
        echo 'reCAPTCHA verification failed.';
    }
} else {
    echo 'Invalid request method.';
}
?>
