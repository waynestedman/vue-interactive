<?php 

  function isValidEmail($str) {
    return filter_var($str, FILTER_VALIDATE_EMAIL);
  }

  $emails = isset($_POST["emails"]) && is_array($_POST["emails"]) ? $_POST["emails"] : [];

  $valid_emails = array_filter($emails, "isValidEmail");

  header("Content-Type: application/json");
  echo json_encode($valid_emails);

?>