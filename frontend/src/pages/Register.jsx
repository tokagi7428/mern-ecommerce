import { Form, Formik } from "formik";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiUser, FiMail, FiCalendar, FiLock } from "react-icons/fi";
import FormLib from "../components/FormLib";

function Register() {
  return (
    <Container className="small-container border border-1 my-5 p-3">
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <h1 className="text-center">Sign Up</h1>
      <Formik>
        <Form>
          <FormLib
            name="name"
            type="text"
            label="Name"
            placeholder="Enter your name..."
            icon={<FiUser />}
          />
          <FormLib
            name="email"
            type="email"
            label="email"
            placeholder="Enter your email"
            icon={<FiMail />}
          />
          <FormLib
            name="birthday"
            type="date"
            label="Birth day"
            icon={<FiCalendar />}
          />
          <FormLib
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password..."
            icon={<FiLock />}
          />
          <FormLib
            name="comfirmPassword"
            type="password"
            label="Comfirm Password"
            placeholder="Enter your password..."
            icon={<FiLock />}
          />
          <Button type="submit">Sign Up</Button>
          <div className="my-2">
            <span>Already have account? </span>
            <Link to="/signin">Login</Link>
          </div>
        </Form>
      </Formik>
    </Container>
  );
}

export default Register;
