import React, { useEffect } from "react";
import Formib from "../components/FormLib";
import { FiUser } from "react-icons/fi";
import { FaAddressBook, FaCity } from "react-icons/fa";
import { GrLanguage, GrLocation } from "react-icons/gr";
import { BsTelephone } from "react-icons/bs";
import { Form, Formik } from "formik";
import { Helmet } from "react-helmet-async";
import { Button, Container } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { connect } from "react-redux";
import { formShippingAddress } from "../redux/actions/userAction";
import { SAVE_SHIPPING_ADDRESS } from "../redux/reduers/cartReducer";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function FormAddress({ formShippingAddress, user }) {
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);
  useEffect(() => {
    const { authenticated } = user;
    // console.log(user);
    // if (Object.keys(user).length === 0) {
    //   navigate("/signin?redirect=/address");
    // }
    if (!authenticated) {
      navigate("/signin?redirect=/address");
    }
  }, [navigate, user]);

  return (
    <div className="">
      <Helmet>
        <title> {t("form.formAddress")} </title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Container className="small-container border broder-0 p-3 my-5">
        <h1 className="text-center">{t("form.formAddress")}</h1>
        <Formik
          initialValues={{
            fullName: "",
            telephone: "",
            address: "",
            city: "",
            country: "",
            postalCode: "",
          }}
          validationSchema={Yup.object({
            fullName: Yup.string().trim().required("Full name is required"),
            telephone: Yup.string().trim().required("Telephone is required"),
            address: Yup.string().required(),
            city: Yup.string().trim().required("City is required"),
            country: Yup.string().trim().required("Country is required"),
            postalCode: Yup.string().trim().required("Postal code is required"),
          })}
          onSubmit={(initialValues, { setSubmitting }) => {
            // console.log(initialValues);
            formShippingAddress(
              initialValues,
              SAVE_SHIPPING_ADDRESS,
              navigate,
              setSubmitting
            );
          }}
        >
          <Form>
            <Formib
              label={t("form.fullname")}
              type="text"
              name="fullName"
              placeholder={t("form.enterYourName")}
              icon={<FiUser />}
            />
            <Formib
              label={t("form.telephone")}
              type="number"
              name="telephone"
              placeholder="082-xxx-xxxx"
              icon={<BsTelephone />}
            />
            <Formib
              label={t("form.address")}
              type="text"
              name="address"
              placeholder={t("form.enterYourAddress")}
              icon={<FaAddressBook />}
            />
            <Formib
              label={t("form.city")}
              type="text"
              name="city"
              placeholder={t("form.enterYourCity")}
              icon={<FaCity />}
            />
            <Formib
              label={t("form.country")}
              type="text"
              name="country"
              placeholder={t("form.enterYourCountry")}
              icon={<GrLanguage />}
            />
            <Formib
              label={t("form.postalCode")}
              type="text"
              name="postalCode"
              placeholder={t("form.EnterYourPostalCode")}
              icon={<GrLocation />}
            />
            <div className="mb-3">
              <Button type="submit"> {t("form.btnContinue")} </Button>
            </div>
          </Form>
        </Formik>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.session,
  };
};

export default connect(mapStateToProps, { formShippingAddress })(FormAddress);
