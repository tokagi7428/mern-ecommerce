export const FETCH_REQUEST = () => {
  return {
    type: "FETCH_REQUEST",
  };
};

export const FETCH_SUCCESS = (payload) => {
  return {
    type: "FETCH_SUCCESS",
    payload,
  };
};

export const FETCH_ERROR = (payload) => {
  return {
    type: "FETCH_FAIL",
    payload,
  };
};
