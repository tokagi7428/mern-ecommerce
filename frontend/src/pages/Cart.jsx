import React from "react";
import { Row, Col, ListGroup, Button, Alert, Card } from "react-bootstrap";
import { cartAddItem, cartRemoveItem } from "../redux/reduers/cartReducer";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import {
  BsDashCircleFill,
  BsPlusCircleFill,
  BsTrashFill,
} from "react-icons/bs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

function Cart({ user }) {
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.myCart.cart.cartItems);

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert(`Sorry. Product is out of stock`);
      return;
    }
    dispatch(cartAddItem({ ...item, quantity }));
  };

  const removeItemHandler = (item) => {
    dispatch(cartRemoveItem(item));
  };

  const checkOutHandler = () => {
    if (user.authenticated) {
      navigate("/shipping");
    } else {
      navigate("/signin?redirect=/shipping");
    }
  };
  return (
    <div>
      <Helmet>
        <title> {t("cart.myCart")} </title>
      </Helmet>
      <h1>{t("cart.myCart")}</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Alert variant="info" className="my-2">
              {t("cart.cartIsEmpty")} <Link to="/">{t("cart.goShopping")}</Link>
            </Alert>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded me-3 img-thumbnail"
                      />
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        {" "}
                        <BsDashCircleFill className="rounded" />{" "}
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <BsPlusCircleFill />
                      </Button>
                    </Col>
                    <Col md={3}>$ {item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeItemHandler(item)}
                      >
                        <BsTrashFill />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3 className="text-center"> {t("cart.totalOfGoods")} </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      {cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      {t("cart.items")}
                    </Col>
                    <Col>
                      ${" "}
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid mt-1">
                    <Button
                      type="button"
                      disabled={cartItems.length === 0}
                      onClick={checkOutHandler}
                    >
                      {t("cart.processToCheckout")}
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.session,
});

export default connect(mapStateToProps)(Cart);
