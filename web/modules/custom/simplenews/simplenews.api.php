<?php

/**
 * @file
 * Hooks provided by the Simplenews module.
 */

/**
 * @mainpage Simplenews API documentation.
 * Simplenews builds on the following basic concepts.
 * @link subscriber Subscribers @endlink subscribe to @link newsletter
 * newsletters (categories) @endlink. That connection is called
 * a @link subscription subscription @endlink. Nodes of enabled content types
 * are @link issue newsletter issues @endlink. These are then sent to the
 * subscribers of the newsletter the issue is attached to.
 * Sending is done by first adding a row for each subscriber to the @link spool
 * mail spool @endlink.
 * Then they are processed either immediatly or during cron runs. The actual
 * sending happens through a @link source source instance @endlink, which is
 * first instanciated based on the mail spool and then used to generated the
 * actual mail content.
 */

/**
 * @defgroup subscriber Subscriber
 * @todo
 */

/**
 * @defgroup newsletter (category)
 * @todo
 */

/**
 * @defgroup subscription Subscription
 * @todo
 */

/**
 * @defgroup issue Newsletter issue
 * @todo
 */

/**
 * @defgroup spool Mail spool
 * @todo
 */

/**
 * @defgroup source Source
 * @todo
 */

/**
 * Return operations to be applied to newsletter issues.
 *
 * @ingroup issue
 */
function hook_simplenews_issue_operations() {
  $operations = [
    'activate' => [
      'label' => t('Send'),
      'callback' => 'simplenews_issue_send',
    ],
  ];
  return $operations;
}

/**
 * Return operations to be applied to subscriptions.
 *
 * @ingroup issue
 */
function hook_simplenews_subscription_operations() {
  $operations = [
    'activate' => [
      'label' => t('Activate'),
      'callback' => 'simplenews_subscription_activate',
      'callback arguments' => [\Drupal\simplenews\SubscriberInterface::ACTIVE],
    ],
    'inactivate' => [
      'label' => t('Inactivate'),
      'callback' => 'simplenews_subscription_activate',
      'callback arguments' => [\Drupal\simplenews\SubscriberInterface::INACTIVE],
    ],
    'delete' => [
      'label' => t('Delete'),
      'callback' => 'simplenews_subscription_delete_multiple',
    ],
  ];
  return $operations;
}

/**
 * Act after a newsletter category has been saved.
 *
 * @ingroup newsletter
 */
function hook_simplenews_newsletter_update(SimplenewsNewsletter $newsletter) {

}

/**
 * Act after a newsletter category has been deleted.
 *
 * @ingroup newsletter
 */
function hook_simplenews_newsletter_delete(SimplenewsNewsletter $newsletter) {

}

/**
 * Act after a newsletter category has been inserted.
 *
 * @ingroup newsletter
 */
function hook_simplenews_newsletter_insert(SimplenewsNewsletter $newsletter) {

}

/**
 * Act after a subscriber is updated.
 *
 * @ingroup subscriber
 */
function hook_simplenews_subscriber_update(SimplenewsSubscriber $subscriber) {

}

/**
 * Act after a new subscriber has been created.
 *
 * @ingroup subscriber
 */
function hook_simplenews_subscriber_insert(SimplenewsSubscriber $subscriber) {

}

/**
 * Act after a subscriber has been deleted.
 *
 * @ingroup subscriber
 */
function hook_simplenews_subscriber_delete(SimplenewsSubscriber $subscriber) {

}

/**
 * Invoked if a subscriber is subscribed to a newsletter.
 *
 * @param $subscriber
 *   The subscriber object including all subscriptions of this user.
 * @param $subscription
 *   The subscription object for this specific subscribe action.
 *
 * @ingroup subscriber
 */
function hook_simplenews_subscribe_user(SimplenewsSubscriber $subscriber, $subscription) {

}

/**
 * Invoked if a subscriber is unsubscribed from a newsletter.
 *
 * @param $subscriber
 *   The subscriber object including all subscriptions of this user.
 * @param $subscription
 *   The subscription object for this specific unsubscribe action.
 *
 * @ingroup subscriber
 */
function hook_simplenews_unsubscribe(SimplenewsSubscriber $subscriber, $subscription) {

}

/**
 * Expose SimplenewsSource cache implementations.
 *
 * @return
 *   An array keyed by the name of the class that provides the implementation,
 *   the array value consists of another array with the keys label and
 *   description.
 * @ingroup source
 */
function hook_simplenews_source_cache_info() {
  return [
    'SimplenewsSourceCacheNone' => [
      'label' => t('No caching'),
      'description' => t('This allows to theme each newsletter separately.'),
    ],
    'SimplenewsSourceCacheBuild' => [
      'label' => t('Cached content source'),
      'description' => t('This caches the rendered content to be sent for multiple recipients. It is not possible to use subscriber specific theming but tokens can be used for personalization.'),
    ],
  ];
}
