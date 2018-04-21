<?php

/**
 * @file
 * Views interface for simplenews.
 */

use Drupal\field\FieldStorageConfigInterface;

/**
 * Implements hook_field_views_data().
 */
function simplenews_field_views_data(FieldStorageConfigInterface $field_storage) {
  $data = views_field_default_views_data($field_storage);
  foreach ($data as $table_name => $table_data) {
    // Add the filters for newsletters and subscriber status.
    $data[$table_name][$field_storage->getName() . '_target_id']['filter']['id'] = 'in_operator';
    $data[$table_name][$field_storage->getName() . '_target_id']['filter']['options callback'] = 'simplenews_newsletter_list';
    if ($field_storage->getType() == 'simplenews_subscription') {
      $data[$table_name][$field_storage->getName() . '_status']['filter']['id'] = 'in_operator';
      $data[$table_name][$field_storage->getName() . '_status']['filter']['options callback'] = 'simplenews_subscriber_status_list';
    }
  }
  return $data;
}

/**
 * Implements hook_views_data().
 */
function simplenews_views_data() {

  $data['node']['send_status'] = [
    'real field' => 'nid',
    'field' => [
      'title' => t('Send status'),
      'help' => t('Send status of the newsletter.'),
      'id' => 'simplenews_send_status',
    ],
    'group' => t('Content'),
  ];

  /* ------------ Definitions for Simplenews mailspool ---------------------- */

  $data['simplenews_mail_spool']['table'] = [
    'base' => [
      'field' => 'msid',
      'title' => t('Simplenews mailspool'),
      'help' => t('Spool for temporary storage of newsletter emails.'),
      'weight' => 10,
      'database' => 'default',
    ],
    'group' => t('Simplenews spool'),
  ];

  $data['simplenews_mail_spool']['msid'] = [
    'title' => t('Ms ID'),
    'help' => t('The primary identifier for a mail spool record.'),
    'field' => [
      'handler' => 'views_handler_field_numeric',
      'click sortable' => TRUE,
    ],
    'filter' => [
      'handler' => 'views_handler_filter_numeric',
      'allow empty' => TRUE,
    ],
    'argument' => ['handler' => 'views_handler_argument_numeric',],
    'sort' => ['handler' => 'views_handler_sort',],
  ];

  $data['simplenews_mail_spool']['mail'] = [
    'title' => t('Subscriber'),
    'help' => t('The formatted email address of mail message receipient.'),
    'field' => ['handler' => 'views_handler_field', 'click sortable' => TRUE,],
    'filter' => [
      'handler' => 'views_handler_filter_string',
      'allow empty' => TRUE,
    ],
    'argument' => ['handler' => 'views_handler_argument_string',],
    'sort' => ['handler' => 'views_handler_sort',],
  ];

  $data['simplenews_mail_spool']['nid'] = [
    'title' => t('Node ID'),
    'help' => t('The {node}.nid of this newsletter.'),
    'field' => [
      'handler' => 'views_handler_field_numeric',
      'click sortable' => TRUE,
    ],
    'filter' => [
      'handler' => 'views_handler_filter_numeric',
      'allow empty' => TRUE,
    ],
    'argument' => ['handler' => 'views_handler_argument_numeric',],
    'sort' => ['handler' => 'views_handler_sort',],
    'relationship' => [
      'handler' => 'views_handler_relationship',
      'base' => 'node',
      'base field' => 'nid',
      'label' => t('Node'),
    ],
  ];

  $data['simplenews_mail_spool']['newsletter_id'] = [
    'title' => t('Newsletter ID'),
    'help' => t('The newsletter_id this newsletter issue belongs to.'),
    'field' => [
      'handler' => 'views_handler_field_numeric',
      'click sortable' => TRUE,
    ],
    'filter' => [
      'handler' => 'views_handler_filter_numeric',
      'allow empty' => TRUE,
    ],
    'argument' => ['handler' => 'views_handler_argument_numeric',],
    'sort' => ['handler' => 'views_handler_sort',],
    'relationship' => [
      'handler' => 'views_handler_relationship',
      'base' => 'simplenews_newsletter',
      'base field' => 'newsletter_id',
      'label' => t('Newsletter'),
    ],
  ];

  $data['simplenews_mail_spool']['snid'] = [
    'title' => t('Subscriber ID'),
    'help' => t('The {simplenews_subscriber}.snid foreign key for this spool'),
    'field' => [
      'handler' => 'views_handler_field_numeric',
      'click sortable' => TRUE,
    ],
    'filter' => [
      'handler' => 'views_handler_filter_numeric',
      'allow empty' => TRUE,
    ],
    'argument' => ['handler' => 'views_handler_argument_numeric',],
    'sort' => ['handler' => 'views_handler_sort',],
    'relationship' => [
      'handler' => 'views_handler_relationship',
      'base' => 'simplenews_subscriber',
      'base field' => 'snid',
      'label' => t('Subscriber'),
    ],
  ];

  $data['simplenews_mail_spool']['status'] = [
    'title' => t('Sent status'),
    'help' => t('The sent status of the email (0 = hold, 1 = pending, 2 = done).'),
    'field' => [
      'handler' => 'simplenews_handler_field_newsletter_status',
      'click sortable' => TRUE,
    ],
    'filter' => [
      'handler' => 'simplenews_handler_filter_newsletter_status',
      'allow empty' => TRUE,
    ],
    'argument' => ['handler' => 'views_handler_argument_numeric',],
    'sort' => ['handler' => 'views_handler_sort',],
  ];

  $data['simplenews_mail_spool']['error'] = [
    'title' => t('Error'),
    'help' => t('A boolean indicating whether an error occured while sending the email.'),
    'field' => [
      'handler' => 'views_handler_field_boolean',
      'click sortable' => TRUE,
    ],
    'filter' => [
      'handler' => 'views_handler_filter_boolean_operator',
      'allow empty' => TRUE,
    ],
    'argument' => ['handler' => 'views_handler_argument_numeric',],
    'sort' => ['handler' => 'views_handler_sort',],
  ];

  $data['simplenews_mail_spool']['timestamp'] = [
    'title' => t('Timestamp'),
    'help' => t('The time status was set or changed.'),
    'field' => [
      'handler' => 'views_handler_field_date',
      'click sortable' => TRUE,
    ],
    'filter' => [
      'handler' => 'views_handler_filter_date',
      'allow empty' => TRUE,
    ],
    'argument' => ['handler' => 'views_handler_argument_date',],
    'sort' => ['handler' => 'views_handler_sort_date',],
  ];

  $data['simplenews_mail_spool']['data'] = [
    'title' => t('Data'),
    'help' => t('A serialized array of name value pairs that are related to the email address.'),
    'field' => ['handler' => 'views_handler_field', 'click sortable' => TRUE,],
    'filter' => [
      'handler' => 'views_handler_filter_string',
      'allow empty' => TRUE,
    ],
    'argument' => ['handler' => 'views_handler_argument_string',],
    'sort' => ['handler' => 'views_handler_sort',],
  ];

  return $data;
}
