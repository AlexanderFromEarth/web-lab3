import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Table,
  Form,
  Modal,
} from "react-bootstrap";
import axios from "axios";

import Paginator from "../Helpers/Paginator.js";
import AnimalForm from "./AnimalForm";

export default () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [number, setNumber] = useState(null);
  const [filters, setFilters] = useState({
    type: null,
    sex: null,
    country: null,
    fDate: null,
    lDate: null,
  });
  const [sort, setSort] = useState({
    field: null,
    dir: null,
  });
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [inData, setInData] = useState(null);

  const changePage = (page) => {
    setPage(page);
    sessionStorage.page = page;
  };

  const translations = {
    sex: {
      female: "Самка",
      male: "Самец",
    },
    type: {
      cat: "Кошка",
      dog: "Собака",
      bird: "Птица",
    },
    field: {
      animal_id: "ID",
      name: "Имя",
      type: "Вид",
      birth_day: "Дата рождения",
      sex: "Пол",
      weight: "Вес",
      country: "Страна",
      owner: "Имя владельца",
    },
  };

  useEffect(() => {
    setPage(~~sessionStorage.page > 0 ? ~~sessionStorage.page : 1);
    axios
      .get("http://localhost:8080/api/animal/list/" + page, {
        params: {
          filterType: filters["type"],
          filterSex: filters["sex"],
          filterCountry: filters["country"],
          filterFDate: filters["fDate"],
          filterLDate: filters["lDate"],
          sortField: sort["field"],
          sortDir: sort["dir"],
        },
      })
      .then((response) => {
        if (response.data.success) {
          setList(response.data.data);
          setLoading(false);
          setPageCount(response.data.pages);
        } else {
          setList([]);
          setLoading(false);
        }
      });
  }, [page, filters, sort, loading]);

  return (
    <Container>
      <Modal
        show={showDialog}
        onHide={(_) => setShowDialog(false)}
        size="lg"
      >
        <Modal.Body>
          <AnimalForm inData={inData} />
        </Modal.Body>
      </Modal>
      <Form>
        <Row>
          <Form.Group as={Col} controlId="formType">
            <Form.Label>Вид</Form.Label>
            <Form.Control
              as="select"
              onChange={(event) => {
                setFilters({
                  ...filters,
                  type: event.target.value,
                });
                changePage(1);
              }}
            >
              <option value=""></option>
              <option value="cat">{translations["type"]["cat"]}</option>
              <option value="dog">{translations["type"]["dog"]}</option>
              <option value="bird">{translations["type"]["bird"]}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formSex">
            <Form.Label>Пол</Form.Label>
            <Form.Control
              as="select"
              onChange={(event) => {
                setFilters({
                  ...filters,
                  sex: event.target.value,
                });
                changePage(1);
              }}
            >
              <option value=""></option>
              <option value="female">{translations["sex"]["female"]}</option>
              <option value="male">{translations["sex"]["male"]}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs="8" controlId="formCountry">
            <Form.Label>Страна</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => {
                setFilters({
                  ...filters,
                  country: event.target.value,
                });
                changePage(1);
              }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formFirstDate">
            <Form.Label>От</Form.Label>
            <Form.Control
              type="date"
              onChange={(event) => {
                setFilters({
                  ...filters,
                  fDate: event.target.value,
                });
                changePage(1);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formDirection">
            <Form.Label>Направление</Form.Label>
            <Form.Control
              as="select"
              onChange={(event) =>
                setSort({
                  ...sort,
                  dir: event.target.value,
                })
              }
            >
              <option></option>
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formLastDate">
            <Form.Label>До</Form.Label>
            <Form.Control
              type="date"
              onChange={(event) => {
                setFilters({
                  ...filters,
                  lDate: event.target.value,
                });
                changePage(1);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formField">
            <Form.Label>Поле</Form.Label>
            <Form.Control
              as="select"
              onChange={(event) =>
                setSort({
                  ...sort,
                  field: event.target.value,
                })
              }
            >
              <option></option>
              <option value="birth_day">
                {translations["field"]["birth_day"]}
              </option>
              <option value="weight">{translations["field"]["weight"]}</option>
            </Form.Control>
          </Form.Group>
        </Row>
      </Form>
      <Table className="table">
        <thead>
          <tr>
            {[
              "animal_id",
              "type",
              "name",
              "birth_day",
              "sex",
              "weight",
              "country",
              "owner",
            ].map((key, i) => (
              <th key={i}>{translations["field"][key]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list?.map((animal, i) => (
            <tr key={i}>
              {Object.keys(animal).map((key, j) => (
                <td key={j}>
                  {key === "sex"
                    ? translations["sex"][animal[key]]
                    : key === "type"
                    ? translations["type"][animal[key]]
                    : key === "birth_day"
                    ? new Date(animal[key]).toLocaleDateString()
                    : animal[key]}
                </td>
              ))}
              <td key={Object.keys(animal).length}>
                <Button
                  variant="outline-dark"
                  onClick={(_) =>
                    axios
                      .delete(
                        "http://localhost:8080/api/animal/" +
                          animal["animal_id"]
                      )
                      .then((response) =>
                        response.data.success
                          ? setLoading(true)
                          : console.log(response.data)
                      )
                  }
                >
                  Удолить
                </Button>
              </td>
              <td key={Object.keys(animal).length + 1}>
                <Button
                  variant="outline-dark"
                  onClick={(_) => {
                    setInData(animal);
                    setShowDialog(true);
                  }}
                >
                  Редактировать
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colspan={10}>
              <Button
                block
                variant="outline-dark"
                onClick={(_) => {
                  setInData({});
                  setShowDialog(true);
                }}
              >
                Создать
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Paginator
        currentPage={page}
        totalPages={pageCount}
        neighboursCount={2}
        callback={changePage}
      />
      <Form
        onSubmit={(_) => {
          axios.post("http://localhost:8080/api/animal/generate/", {
            count: number,
            add: true,
          });
        }}
      >
        <Form.Row className="justify-content-center mt-2">
          <Form.Group as={Col} xs="3" controlId="formNumberRows">
            <Form.Control
              type="number"
              value={number}
              placeholder="Число строк для генерации"
              onChange={(event) => setNumber(event.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} xs="auto" controlId="formGenerate">
            <Form.Control type="submit" value="Сгененерировать" />
          </Form.Group>
        </Form.Row>
      </Form>
    </Container>
  );
};
