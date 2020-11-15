<?php namespace App\Models;

use CodeIgniter\Model;

class AnimalModel extends Model {
  protected $table = 'animals';
  protected $primaryKey = 'animal_id';
  protected $returnType = 'App\Entities\Animal';
  protected $useSoftDeletes = false;

  protected $allowedFields = [
    'name',
    'type',
    'birth_day',
    'sex',
    'weight',
    'country',
    'owner',
  ];

  protected $validationRules = [
    'name' => 'required|is_unique[animals.name,animal_id,{animal_id}]|name',
    'type' => 'required|in_list[cat,dog,bird]',
    'sex' => 'required|in_list[0,1]',
    'birth_day' => 'required|valid_date',
    'country' => 'required|country',
    'owner' => 'required|owner',
    'weight' => 'required|greater_than[0]',
  ];

  protected $genPath = '../writable/gen.json';
  protected $genData;

  public function __construct() {
    parent::__construct();
    $file = new \CodeIgniter\Files\File($this->genPath);
    $f = $file->openFile('r');
    $this->genData = json_decode($f->fread($f->getSize()), true);
  }

  public function createRecord($data = null) {
    if (!$data) {
      $data = $this->generate()->toRawArray();
    }
    if ($this->validate($data)) {
      return $this->builder()->insert($data);
    } else {
      return false;
    }
  }

  public function getList($page, $perPage, $options = null) {
    $count = $this->builder()->countAll();
    $totalPages = ceil($count / $perPage);

    if ($totalPages < $page) {
      throw new \Exception('No data on page');
    }

    $builder = $this->builder();
    if ($options['filterType'] !== null) {
      $builder->where('type', $options['filterType']);
    }
    if ($options['filterCountry'] !== null) {
      $builder->like('country', $options['filterCountry'], 'after');
    }
    if ($options['filterSex'] !== null) {
      $builder->where('sex', $options['filterSex'] === 'female' ? 0 : 1);
    }
    if ($options['filterFDate'] !== null) {
      $builder->where('birth_day >=', $options['filterFDate']);
    }
    if ($options['filterLDate'] !== null) {
      $builder->where('birth_day <=', $options['filterLDate']);
    }
    if ($options['sortField'] !== null && $options['sortDir'] !== null) {
      $builder->orderBy($options['sortField'], $options['sortDir']);
    }
    return [
      $builder
        ->get($perPage, ($page - 1) * $perPage, false)
        ->getResult('App\Entities\Animal'),
      ceil($builder->countAllResults() / $perPage),
    ];
  }

  public function updateRecord($id, $data) {
    if ($this->validate($data)) {
      return $this->builder()->update($data, 'animal_id=' . $id);
    } else {
      return false;
    }
  }

  public function deleteRecord($id) {
    return $this->builder()->delete('animal_id=' . $id);
  }

  public function generate($count = null) {
    $count = (int) $count;
    if ($count > 1) {
      return array_map(function ($i) {
        return $this->generate();
      }, range(1, $count));
    } else {
      $sexes = ['female', 'male'];
      $types = ['cat', 'dog', 'bird'];
      $sex = array_rand($sexes);
      $titles = $this->genData['titles_' . $sexes[$sex]];
      $adjectives = $this->genData['adjectives'];
      $nouns = $this->genData['nouns_' . $sexes[$sex]];
      $firstNames = $this->genData['firstNames'];
      $lastNames = $this->genData['lastNames'];
      $countries = $this->genData['countries'];
      $animal['name'] =
        $titles[array_rand($titles)] .
        ' ' .
        $adjectives[array_rand($adjectives)] .
        $this->genData['adj_' . $sexes[$sex]] .
        ' ' .
        $nouns[array_rand($nouns)];
      $animal['owner'] =
        $firstNames[array_rand($firstNames)] .
        ' ' .
        $lastNames[array_rand($lastNames)];
      $animal['country'] = $countries[array_rand($countries)];
      $animal['type'] = $types[array_rand($types)];
      $animal['weight'] = rand(0.6 * 1000000, 5 * 1000000) / 1000000;
      $animal['birth_day'] = date('Y-m-d', time() - rand());
      $animal['sex'] = $sexes[$sex];
      return new \App\Entities\Animal($animal);
    }
  }
}
