<?php namespace App\Entities;

use CodeIgniter\Entity;

class Animal extends Entity {
  private $sexes = ['female', 'male'];

  public function getSex() {
    return $this->sexes[(int) $this->attributes['sex']];
  }

  public function setSex($sex) {
    $this->attributes['sex'] = \array_search($sex, $this->sexes);
    return $this;
  }
}
