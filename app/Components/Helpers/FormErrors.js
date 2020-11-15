import React from "react";
import { Container, Alert } from "react-bootstrap";

export default ({ errors }) => {
  return (
    <Container className="formErrors">
      {Object.keys(errors).map((fieldName, i) => {
        if (errors[fieldName].length > 0) {
          return (
            <Alert variant="danger" key={i}>
              {errors[fieldName]}
            </Alert>
          );
        } else {
          return "";
        }
      })}
    </Container>
  );
};
