<?php
// Run from CLI only: php database/create_admin.php admin 'use-a-strong-password'
if (PHP_SAPI !== 'cli') { http_response_code(403); exit("CLI only.\n"); }
require_once __DIR__ . '/../backend/config/database.php';
if ($argc < 3) { fwrite(STDERR, "Usage: php database/create_admin.php <username> <strong-password>\n"); exit(1); }
$username=trim($argv[1]); $password=$argv[2];
if (!preg_match('/^[A-Za-z0-9_.-]{3,80}$/',$username) || strlen($password)<12) { fwrite(STDERR,"Username must be 3-80 safe characters and password at least 12 characters.\n"); exit(1); }
$q=db()->prepare('INSERT INTO admins(username,password_hash) VALUES(:u,:p)');
$q->execute(['u'=>$username,'p'=>password_hash($password,PASSWORD_DEFAULT)]);
echo "Admin account created. Keep the password private and remove it from shell history if necessary.\n";
