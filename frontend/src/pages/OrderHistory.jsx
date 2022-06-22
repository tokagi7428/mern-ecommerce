import React, { useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import { getError } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Alert, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderHistory() {
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);
  const user = useSelector((state) => state.session.user);
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  //   console.log(user.token);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [user]);
  return loading ? (
    <Loading />
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <Table>
      <Helmet>
        <title> {t("order.orderHistory")} </title>
      </Helmet>
      <thead>
        <tr>
          <th>{t("order.id")}</th>
          <th>{t("order.date")}</th>
          <th>{t("order.total")}</th>
          <th>{t("order.paid")}</th>
          <th>{t("order.delivered")}</th>
          <th>{t("order.actions")}</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice.toFixed(2)}</td>
            <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
            <td>
              {order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}
            </td>
            <td>
              <Button
                type="button"
                variant="light"
                onClick={() => {
                  navigate(`/order/${order._id}`);
                }}
              >
                {t("order.details")}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default OrderHistory;
