import React from "react";
import { Button, Container, Row } from "react-bootstrap";

export default ({ currentPage, totalPages, neighboursCount, callback }) => {
  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const paginate = () => {
    const totalLinks = 2 * neighboursCount + 3;
    if (totalPages > totalLinks + 2) {
      const start = Math.max(2, currentPage - neighboursCount);
      const end = Math.min(totalPages - 1, currentPage + neighboursCount);
      const hasLeft = start > 2;
      const hasRight = totalPages - end > 1;
      const offset = totalLinks - (end - start + 2);
      if (hasLeft && !hasRight) {
        return [
          1,
          null,
          ...range(start - offset, start - 1),
          ...range(start, end),
          totalPages,
        ];
      } else if (!hasLeft && hasRight) {
        return [
          1,
          ...range(start, end),
          ...range(end + 1, end + offset),
          null,
          totalPages,
        ];
      } else {
        return [1, null, ...range(start, end), null, totalPages];
      }
    } else {
      return range(1, totalPages);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        {paginate().map((p, _) =>
          p === null ? (
            <p>...</p>
          ) : p === currentPage ? (
            <a className="mr-2 ml-2" key={p}>
              <b>{p}</b>
            </a>
          ) : (
            <a onClick={(_) => callback(p)} className="mr-2 ml-2" key={p}>
              {p}
            </a>
          )
        )}
      </Row>
      <Row className="justify-content-around">
        <Button
          variant="outline-dark"
          disabled={currentPage <= 1}
          onClick={(_) =>
            callback(currentPage > 1 ? currentPage - 1 : currentPage)
          }
        >
          Предыдущая
        </Button>
        <Button
          variant="outline-dark"
          disabled={currentPage >= totalPages}
          onClick={(_) =>
            callback(currentPage < totalPages ? currentPage + 1 : currentPage)
          }
        >
          Следующая
        </Button>
      </Row>
    </Container>
  );
};
