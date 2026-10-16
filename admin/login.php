<?php
require_once __DIR__.'/_bootstrap.php';
if (!empty($_SESSION['admin_id'])) { header('Location: dashboard.php'); exit; }
$error='';
if ($_SERVER['REQUEST_METHOD']==='POST') {
    verify_csrf();
    $username=trim((string)($_POST['username']??'')); $password=(string)($_POST['password']??'');
    try {
        $q=db()->prepare('SELECT id,username,password_hash FROM admins WHERE username=:u LIMIT 1'); $q->execute(['u'=>$username]); $admin=$q->fetch();
        if ($admin && password_verify($password,$admin['password_hash'])) {
            session_regenerate_id(true); $_SESSION['admin_id']=(int)$admin['id']; $_SESSION['admin_username']=$admin['username'];
            $up=db()->prepare('UPDATE admins SET last_login=NOW() WHERE id=:id'); $up->execute(['id'=>$admin['id']]);
            header('Location: dashboard.php'); exit;
        }
        usleep(300000); $error='Invalid username or password.';
    } catch(Throwable $e) { error_log('Admin login: '.$e->getMessage()); $error='Database connection failed. Check local setup instructions.'; }
}
?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin Login | Vibe Coder</title><link rel="stylesheet" href="admin.css"></head><body><main class="login-card"><a class="brand" href="../index.html">E. <span>VIBE CODER</span></a><h1>Admin access</h1><p>Sign in to manage portfolio content and messages.</p><?php if($error): ?><div class="alert"><?=h($error)?></div><?php endif; ?><form method="post"><input type="hidden" name="csrf" value="<?=h(csrf_token())?>"><label>Username<input name="username" autocomplete="username" required maxlength="80"></label><label>Password<input type="password" name="password" autocomplete="current-password" required></label><button type="submit">Sign in securely</button></form><p class="muted">Local development only until deployment security is reviewed.</p><a href="../index.html">← Back to portfolio</a></main></body></html>
