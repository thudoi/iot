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
 * Provides a 'Facts' Block.
 *
 * @Block(
 *   id = "footerbar",
 *   admin_label = @Translation("Footer Bar"),
 *   category = @Translation("Footer Bar"),
 * )
 */
class FooterBar extends BlockBase
{

  /**
   * {@inheritdoc}
   * @return array
   */
  public function build()
  {
    return [
        '#theme' => ['iot_footer_bar'],
    ];
  }

}