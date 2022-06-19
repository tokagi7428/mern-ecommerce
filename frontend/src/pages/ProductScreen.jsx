import React from "react";
import { useEffect } from "react";
import {
  FETCH_ERROR,
  FETCH_SUCCESS,
  FETCH_REQUEST,
} from "../redux/actions/fetchAction.js";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Rating from "../components/Rating.jsx";
function ProductScreen({ dispatch, product, error, loading }) {
  const navigate = useNavigate();
  const param = useParams();
  const { slug } = param;
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(FETCH_REQUEST);
        const { data } = await axios.get(`/api/products/slug/${slug}`);
        dispatch(FETCH_SUCCESS(data));
      } catch (error) {
        dispatch(FETCH_ERROR(error));
      }
    };
    fetchData();
  });
  return loading ? (
    <Loading />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Container>
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.name} className="img-large" />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.fetchReducer.product,
    error: state.fetchReducer.error,
    loading: state.fetchReducer.loading,
  };
};

export default connect(mapStateToProps)(ProductScreen);
