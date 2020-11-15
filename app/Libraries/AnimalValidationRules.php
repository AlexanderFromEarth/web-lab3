<?php namespace App\Libraries;

class AnimalValidationRules {
  public function name($str, &$error = null) {
    if (
      !preg_match(
        "/^[a-zA-Zа-яА-ЯёЁ]+ [a-zA-Zа-яА-ЯёЁ]+ [a-zA-Zа-яА-ЯёЁ]+$/u",
        $str
      )
    ) {
      $error = 'not 3 words';
      return false;
    } else {
      return true;
    }
  }
  public function owner($str, &$error = null) {
    if (!preg_match("/^[a-zA-Zа-яА-ЯёЁ]+ [a-zA-Zа-яА-ЯёЁ]+$/u", $str)) {
      $error = 'not 2 words';
      return false;
    } else {
      return true;
    }
  }
  public function country($str, &$error = null) {
    if (!preg_match("/^([a-zA-Zа-яА-Яеё]+ ?)+$/u", $str)) {
      $error = 'not words';
      return false;
    } else {
      return true;
    }
  }
}
