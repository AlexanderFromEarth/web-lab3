<?php namespace Tests\Support\Models;

class AnimalFabricator extends \App\Models\AnimalModel {
  protected $genPath = './writable/gen.json';

  public function fake(&$faker) {
    return [
      'name' => $faker->word . ' ' . $faker->firstName . ' ' . $faker->lastName,
      'owner' => $faker->firstName . ' ' . $faker->lastName,
      'country' => $faker->country,
      'type' => $faker->randomElement(['cat', 'dog', 'bird']),
      'sex' => $faker->randomElement([0, 1]),
      'birth_day' => $faker->date,
      'weight' => $faker->randomFloat,
    ];
  }
}
