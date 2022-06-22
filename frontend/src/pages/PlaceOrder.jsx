import React, { useEffect, useReducer } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { CART_CLEAR } from "../redux/reduers/cartReducer";
import Loading from "../components/Loading";
import axios from "axios";
import { useTranslation } from "react-i18next";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function PlaceOrder() {
  const { t } = useTranslation(["common"]);
  const [{ loading }, dispatchLocal] = useReducer(reducer, {
    loading: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.myCart.cart);
  // console.log(user);
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.234234 => 123.23
  const itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = shippingPrice + itemsPrice + taxPrice;

  async function placeOrderHandler() {
    try {
      dispatchLocal({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(CART_CLEAR());
      dispatchLocal({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      dispatchLocal({ type: "CREATE_FAIL" });
      // toast.error(error);
    }
  }

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, cart]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>{t("order.previewOrder")}</title>
      </Helmet>
      <h1 className="my-3">{t("order.previewOrder")}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title> {t("order.shipping")} </Card.Title>
              <Card.Text>
                <strong>{t("signup.name")} : </strong>
                <span> {cart.shippingAddress.fullName}</span> <br />
                <strong>{t("form.telephone")} </strong>
                <span>{cart.shippingAddress.telephone}</span> <br />
                <strong>{t("form.address")} : </strong>
                <span>
                  {cart.shippingAddress.address},{cart.shippingAddress.city}
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title> {t("checkoutSteps.payment")} </Card.Title>
                  <Card.Text>
                    <strong>{t("order.method")} : </strong>
                    {cart.paymentMethod}
                  </Card.Text>
                </Col>
                <Col className="d-flex justify-content-end ">
                  <Link to="/payment">{t("order.edit")}</Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{t("order.good")}</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail me-3"
                        />
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>
                        <span>$ {item.price}</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header className="text-center">
              {" "}
              {t("order.orderSummary")}{" "}
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>{t("order.good")}</Col>
                    <Col>${itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>{t("order.shipping")}</Col>
                    <Col>${shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>{t("order.taxPrice")}</Col>
                    <Col>${taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>{t("order.orderTotal")}</strong>
                    </Col>
                    <Col>
                      <strong>${totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      {t("order.placeOrder")}
                    </Button>
                  </div>
                  {loading && <Loading></Loading>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrder;
