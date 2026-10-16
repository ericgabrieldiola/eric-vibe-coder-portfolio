<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';
try { json_response(['ok'=>true,'skills'=>db()->query('SELECT id,name,level,category FROM skills WHERE is_visible=1 ORDER BY sort_order,id')->fetchAll()]); }
catch(Throwable $e){ error_log('Skills API: '.$e->getMessage()); json_response(['ok'=>false,'message'=>'Skills are temporarily unavailable.'],500); }
