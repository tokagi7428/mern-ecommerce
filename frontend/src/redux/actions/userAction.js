import axios from "axios";
import { sessionService } from "redux-react-session";
import { toast } from "react-toastify";
export const loginUser = (
  credential,
  navigate,
  setFieldError,
  setSubmitting
) => {
  return () => {
    axios
      .post("http://localhost:5500/user/signin", credential, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { data } = res;
        if (data.status === "FAILED") {
          const { message } = data;

          // check for specific error
          if (message.includes("credentials")) {
            setFieldError("email", message);
            setFieldError("password", message);
          } else if (data.status === "SUCCESS") {
            const userData = data.data[0];
            const token = userData._id;
            sessionService
              .saveSession(token)
              .then(() => {
                sessionService
                  .saveUser(userData)
                  .then(() => {
                    navigate("/");
                  })
                  .catch((err) => toast.error(err));
              })
              .catch((err) => toast.error(err));
          }
        }
        // complete submission
        setSubmitting(false);
      })
      .catch((err) => console.log(err));
  };
};

export const logoutUser = (navigate) => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    navigate("/");
  };
};
