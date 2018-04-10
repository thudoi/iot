<?php
/**
 * @file
 * A database agnostic dump for testing purposes.
 */

use Drupal\Core\Database\Database;

$connection = Database::getConnection();

$connection->schema()->createTable('path_redirect', ['fields' => ['rid' => ['type' => 'serial', 'not null' => TRUE, 'size' => 'normal',], 'source' => ['type' => 'varchar', 'length' => 255, 'not null' => TRUE,], 'redirect' => ['type' => 'varchar', 'length' => 255, 'not null' => TRUE,], 'query' => ['type' => 'varchar', 'length' => 255, 'not null' => FALSE,], 'fragment' => ['type' => 'varchar', 'length' => 50, 'not null' => FALSE,], 'language' => ['type' => 'varchar', 'length' => 12, 'not null' => TRUE, 'default' => '',], 'type' => ['type' => 'int', 'size' => 'small', 'not null' => TRUE,], 'last_used' => ['type' => 'int', 'unsigned' => TRUE, 'not null' => TRUE, 'default' => 0,],], 'primary key' => ['rid'], 'unique keys' => ['source_language' => ['source', 'language']], 'mysql_character_set' => 'utf8',]);


$connection->insert('path_redirect')->fields(['rid', 'source', 'redirect', 'query', 'fragment', 'language', 'type', 'last_used',])->values(['rid' => 5, 'source' => 'test/source/url', 'redirect' => 'test/redirect/url', 'query' => NULL, 'fragment' => NULL, 'language' => '', 'type' => 301, 'last_used' => 1449497138,])->values(['rid' => 7, 'source' => 'test/source/url2', 'redirect' => 'http://test/external/redirect/url', 'query' => 'foo=bar&biz=buz', 'fragment' => NULL, 'language' => 'en', 'type' => 302, 'last_used' => 1449497139,])->execute();
