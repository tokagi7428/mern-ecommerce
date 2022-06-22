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
import { Link, useLocation } from "react-router-dom";
import { loginUser } from "../redux/actions/userAction";
import { useTranslation } from "react-i18next";

function Login({ loginUser }) {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);
  return (
    <Container className="my-5 border border-1 p-3 small-container">
      <Helmet>
        <title>{t("signin.signin")}</title>
      </Helmet>
      <h1 className="text-center">{t("signin.signin")}</h1>
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
        onSubmit={(initialValues, { setSubmitting, setFieldError }) => {
          // console.log(values);
          loginUser(
            initialValues,
            navigate,
            redirect,
            setFieldError,
            setSubmitting
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form className="">
            <FormLib
              name="email"
              type="text"
              label={t("signin.email")}
              placeholder="Enter your email"
              icon={<FiMail />}
            />
            <FormLib
              name="password"
              type="password"
              label={t("signin.password")}
              placeholder="Enter your password"
              icon={<FiLock />}
            />
            <div className="">
              {!isSubmitting && (
                <Button type="submit">{t("signin.signin")}</Button>
              )}{" "}
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
        <span>{t("signin.newuser")}? </span>
        <Link to="/signup"> {t("signin.register")} </Link>
        {t("signin.createyouraccount")}
      </div>
    </Container>
  );
}

export default connect(null, { loginUser })(Login);
