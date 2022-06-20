import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";

function CheckoutSteps(props) {
  const { t } = useTranslation();
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>
        {t("checkoutSteps.signIn")}
      </Col>
      <Col className={props.step2 ? "active" : ""}>
        {t("checkoutSteps.formAddress")}
      </Col>
      <Col className={props.step3 ? "active" : ""}>
        {t("checkoutSteps.payment")}
      </Col>
      <Col className={props.step4 ? "active" : ""}>
        {t("checkoutSteps.placeOrder")}
      </Col>
    </Row>
  );
}

export default CheckoutSteps;
