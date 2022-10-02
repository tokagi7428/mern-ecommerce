import React from "react";
import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex me-auto mt-sm-3 mt-lg-0">
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="id"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search.."
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
      </InputGroup>
      <Button
        variant="outline-warning"
        type="submit"
        id="button-search"
        className="ms-1"
      >
        <FaSearch />
      </Button>
    </Form>
  );
}

export default SearchBox;
