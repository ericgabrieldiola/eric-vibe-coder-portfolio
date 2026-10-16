<?php
declare(strict_types=1);

/**
 * Database connection provider.
 * Supports standard local development (XAMPP) as well as cloud deployment (Render, Aiven, etc.)
 * via environment variables. Credentials remain strictly outside source code.
 */
function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $port = getenv('DB_PORT') ?: '3306';
    $name = getenv('DB_NAME') ?: 'vibe_coder_portfolio';
    $user = getenv('DB_USER') ?: 'root';
    $pass = getenv('DB_PASS') !== false ? (string)getenv('DB_PASS') : '';
    $sslCa = getenv('DB_SSL_CA') ?: '';

    $dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    if ($sslCa !== '') {
        if (file_exists($sslCa)) {
            $options[PDO::MYSQL_ATTR_SSL_CA] = $sslCa;
        } else {
            error_log('Database configuration: DB_SSL_CA path specified but file not found: ' . $sslCa);
        }
    }

    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        error_log('Database connection error: ' . $e->getMessage());
        throw new RuntimeException('Database connection failed. Please verify database availability and configuration.');
    }

    return $pdo;
}

function json_response(array $data, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
