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
 * Provides a 'Support' Block.
 *
 * @Block(
 *   id = "searchTips",
 *   admin_label = @Translation("Search Tips"),
 *   category = @Translation("Search Tips"),
 * )
 */
class SearchTips extends BlockBase
{

  /**
   * {@inheritdoc}
   * @return array
   */
  public function build()
  {
    $get = false;
    if(isset($_GET['title'])){
      $get = $_GET['title'];
    }
    return [
        '#theme' => ['iot_search_tips'],
        '#get' => $get,
    ];
  }

}