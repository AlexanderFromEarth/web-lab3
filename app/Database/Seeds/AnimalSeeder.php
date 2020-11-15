<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class AnimalSeeder extends Seeder {
  public function run() {
    $model = new \App\Models\AnimalModel();
    $cnt = 1000;
    while ($cnt > 0) {
      $data = $model->generate($cnt);
      if (is_array($data)) {
        foreach ($data as $rec) {
          if (!$model->createRecord($rec->toRawArray())) {
            $model->errors(true);
            $model->validation->reset();
          } else {
            $cnt -= 1;
          }
        }
      } else {
        if (!$model->createRecord($data->toRawArray())) {
          $model->errors(true);
          $model->validation->reset();
        } else {
          $cnt -= 1;
        }
      }
    }
  }
}
