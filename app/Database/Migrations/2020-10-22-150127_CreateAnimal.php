<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateAnimal extends Migration {
  public function up() {
    $this->forge->addField([
      'animal_id' => [
        'type' => 'INT',
        'unsigned' => true,
        'auto_increment' => true,
      ],
      'type' => [
        'type' => 'ENUM(\'cat\', \'dog\', \'bird\')',
      ],
      'name' => [
        'type' => 'VARCHAR',
        'constraint' => '200',
        'unique' => true,
      ],
      'birth_day' => [
        'type' => 'DATE',
      ],
      'sex' => [
        'type' => 'INT',
        'constraint' => 1,
      ],
      'weight' => [
        'type' => 'FLOAT',
      ],
      'country' => [
        'type' => 'VARCHAR',
        'constraint' => '200',
      ],
      'owner' => [
        'type' => 'VARCHAR',
        'constraint' => '200',
      ],
    ]);
    $this->forge->addKey('animal_id', true);
    $this->forge->createTable('animals');
  }

  public function down() {
    $this->forge->dropTable('animals');
  }
}
