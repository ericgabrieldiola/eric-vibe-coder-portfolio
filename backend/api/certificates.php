<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';
try { json_response(['ok'=>true,'certificates'=>db()->query('SELECT id,title,issuer,issued_on,file_path FROM certificates WHERE is_visible=1 ORDER BY sort_order,id')->fetchAll()]); }
catch(Throwable $e){ error_log('Certificates API: '.$e->getMessage()); json_response(['ok'=>false,'message'=>'Certificates are temporarily unavailable.'],500); }
