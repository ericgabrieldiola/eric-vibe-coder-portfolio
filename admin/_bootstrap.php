<?php
declare(strict_types=1);
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_name('vibe_admin_session');
    session_set_cookie_params(['httponly'=>true,'secure'=>isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off','samesite'=>'Strict','path'=>'/']);
    session_start();
}
require_once __DIR__ . '/../backend/config/database.php';
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');
function require_admin(): void { if (empty($_SESSION['admin_id'])) { header('Location: login.php'); exit; } }
function csrf_token(): string { if (empty($_SESSION['csrf'])) $_SESSION['csrf']=bin2hex(random_bytes(32)); return $_SESSION['csrf']; }
function verify_csrf(): void { if (!hash_equals($_SESSION['csrf'] ?? '', (string)($_POST['csrf'] ?? ''))) { http_response_code(419); exit('Session expired. Go back and try again.'); } }
function h(string $s): string { return htmlspecialchars($s, ENT_QUOTES|ENT_SUBSTITUTE, 'UTF-8'); }
