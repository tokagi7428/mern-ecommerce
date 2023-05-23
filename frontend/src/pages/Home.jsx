import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/reduers/fetchData.js";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading.jsx";
import { useTranslation } from "react-i18next";
function Home() {
  const { t } = useTranslation(["common"]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.isLoading);
  const error = useSelector((state) => state.product.error);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div className="my-3">
      <Helmet>
        <title>Brand</title>
      </Helmet>
      <h1> {t("home.myProducts")} </h1>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          {products.map((item) => {
            return (
              <Col lg={3} md={4} sm={6} className="my-3" key={item.slug}>
                <Product product={item}></Product>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default Home;
