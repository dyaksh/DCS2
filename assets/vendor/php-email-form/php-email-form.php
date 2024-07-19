<?php

class PHP_Email_Form {
  public $to = '';
  public $from_name = '';
  public $from_email = '';
  public $subject = '';
  public $ajax = false;
  private $messages = array();

  public function add_message($message, $label, $max = 0) {
    $this->messages[] = array(
      'message' => $message,
      'label' => $label,
      'max' => $max
    );
  }

  public function send() {
    $email_text = "You have a new message from your website contact form\n===================================\n";
    foreach ($this->messages as $m) {
      $email_text .= $m['label'] . ": " . $m['message'] . "\n";
    }

    $headers = 'From: ' . $this->from_name . ' <' . $this->from_email . '>' . "\r\n" . 'Reply-To: ' . $this->from_email;

    if ($this->ajax) {
      return mail($this->to, $this->subject, $email_text, $headers) ? 'OK' : 'Could not send email';
    } else {
      return mail($this->to, $this->subject, $email_text, $headers);
    }
  }
}
?>
