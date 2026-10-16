<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

// Method check
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_response(['ok' => false, 'message' => 'POST request method required.'], 405);
}

// Origin validation: ensure request is same-host or valid local loopback
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
if ($origin) {
    $originHost = parse_url($origin, PHP_URL_HOST);
    $currentHost = preg_replace('/:\d+$/', '', $host);
    $isLocal = in_array($originHost, ['localhost', '127.0.0.1', '::1'], true) && in_array($currentHost, ['localhost', '127.0.0.1', '::1'], true);
    if ($originHost !== $currentHost && !$isLocal) {
        json_response(['ok' => false, 'message' => 'Request origin rejected.'], 403);
    }
}

// Parse request payload (supports JSON body and form-urlencoded POST)
$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    $data = $_POST;
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

// Sensible validation with clear feedback
if ($name === '') {
    json_response(['ok' => false, 'message' => 'Please enter your name.'], 422);
}
if (mb_strlen($name) > 100) {
    json_response(['ok' => false, 'message' => 'Name must be 100 characters or fewer.'], 422);
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['ok' => false, 'message' => 'Please enter a valid email address.'], 422);
}
if (mb_strlen($email) > 190) {
    json_response(['ok' => false, 'message' => 'Email address must be 190 characters or fewer.'], 422);
}
if ($message === '') {
    json_response(['ok' => false, 'message' => 'Please enter a message.'], 422);
}
if (mb_strlen($message) > 5000) {
    json_response(['ok' => false, 'message' => 'Message must be 5,000 characters or fewer.'], 422);
}

// Insert into contact_messages table
try {
    $stmt = db()->prepare('INSERT INTO contact_messages (name, email, message, ip_hash) VALUES (:name, :email, :message, :ip_hash)');
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    $stmt->execute([
        'name' => $name,
        'email' => $email,
        'message' => $message,
        'ip_hash' => $ip ? hash('sha256', $ip) : null
    ]);
    json_response(['ok' => true, 'message' => 'Thank you! Your message has been saved successfully.']);
} catch (Throwable $e) {
    error_log('Portfolio contact API error: ' . $e->getMessage());
    json_response([
        'ok' => false,
        'message' => 'Unable to save your message right now. Please try again later or reach out via email directly.'
    ], 500);
}
