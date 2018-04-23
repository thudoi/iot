# IOT

Welcome to the IOT project

> Requiring PHP 7.1 in Drupal 8.4.0 is a bug and will be resolved. Drupal 8.4 requirements will be brought in line with the previous releases. See [#2898119: Doctrine/Common 2.8 requires PHP ~7.1](https://www.drupal.org/node/2898119)

## Quick start

1. Clone this repo

Assuming `$HOME/iot` is used for this project

```
git clone https://github.com/thudoi/iot.git $HOME/iot
```

2. Run `composer install`

```
cd $HOME/iot && composer install -vvv
```

3. Change your web server's DocumentRoot to  `$HOME/iot/web`

4. How to install a module/theme.

For example: [Drupal Commerce](https://www.drupal.org/project/commerce), the latest version is `8.x-2.0`.

```
cd $HOME/iot && composer require drupal/commerce:2.0 -vvv
```

More information please visit links blow:

- [Composer template for Drupal projects](https://github.com/drupal-composer/drupal-project)
- [Using Composer to manage Drupal site dependencies
](https://www.drupal.org/docs/develop/using-composer/using-composer-to-manage-drupal-site-dependencies)

## Recommended collaboration workflow

Creat your own fork, keep your local fork in sync with this [repo](https://github.com/thudoi/iot), creat PR for your updates.

- Fork this repo. Please visit [https://github.com/thudoi/iot](https://github.com/thudoi/iot) and click `Fork` button on the top right.
- [Create a local clone of your fork](https://help.github.com/articles/fork-a-repo/#step-2-create-a-local-clone-of-your-fork)
- [Syncing a fork](https://help.github.com/articles/syncing-a-fork/)
- [Creating a pull request](https://help.github.com/articles/creating-a-pull-request/)
