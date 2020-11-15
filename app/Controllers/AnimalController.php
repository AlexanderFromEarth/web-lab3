<?php namespace App\Controllers;

class AnimalController extends BaseController {
  protected $animalModel;

  public function __construct() {
    $this->animalModel = new \App\Models\AnimalModel();
  }

  public function list($page = 1) {
    try {
      if ($page < 1) {
        $page = 1;
      }
      $json = $this->request->getVar();
      $validation = service('validation');
      $validation->setRules([
        'filterType' => 'in_list[cat,dog,bird]',
        'filterSex' => 'in_list[female,male]',
        'filterFDate' => 'valid_date',
        'filterLDate' => 'valid_date',
        'sortField' => 'in_list[birth_day,weight]',
        'sortDir' => 'required_with[sortField]|in_list[asc,desc]',
      ]);
      $options = $json;
      $validation->run($json);
      foreach ($validation->getErrors() as $key => $value) {
        $options[$key] = null;
      }
      $perPage = 20;
      $result = $this->animalModel->getList($page, $perPage, $options);
      return $this->response->setJSON([
        'data' => $result[0],
        'pages' => $result[1],
        'success' => true,
        'message' => 'Fetched',
      ]);
    } catch (\Exception $e) {
      return $this->response->setJSON([
        'success' => false,
        'message' => $e->getMessage(),
        'errors' => $e,
        'opts' => $options,
      ]);
    }
  }

  public function form($id = null) {
    try {
      $data = new \App\Entities\Animal($this->request->getJSON(true));
      $res = $id
        ? $this->animalModel->updateRecord($id, $data->toRawArray())
        : $this->animalModel->createRecord($data->toRawArray());
      if ($res) {
        return $this->response->setJSON([
          'success' => $res,
          'message' => $id ? 'Edited' : 'Created',
        ]);
      } else {
        return $this->response->setJSON([
          'success' => $res,
          'message' => $this->animalModel->errors(true)
            ? $this->animalModel->errors(true)
            : reset($this->animalModel->validation->getErrors()),
        ]);
      }
    } catch (\Exception $e) {
      return $this->response->setJSON([
        'success' => false,
        'message' => $e->getMessage(),
        'errors' => $e,
      ]);
    }
  }

  public function delete($id) {
    try {
      $this->animalModel->deleteRecord($id);
      return $this->response->setJSON([
        'success' => true,
        'message' => 'Deleted',
      ]);
    } catch (\Exception $e) {
      return $this->response->setJSON([
        'success' => false,
        'message' => $e->getMessage(),
        'errors' => $e,
      ]);
    }
  }

  public function generate() {
    try {
      $json = $this->request->getJSON();
      $cnt = $json->count;
      $isAdd = $json->add;
      $data = $this->animalModel->generate($cnt);

      if ($isAdd === true) {
        $cnt = 0;
        if (is_array($data)) {
          foreach ($data as $rec) {
            if ($this->animalModel->createRecord($rec->toRawArray())) {
              $cnt += 1;
            }
          }
        } else {
          if ($this->animalModel->createRecord($data->toRawArray())) {
            $cnt += 1;
          }
        }
      } else {
        $cnt = 0;
        if (is_array($data)) {
          foreach ($data as $rec) {
            $newData[] = $rec;
          }
        } else {
          $newData = $data;
        }
      }

      return $this->response->setJSON([
        'data' => $isAdd === true ? $cnt : $data,
        'success' => true,
        'message' => 'Generated',
      ]);
    } catch (\Exception $e) {
      return $this->response->setJSON([
        'success' => false,
        'message' => $e->getMessage(),
        'errors' => $e,
      ]);
    }
  }
}
