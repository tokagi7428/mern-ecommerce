import React from "react";
import { Container } from "react-bootstrap";
import * as Loader from "react-loader-spinner";
function Loading() {
  return (
    <Container className="h-100 d-flex align-items-center justify-content-center">
      <Loader.Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        color="red"
        secondaryColor="gray"
      />
    </Container>
  );
}

export default Loading;
