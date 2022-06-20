import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Checkoutstep from "../components/CheckoutSteps";
import { GrPaypal } from "react-icons/gr";
import { FaStripeS } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { SAVE_PAYMENT_METHOD } from "../redux/reduers/cartReducer";
import { useTranslation } from "react-i18next";

function Payment() {
  const { t } = useTranslation(["common"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingAddress = useSelector(
    (state) => state.myCart.cart.shippingAddress
  );
  const paymentMethod = useSelector((state) => state.myCart.cart.paymentMethod);
  const user = useSelector((state) => state.session);
  const [paymentName, setPaymentName] = useState(paymentMethod || "PayPal");
  const [qrValue, setQrValue] = useState(paymentName);
  useEffect(() => {
    console.log("user : ", user);
    console.log("address : ", shippingAddress);
    if (!user.authenticated) {
      navigate("/signin");
    } else if (!shippingAddress) {
      navigate("/signin");
    }
  }, [user, shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(SAVE_PAYMENT_METHOD(paymentName));
    localStorage.setItem("paymentMethod", paymentName);
    navigate("/placeorder");
  };
  const valueHandler = (e) => {
    setPaymentName(e.target.value);
    setQrValue(e.target.value);
  };
  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue.png}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <div>
      <Checkoutstep step1 step2 step3></Checkoutstep>
      <Helmet>
        <title> {t("form.paymentMethod")} </title>
      </Helmet>
      <Container>
        <h1 className="my-3"> {t("form.paymentMethod")} </h1>
        <Row>
          <Col>
            <Form onSubmit={submitHandler}>
              <div className="mb-3 d-flex align-items-center">
                <Form.Check
                  type="radio"
                  id="PayPal"
                  value={"PayPal"}
                  label="PayPal"
                  className="me-2"
                  checked={paymentName === "PayPal"}
                  onChange={valueHandler}
                />
                <GrPaypal />
              </div>
              <div className="mb-3 d-flex align-items-center ">
                <Form.Check
                  type="radio"
                  id="Stripe"
                  value="Stripe"
                  label="Stripe"
                  className="me-2"
                  checked={paymentName === "Stripe"}
                  onChange={valueHandler}
                />
                <FaStripeS />
              </div>
              <div className="mb-3">
                <Button type="submit">{t("form.btnContinue")}</Button>
              </div>
            </Form>
          </Col>
          <Col>
            <div className="d-flex flex-column mb-3">
              <QRCode
                id="qr-gen"
                value={qrValue}
                size={280}
                level={"H"}
                includeMargin={true}
              />
              <div style={{ marginLeft: "2.8rem" }}>
                {t("form.clickFor")}{" "}
                <Button
                  type="button"
                  style={{ fontSize: "12px", marginLeft: "5px" }}
                  onClick={downloadQRCode}
                >
                  {t("form.downloadQrCode")}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Payment;
