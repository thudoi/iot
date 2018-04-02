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
 *   id = "profile",
 *   admin_label = @Translation("Profile"),
 *   category = @Translation("Profile"),
 * )
 */
class Profile extends BlockBase
{

  /**
   * {@inheritdoc}
   * @return array
   */
  public function build()
  {
      return [
          '#markup'=>'<a class="use-ajax click-profile-build" data-dialog-type="modal" href="/account/build/profile"></a>',
          '#attached' => array(
              'library' => array(
                  'iot_user/iot_account',
              ),
          )
      ];
  }

}
