<?php

/**
 * @file
 * Contains Drupal\social_image_share\Form\SettingsForm.
 */

namespace Drupal\social_image_share\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class SettingsForm.
 *
 * @package Drupal\social_image_share\Form
 */
class SettingsForm extends ConfigFormBase {
  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'social_image_share.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('social_image_share.settings');
    $form['custom_elements'] = array(
      '#type' => 'textarea',
      '#title' => $this->t('Custom Elements'),
      '#default_value' => $config->get('custom_elements'),
      '#placeholder' => 'Enter the list of elements as css selectors seperated by a comma. Example:- img, video'
    );
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }
  
  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);
    $this->config('social_image_share.settings')
      ->set('custom_elements', $form_state->getValue('custom_elements'))
      ->save();
  }
  
}
