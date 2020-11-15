import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

import FormErrors from "../Helpers/FormErrors.js";

export default ({ inData = {} }) => {
  const [data, setData] = useState(inData);
  const [genData, setGenData] = useState({
    sex: null,
    type: null,
    name: null,
    weight: null,
    owner: null,
    country: null,
    birth_day: null,
  });
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value?.match(/^[а-яА-ЯёЁ]+ [а-яА-ЯёЁ]+ [а-яА-ЯёЁ]+$/)
          ? ""
          : "Имя должно состоять из 3 слов.";
      case "owner":
        return value?.match(/^[а-яА-ЯёЁ]+ [а-яА-ЯёЁ]+$/)
          ? ""
          : "Имя владельца должно состоять из 2 слов.";
      case "birth_day":
        return !isNaN(new Date(value))
          ? ""
          : "Дата рождения должна быть датой.";
      case "weight":
        return +value && +value > 0 ? "" : "Вес должен быть больше нуля.";
      case "country":
        return value?.match(/^([а-яА-ЯёЁ]+ ?)+$/)
          ? ""
          : "Страна не может быть пустым.";
      case "sex":
        return ["female", "male"].includes(value)
          ? ""
          : "Пол должен иметь значение - 'Самец' или 'Самка'.";
      case "type":
        return ["cat", "dog", "bird"].includes(value)
          ? ""
          : "Вид должен иметь значение - 'Кошка', 'Собака' или 'Птица'.";
    }
  };
  const [errors, setErrors] = useState(
    Object.keys(genData).reduce(
      (prev, cur) => ({ ...prev, [cur]: validateField(cur, inData[cur]) }),
      {}
    )
  );

  const setField = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
    setErrors({
      ...errors,
      [field]: validateField(field, value),
    });
  };

  return (
    <Container>
      <Form
        onSubmit={(_) =>
          (inData?.animal_id
            ? axios.put(
                "http://localhost:8080/api/animal/" + inData?.animal_id,
                {
                  ...data,
                }
              )
            : axios.post("http://localhost:8080/api/animal/", {
                ...data,
              })
          ).then((response) =>
            response.data.success ? undefined : alert(response.data.message)
          )
        }
      >
        <Row>
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              value={data.name}
              required
              onChange={(event) => setField("name", event.target.value)}
            />
          </Form.Group>
          <Col xs="auto">
            <Button
              className="mt-4"
              variant="light"
              onClick={(_) => setField("name", genData.name)}
            >
              &lt;&lt;
            </Button>
          </Col>
          <Form.Group as={Col} controlId="formGenName">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              value={genData.name}
              onChange={(event) =>
                setGenData({ ...genData, name: event.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formOwner">
            <Form.Label>Владелец</Form.Label>
            <Form.Control
              type="text"
              value={data.owner}
              required
              onChange={(event) => setField("owner", event.target.value)}
            />
          </Form.Group>
          <Col xs="auto">
            <Button
              className="mt-4"
              variant="light"
              onClick={(_) => setField("owner", genData.owner)}
            >
              &lt;&lt;
            </Button>
          </Col>
          <Form.Group as={Col} controlId="formGenOwner">
            <Form.Label>Владелец</Form.Label>
            <Form.Control
              type="text"
              value={genData.owner}
              onChange={(event) =>
                setGenData({ ...genData, owner: event.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formDate">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="date"
              value={data.birth_day}
              required
              onChange={(event) => setField("birth_day", event.target.value)}
            />
          </Form.Group>
          <Col xs="auto">
            <Button
              className="mt-4"
              variant="light"
              onClick={(_) => setField("birth_day", genData.birth_day)}
            >
              &lt;&lt;
            </Button>
          </Col>
          <Form.Group as={Col} size="sm" controlId="formGenDate">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="date"
              value={genData.birth_day}
              onChange={(event) =>
                setGenData({ ...genData, birth_day: event.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formWeight">
            <Form.Label>Вес</Form.Label>
            <Form.Control
              type="number"
              value={data.weight}
              required
              onChange={(event) => setField("weight", event.target.value)}
            />
          </Form.Group>
          <Col xs="auto">
            <Button
              className="mt-4"
              variant="light"
              onClick={(_) => setField("weight", genData.weight)}
            >
              &lt;&lt;
            </Button>
          </Col>
          <Form.Group as={Col} controlId="formGenWeight">
            <Form.Label>Вес</Form.Label>
            <Form.Control
              type="number"
              value={genData.weight}
              onChange={(event) =>
                setGenData({ ...genData, weight: event.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formCountry">
            <Form.Label>Страна</Form.Label>
            <Form.Control
              type="text"
              value={data.country}
              required
              onChange={(event) => setField("country", event.target.value)}
            />
          </Form.Group>
          <Col xs="auto">
            <Button
              className="mt-4"
              variant="light"
              onClick={(_) => setField("country", genData.country)}
            >
              &lt;&lt;
            </Button>
          </Col>
          <Form.Group as={Col} controlId="formGenCountry">
            <Form.Label>Страна</Form.Label>
            <Form.Control
              type="text"
              value={genData.country}
              onChange={(event) =>
                setGenData({ ...genData, country: event.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formSex">
            <Form.Label>Пол</Form.Label>
            <Form.Control
              as="select"
              value={data.sex}
              required
              onChange={(event) => setField("sex", event.target.value)}
            >
              <option value={null}></option>
              <option value="male">Самец</option>
              <option value="female">Самка</option>
            </Form.Control>
          </Form.Group>
          <Col xs="auto">
            <Button
              className="mt-4"
              variant="light"
              onClick={(_) => setField("sex", genData.sex)}
            >
              &lt;&lt;
            </Button>
          </Col>
          <Form.Group as={Col} controlId="formGenSex">
            <Form.Label>Пол</Form.Label>
            <Form.Control
              as="select"
              value={genData.sex}
              onChange={(event) =>
                setGenData({ ...genData, sex: event.target.value })
              }
            >
              <option value={null}></option>
              <option value="male">Самец</option>
              <option value="female">Самка</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formType">
            <Form.Label>Вид</Form.Label>
            <Form.Control
              as="select"
              value={data.type}
              required
              onChange={(event) => setField("type", event.target.value)}
            >
              <option value={null}></option>
              <option value="cat">Кошка</option>
              <option value="dog">Собака</option>
              <option value="bird">Птица</option>
            </Form.Control>
          </Form.Group>
          <Col xs="auto">
            <Button
              className="mt-4"
              variant="light"
              onClick={(_) => setField("type", genData.type)}
            >
              &lt;&lt;
            </Button>
          </Col>
          <Form.Group as={Col} controlId="formGenType">
            <Form.Label>Вид</Form.Label>
            <Form.Control
              as="select"
              value={genData.type}
              onChange={(event) =>
                setGenData({ ...genData, type: event.target.value })
              }
            >
              <option value={null}></option>
              <option value="cat">Кошка</option>
              <option value="dog">Собака</option>
              <option value="bird">Птица</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <FormErrors errors={errors ? errors : {}} />
        <Row>
          <Form.Group as={Col} controlId="formSubmit">
            <Form.Control
              type="submit"
              value="Сохранить"
              disabled={Object.keys(errors).find(
                (error) => errors[error] != ""
              )}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGenerate">
            <Form.Control
              type="button"
              value="Сгенерировать"
              onClick={(_) =>
                axios
                  .post("http://localhost:8080/api/animal/generate", {
                    count: 1,
                    add: false,
                  })
                  .then((response) => setGenData(response.data.data))
              }
            />
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};
