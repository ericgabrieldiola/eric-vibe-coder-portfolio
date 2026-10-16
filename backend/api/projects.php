<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';
header('Cache-Control: no-store');
try {
    $stmt = db()->query('SELECT id, title, slug, summary, tech_stack, project_url, image_path, status FROM projects WHERE is_published = 1 ORDER BY sort_order, id DESC');
    json_response(['ok'=>true, 'projects'=>$stmt->fetchAll()]);
} catch (Throwable $e) {
    error_log('Portfolio projects API: '.$e->getMessage());
    json_response(['ok'=>false, 'message'=>'Projects are temporarily unavailable.'], 500);
}
