import axios from "axios";
import { sessionService } from "redux-react-session";
import { toast } from "react-toastify";

export const loginUser = (values, history, setFieldError, setSubmmiing) => {
  //Make checks and get some data
  return () => {
    // none async
    axios
      .post("/api/users/signin", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { data } = response;

        if (data.status === "FAILED") {
          const { message } = data;

          //check for specific error
          if (message.includes("credentials")) {
            setFieldError("email", message);
            setFieldError("password", message);
          } else if (message.includes("password")) {
            setFieldError("password", message);
          }
        } else if (data.status === "SUCCESS") {
          const userData = data.data[0];

          const token = userData._id;
          sessionService
            .saveSession(token)
            .then(() => {
              sessionService
                .saveUser(userData)
                .then(() => {
                  //pushHistory
                  history.push("/");
                })
                .catch((err) => toast.error(err));
            })
            .catch((err) => toast.error(err));
        }

        //complete submission
        setSubmmiing(false);
      })
      .catch((err) => toast.error(err));
  };
};

export const logoutUser = (navigate) => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    navigate("/");
  };
};

// async
// handler();
// async function handler() {
//   try {
//     const { data } = await axios.post("/api/users/signin", values, {
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
//               //pushHistory
//               history.push("/dashboard");
//             })
//             .catch((err) => toast.error(err));
//         })
//         .catch((err) => toast.error(err));
//       toast.success(data.status);
//     } else if (data.status === "FAILED") {
//       const { message } = data;
//       if (message.includes("values")) {
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
