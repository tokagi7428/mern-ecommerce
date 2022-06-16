import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Formik, Form } from "formik";
import FormLib from "../components/FormLib";
import { connect } from "react-redux";
import { FiMail, FiLock } from "react-icons/fi";
import * as Loader from "react-loader-spinner";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { loginUser } from "../redux/actions/userAction";
import { useTranslation } from "react-i18next";

function Login({ loginUser }) {
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);
  return (
    <Container className="my-5 border border-1 p-3 small-container">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1 className="text-center">{t("login.login")}</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid Email").required("Requied"),
          password: Yup.string()
            .min(6, "Password is too short")
            .max(30, "Pass word is too long")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          console.log(values);
          loginUser(values, navigate, setFieldError, setSubmitting);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="">
            <FormLib
              name="email"
              type="text"
              label={t("login.email")}
              placeholder="Enter your email"
              icon={<FiMail />}
            />
            <FormLib
              name="password"
              type="password"
              label={t("login.password")}
              placeholder="Enter your password"
              icon={<FiLock />}
            />
            <div className="">
              {!isSubmitting && <Button type="submit">Login</Button>}{" "}
              <div className="d-flex justify-content-center">
                {isSubmitting && (
                  <Loader.ThreeDots type="ThreeDots" height={80} width={80} />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className=" my-2 text-center">
        <span>{t("login.newuser")}? </span>
        <Link to="/register"> {t("login.register")} </Link>
        {t("login.createyouraccount")}
      </div>
    </Container>
  );
}

export default connect(null, { loginUser })(Login);
