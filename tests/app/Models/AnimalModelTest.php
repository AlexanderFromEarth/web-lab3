<?php namespace Tests\App\Models;

use CodeIgniter\Test\CIDatabaseTestCase;

class AnimalModelTest extends CIDatabaseTestCase {
  protected $refresh = true;
  protected $seed = 'Tests\Support\Database\Seeds\AnimalTestSeeder';
  protected $namespace = 'App\\';

  public function setUp(): void {
    $benchmark = \Config\Services::timer();
    $benchmark->start('all tests');
    $benchmark->start('inserting');
    parent::setUp();
    $benchmark->stop('inserting');
  }

  public function testInsertion() {
    $this->seeNumRecords(100000, 'animals', []);
  }

  public function tearDown(): void {
    $benchmark = \Config\Services::timer();
    $benchmark->start('dropping');
    parent::tearDown();
    $benchmark->stop('dropping');
    $benchmark->stop('all tests');
    foreach ($benchmark->getTimers() as $key => $timer) {
      echo "\n" . $key . ": " . $timer['duration'] . "\n";
    }
  }
}
