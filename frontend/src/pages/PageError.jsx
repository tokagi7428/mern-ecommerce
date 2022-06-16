import React from "react";
import { Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function PageError() {
  return (
    <Container className="mt-5 text-center">
      <Alert variant="danger">
        <Alert.Heading>Page Not Found 404</Alert.Heading>
        <Link to="/">Home page</Link>
      </Alert>
    </Container>
  );
}

export default PageError;
