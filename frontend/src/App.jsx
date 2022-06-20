import React, { Suspense, useEffect } from "react";
import {
  Badge,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { BsCart2 } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageError from "./pages/PageError";
import { connect } from "react-redux";
import { logoutUser } from "./redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
//i18n
import { useTranslation } from "react-i18next";

import i18next from "i18next";
import ProductScreen from "./pages/ProductScreen";
import Cart from "./pages/Cart";
import FormAddress from "./pages/FormAddress";
import Payment from "./pages/Payment";

function App({ user, logoutUser }) {
  const { i18n, t } = useTranslation(["common"]);
  const cartItems = useSelector((state) => state.myCart.cart.cartItems);
  const { name } = user;
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  });

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <div className="d-flex flex-column site-container">
          <ToastContainer position="top-center" limit={1} />
          <header>
            <Navbar
              bg="dark"
              variant="dark"
              expand="lg"
              className="d-flex align-items-center"
            >
              <Container className="p-2 ">
                <LinkContainer to="/">
                  <Navbar.Brand>{t("home.brand")}</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="nav-toggle" />
                <Navbar.Collapse id="nav-toggle">
                  <Nav className="w-100 me-auto justify-content-end align-items-lg-center">
                    <li className="nav-item ">
                      <select
                        className="nav-link bg-dark border-0 ml-1 mr-2 "
                        value={localStorage.getItem("i18nextLng")}
                        onChange={handleLanguageChange}
                      >
                        <option value="en">English</option>
                        <option value="th">Thailand</option>
                      </select>
                    </li>
                    {/* tooltip */}
                    <div className="">
                      <OverlayTrigger
                        placement={"bottom"}
                        overlay={<Tooltip> {t("cart.cart")} </Tooltip>}
                      >
                        <Link
                          to="/cart"
                          className="nav-link me-2 ml-1 px-3 h5 hover"
                        >
                          <BsCart2 />
                          {cartItems.length > 0 && (
                            <Badge
                              pill
                              bg="danger"
                              className="position-absolute cart"
                            >
                              {cartItems.reduce((a, c) => a + c.quantity, 0)}
                            </Badge>
                          )}
                        </Link>
                      </OverlayTrigger>
                    </div>
                    {/* tooltip */}
                    {name ? (
                      <NavDropdown title={name} id="nav-dropdown" bg="dark">
                        <LinkContainer to="/profile">
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/orderhistory">
                          <NavDropdown.Item>Order History</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <LinkContainer to="/signin">
                          <NavDropdown.Item onClick={() => logoutUser()}>
                            {t("home.signout")}
                          </NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    ) : (
                      <Nav.Item className="">
                        <Link to="/signin" className="text-light nav-link">
                          {t("home.signin")}
                        </Link>
                      </Nav.Item>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
          <main>
            <Container className="mt-3">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/address" element={<FormAddress />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/product/:slug" element={<ProductScreen />} />
                <Route path="*" element={<PageError />} />
              </Routes>
            </Container>
          </main>
          <footer>
            <div className="bg-dark p-3 text-center text-light ">
              Copyright 2022 &copy;All reserved
            </div>
          </footer>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

const mapStateProps = ({ session }) => ({
  user: session.user,
});

export default connect(mapStateProps, { logoutUser })(App);
