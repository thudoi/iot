<?php
/**
 * Created by PhpStorm.
 * User: nhanl
 * Date: 12/18/2017
 * Time: 9:46 PM
 */

namespace Drupal\iot_ielts\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;

/**
 * Provides a 'our test' Block.
 *
 * @Block(
 *   id = "ourtests",
 *   admin_label = @Translation("Out Tests"),
 *   category = @Translation("Our Tests"),
 * )
 */
class OurTests extends BlockBase
{

  /**
   * {@inheritdoc}
   * @return array
   */
  public function build()
  {
    $nids = \Drupal::entityQuery('node')
        ->condition('type', 'service')
        ->condition('status', 1)
        ->condition('field_service_type','test')
        ->sort('created', 'ASC')
        ->execute();
    $nodes = \Drupal\node\Entity\Node::loadMultiple($nids);
    $services = [];
    foreach ($nodes as $node) {
      $services[] = $node;
    }
    return [
        '#theme' => ['iot_our_tests'],
        '#nodes' => $services,
    ];
  }

}
