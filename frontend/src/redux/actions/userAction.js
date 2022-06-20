import axios from "axios";
import { sessionService } from "redux-react-session";
import { getError } from "../../utils";
import { toast } from "react-toastify";

export const formShippingAddress =
  (initialValues, SAVE_SHIPPING_ADDRESS, navigate, setSubmitting) =>
  (dispatch) => {
    try {
      dispatch(SAVE_SHIPPING_ADDRESS(initialValues));
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify({
          initialValues,
        })
      );
      navigate("/payment");
      setSubmitting(false);
    } catch (err) {
      toast.error(err);
    }
  };

export const loginUser = (
  credentials,
  navigate,
  redirect,
  setFieldError,
  setSubmmiing
) => {
  //Make checks and get some data
  return () => {
    axios
      .post("/api/users/signin", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { data } = response;

        if (data.status === "FAILED") {
          const { message } = data;
          toast.error(message);
          //check for specific error
          if (message.includes("account")) {
            setFieldError("password", message);
          }
          if (message.includes("credentials")) {
            setFieldError("email", message);
            setFieldError("password", message);
          } else if (message.includes("password")) {
            setFieldError("password", message);
          }
        } else if (data.status === "SUCCESS") {
          // console.log("data : ", data.data[0]);
          const userData = data.data[0];

          const token = userData._id;
          sessionService
            .saveSession(token)
            .then(() => {
              sessionService
                .saveUser(userData)
                .then(() => {
                  //push navigate
                  navigate(redirect || "/");
                })
                .catch((err) => toast.getError(err));
            })
            .catch((err) => toast.getError(err));
        }

        //complete submission
        setSubmmiing(false);
      })
      .catch((err) => toast.getError(err));
  };
};

export const signupUser = (
  credentials,
  navigate,
  redirect,
  setFieldError,
  setSubmmiing
) => {
  return (dispatch) => {
    axios
      .post("/api/users/signup", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { data } = response;
        console.log("data status", data.status);
        if (data.status === "FAILED") {
          const { message } = data;
          console.log("message", message);
          //check
          if (message.includes("name")) {
            setFieldError("name", message);
          } else if (message.includes("email")) {
            setFieldError("email", message);
          } else if (message.includes("date")) {
            setFieldError("dateOfBirth", message);
          } else if (message.includes("password")) {
            setFieldError("password", message);
          }
          toast.error(message);
          // complete submission
          setSubmmiing(false);
        } else if (data.status === "SUCCESS") {
          //Login usre after successful signup
          toast.success("Create account Successfully");
          const { email, password } = credentials;

          dispatch(
            loginUser(
              ({ email, password }, navigate, setFieldError, setSubmmiing)
            )
          );
          navigate(redirect || "/");
        }
      })
      .catch((err) => toast.error(err));
  };
};

export const logoutUser = () => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
  };
};

// async
// handler();
// async function handler() {
//   try {
//     const { data } = await axios.post("/api/users/signin", credentials, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(data.status);
//     if (data.status === "SUCCESS") {
//       const userData = data.data[0];
//       const token = userData._id;
//       sessionService
//         .saveSession(token)
//         .then(() => {
//           sessionService
//             .saveUser(userData)
//             .then(() => {
//               //pushnavigate
//               navigate.push("/dashboard");
//             })
//             .catch((err) => toast.error(err));
//         })
//         .catch((err) => toast.error(err));
//       toast.success(data.status);
//     } else if (data.status === "FAILED") {
//       const { message } = data;
//       if (message.includes("credentials")) {
//         setFieldError("email", message);
//         setFieldError("password", message);
//       } else if (message.includes("password")) {
//         setFieldError("password", message);
//       }
//       toast.error(message);
//     }
//     setSubmmiing(false);
//   } catch (error) {
//     toast.error(error);
//   }
// }
