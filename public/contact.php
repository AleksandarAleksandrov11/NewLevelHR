<?php
/**
 * NewLevelHR contact form endpoint for classic PHP hosting (PHP 8+).
 * Same request/response contract as api/contact.js (Vercel):
 *   POST application/json or application/x-www-form-urlencoded
 *   { name, email, company?, topic, message, consent, website (honeypot), ts, lang, token? }
 *   -> { ok: true } | { ok: false, error: "method"|"spam"|"rate_limit"|"validation"|"config"|"send", fields?: {...} }
 *
 * Configuration (in order of precedence):
 *   1. Environment variables CONTACT_TO, CONTACT_FROM, CONTACT_TOKEN
 *   2. contact.config.php next to this file (see contact.config.example.php)
 *   3. Defaults below
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$config = ['to' => 'info@newlevelhr.com', 'from' => 'noreply@' . ($_SERVER['SERVER_NAME'] ?? 'newlevelhr.com'), 'token' => ''];
$configFile = __DIR__ . '/contact.config.php';
if (is_file($configFile)) {
    $fileConfig = include $configFile;
    if (is_array($fileConfig)) { $config = array_merge($config, $fileConfig); }
}
foreach (['to' => 'CONTACT_TO', 'from' => 'CONTACT_FROM', 'token' => 'CONTACT_TOKEN'] as $key => $env) {
    $value = getenv($env);
    if ($value !== false && $value !== '') { $config[$key] = $value; }
}

const TOPICS = ['fractional', 'hiring', 'coaching', 'compliance', 'general'];
const LANGS = ['en', 'de', 'bg'];
const MAX_NAME = 120; const MAX_EMAIL = 200; const MAX_COMPANY = 160; const MAX_MESSAGE = 5000; const MIN_MESSAGE = 10;
const MIN_FILL_MS = 3000;
const RATE_WINDOW = 3600; const RATE_MAX = 5;

function respond(int $status, array $payload): never {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method']);
}

/* Read body (JSON or form-encoded) */
$body = [];
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false) {
    $raw = file_get_contents('php://input') ?: '';
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) { $body = $decoded; }
} else {
    $body = $_POST;
}
$field = static fn(string $k): string => is_scalar($body[$k] ?? null) ? (string) $body[$k] : '';

/* Shared secret (optional) */
if ($config['token'] !== '' && !hash_equals((string) $config['token'], $field('token'))) {
    respond(403, ['ok' => false, 'error' => 'spam']);
}

/* Honeypot: bots fill the hidden "website" field. Silently accept. */
if (trim($field('website')) !== '') {
    respond(200, ['ok' => true]);
}

/* Timing: the form sets ts (ms) on load; anything faster than MIN_FILL_MS is a bot. */
$ts = (float) $field('ts');
if ($ts <= 0 || (microtime(true) * 1000 - $ts) < MIN_FILL_MS) {
    respond(400, ['ok' => false, 'error' => 'spam']);
}

/* Rate limit: file-based, per hashed IP */
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip = trim(explode(',', $ip)[0]);
$bucket = sys_get_temp_dir() . '/nlhr-rate-' . hash('sha256', $ip) . '.json';
$now = time();
$hits = [];
if (is_file($bucket)) {
    $stored = json_decode((string) file_get_contents($bucket), true);
    if (is_array($stored)) { $hits = array_values(array_filter($stored, static fn($t) => is_int($t) && $now - $t < RATE_WINDOW)); }
}
if (count($hits) >= RATE_MAX) {
    respond(429, ['ok' => false, 'error' => 'rate_limit']);
}
$hits[] = $now;
@file_put_contents($bucket, json_encode($hits), LOCK_EX);

/* Validation */
$clean = static fn(string $v, int $max): string => mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', $v) ?? ''), 0, $max);
$name = $clean($field('name'), MAX_NAME);
$email = $clean($field('email'), MAX_EMAIL);
$company = $clean($field('company'), MAX_COMPANY);
$topic = $clean($field('topic'), 40);
$message = mb_substr(trim($field('message')), 0, MAX_MESSAGE);
$consent = in_array(strtolower($field('consent')), ['on', 'true', '1', 'yes'], true);
$lang = in_array($field('lang'), LANGS, true) ? $field('lang') : 'en';

$errors = [];
if ($name === '') { $errors['name'] = 'required'; }
if ($email === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false) { $errors['email'] = 'email'; }
if (!in_array($topic, TOPICS, true)) { $errors['topic'] = 'required'; }
if (mb_strlen($message) < MIN_MESSAGE) { $errors['message'] = 'minLength'; }
if (!$consent) { $errors['consent'] = 'consent'; }
if ($errors !== []) {
    respond(422, ['ok' => false, 'error' => 'validation', 'fields' => $errors]);
}

/* Send */
$to = (string) $config['to'];
$from = (string) $config['from'];
if ($to === '' || filter_var($from, FILTER_VALIDATE_EMAIL) === false) {
    respond(503, ['ok' => false, 'error' => 'config']);
}
$subjectPlain = "[NewLevelHR] {$topic} - {$name}" . ($company !== '' ? " ({$company})" : '');
$subject = '=?UTF-8?B?' . base64_encode($subjectPlain) . '?=';
$text = implode("\n", [
    "Name: {$name}",
    "Email: {$email}",
    'Company: ' . ($company !== '' ? $company : '-'),
    "Topic: {$topic}",
    "Language: {$lang}",
    "IP: {$ip}",
    '',
    $message,
]);
$headers = [
    'From: NewLevelHR <' . $from . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: NewLevelHR contact form',
];
$sent = @mail($to, $subject, $text, implode("\r\n", $headers));
if (!$sent) {
    error_log('NewLevelHR contact form: mail() failed');
    respond(502, ['ok' => false, 'error' => 'send']);
}
respond(200, ['ok' => true]);
