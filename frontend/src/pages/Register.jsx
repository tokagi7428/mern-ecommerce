import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userAction";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiUser, FiMail, FiCalendar, FiLock } from "react-icons/fi";
import FormLib from "../components/FormLib";
import * as Yup from "yup";

function Register({ signupUser }) {
  const { t } = useTranslation(["common"]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  window.onbeforeunload = function () {
    return "Are you want to reload this page";
  };

  return (
    <Container className="small-container border border-1 my-5 p-3">
      <Helmet>
        <title>{t("signup.signup")}</title>
      </Helmet>
      <h1 className="text-center">{t("signup.signup")}</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          dateOfBirth: "",
          password: "",
          isAdmin: true,
          comfirmPassword: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string().email("Invalid Email").required("Required"),
          dateOfBirth: Yup.date().required("Required"),
          password: Yup.string()
            .min(6, "Password is too short")
            .max(30, "Password is too long")
            .required("Requried"),
          comfirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password much match")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          console.log(values);
          signupUser(values, navigate, redirect, setSubmitting, setFieldError);
        }}
      >
        <Form>
          <FormLib
            name="name"
            type="text"
            label={t("signup.name")}
            placeholder="Enter your name..."
            icon={<FiUser />}
          />
          <FormLib
            name="email"
            type="email"
            label={t("signup.email")}
            placeholder="Enter your email"
            icon={<FiMail />}
          />
          <FormLib
            name="dateOfBirth"
            type="date"
            label={t("signup.dateOfBirth")}
            icon={<FiCalendar />}
          />
          <FormLib
            name="password"
            type="password"
            label={t("signup.password")}
            placeholder="Enter your password..."
            icon={<FiLock />}
          />
          <FormLib
            name="comfirmPassword"
            type="password"
            label={t("signup.comfirmPassword")}
            placeholder="Enter your password..."
            icon={<FiLock />}
          />
          <Button type="submit"> {t("signup.btnSignup")} </Button>
          <div className="my-2">
            <span> {t("signup.alreadyhaveaccount")} </span>
            <Link to="/signin"> {t("signup.signin")} </Link>
          </div>
        </Form>
      </Formik>
    </Container>
  );
}

export default connect(null, { signupUser })(Register);
