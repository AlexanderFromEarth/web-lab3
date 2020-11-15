<?php namespace Tests\Support\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\Test\Fabricator;

class AnimalTestSeeder extends Seeder {
  public function run() {
    $model = new \Tests\Support\Models\AnimalFabricator();
    $fabricator = new Fabricator($model);
    foreach (range(1, 100000) as $i) {
      while (!$model->createRecord($fabricator->make()->toRawArray())) {
        $model->errors(true);
        $model->validation->reset();
      }
    }
  }
}
