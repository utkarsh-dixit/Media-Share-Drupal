<?php
/**
 * @file
 * Contains Drupal\media_share\Form\SettingsForm.
 */
namespace Drupal\media_share\Form;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
/**
 * Class SettingsForm.
 *
 * @package Drupal\media_share\Form
 */
class SettingsForm extends ConfigFormBase {
  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'media_share.settings',
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
    $config = $this->config('media_share.settings');
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
    $this->config('media_share.settings')
      ->set('custom_elements', $form_state->getValue('custom_elements'))
      ->save();
  }
  
}
