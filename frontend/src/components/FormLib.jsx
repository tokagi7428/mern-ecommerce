import React, { useState } from "react";
import "../index.css";
import { useField } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Form } from "react-bootstrap";
function FormLib({ icon, ...props }) {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);
  return (
    <Form.Group className="my-3 position-relative">
      <Form.Label htmlFor={props.name}>{props.label}</Form.Label>
      {props.type !== "password" && (
        <Form.Control {...field} {...props} className="paddingLeft" />
      )}
      {props.type === "password" && (
        <Form.Control
          {...field}
          {...props}
          className="paddingLeft"
          type={show ? "text" : "password"}
        />
      )}
      <span
        className="position-absolute "
        style={{ top: "35px", fontSize: "20px", left: "10px" }}
      >
        {icon}
      </span>
      {props.type === "password" && (
        <span
          className="position-absolute"
          onClick={() => setShow(!show)}
          style={{ top: "34px", fontSize: "20px", right: "10px" }}
        >
          {show && <FiEye />}
          {!show && <FiEyeOff />}
        </span>
      )}
      {meta.touched && meta.error ? (
        <span className="text-danger">{meta.error}</span>
      ) : (
        <span className="hide"></span>
      )}
    </Form.Group>
  );
}

export default FormLib;
