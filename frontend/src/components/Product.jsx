import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useTranslation } from "react-i18next";
import { cartAddItem } from "../redux/reduers/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
function Product(props) {
  const { t } = useTranslation(["common"]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.myCart.cart.cartItems);
  const { product } = props;

  async function addCartHandler(item) {
    console.log(cartItems);
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    dispatch(cartAddItem({ ...item, quantity }));
  }
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <Card.Img
          variant="top"
          className="card-img-top"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          {t("home.price")} : ${product.price}
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            {t("home.outOfStock")}
          </Button>
        ) : (
          <Button onClick={() => addCartHandler(product)}>
            {" "}
            {t("home.addToCart")}{" "}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
