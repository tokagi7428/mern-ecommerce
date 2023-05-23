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
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { cartAddItem } from "../redux/reduers/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating.jsx";
import { useTranslation } from "react-i18next";

function ProductScreen({ product, error, loading }) {
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.myCart.cart.cartItems);
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
  const addToCartHandler = async () => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert(`Sorry. Product is out of stock`);
      return;
    }
    dispatch(cartAddItem({ ...product, quantity }));
    navigate("/cart");
  };
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
        <Col md={3} className="my-3 my-lg-0">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              {t("product.price")} : ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3} className="my-3">
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>{t("product.price")} : </Col>
                    <Col>$ {product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>{t("product.status")} : </Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success" className="p-2 px-3">
                          {t("product.instock")}
                        </Badge>
                      ) : (
                        <Badge bg="danger" className="p-2 px-3">
                          {t("product.unavailable")}
                        </Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid mt-3">
                      <Button variant="primary" onClick={addToCartHandler}>
                        {t("product.addToCart")}
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
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
