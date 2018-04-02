<?php
/**
 * Created by PhpStorm.
 * User: cadic
 * Date: 12/18/2017
 * Time: 9:46 PM
 */

namespace Drupal\iot_ielts\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;

/**
 * Provides a 'Testimonial' Block.
 *
 * @Block(
 *   id = "testimonial",
 *   admin_label = @Translation("Testimonial"),
 *   category = @Translation("Testimonial"),
 * )
 */
class Testimonial extends BlockBase
{

  /**
   * {@inheritdoc}
   * @return array
   */
  public function build()
  {
    $nids = \Drupal::entityQuery('node')
        ->condition('type', 'testimonial')
        ->condition('status', 1)
        ->sort('created', 'ASC')
        ->execute();
    $nodes = \Drupal\node\Entity\Node::loadMultiple($nids);
    $services = [];
    $times = [];
    foreach ($nodes as $node) {
      $services[] = $node;
      $times[$node->id()] = \Drupal::service('date.formatter')->formatTimeDiffSince($node->getCreatedTime());
    }
    return [
        '#theme' => ['iot_testimonial'],
        '#nodes' => $services,
        '#times' => $times
    ];
  }

}
