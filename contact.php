<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $subject = htmlspecialchars(trim($_POST["subject"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Validate email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo '<script>alert("Invalid email address: ' . $email . '"); window.location = "index.html";</script>';
        exit();
    }

    // Compose the email message
    $subject = "Enquiry from Contact Form";
    $messageBody = "Name: $name\n";
    $messageBody .= "Email: $email\n";
    $messageBody .= "subject : $subject\n";
    $messageBody .= "Message:\n$message";

    // Replace with your own email address
    $to = "yaksh.darji313@svkmmumbai.onmicrosoft.com";

    // Send the email
    $headers = "From: Dcyber TechLab <noreply@example.com>";

    if (mail($to, $subject, $messageBody, $headers)) {
        echo '<script>alert("Thank you for your submission!"); window.location = "index.html";</script>';
    } else {
        echo '<script>alert("Sorry, there was an error processing your request. Please try again later."); window.location = "index.html";</script>';
    }
} else {
    echo '<script>alert("Invalid request."); window.location = "index.html";</script>';
}
?>
