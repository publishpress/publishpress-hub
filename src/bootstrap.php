<?php
require_once __DIR__ . '/Hub.php';

$publishpressHub = new \PublishPress\Hub\Hub();
$publishpressHub->init();

return $publishpressHub;
