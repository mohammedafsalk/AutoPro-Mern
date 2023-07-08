import { createStore } from "redux";
const initialState = {
  user: { login: null },
  admin: { login: null },
  serviceCenter: { login: null },
  serviceCenterResetPassword: { otpErr: "", showResetPage: false, otp: "" },
  refresh: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload };
    case "refresh":
      return { ...state, refresh: !state.refresh };
    case "admin":
      return { ...state, admin: action.payload };
    case "serviceCenter":
      return { ...state, serviceCenter: action.payload };
    case "serviceCenterResetPassword":
      return {
        ...state,
        serviceCenterResetPassword: {
          otpErr: action.payload.otpErr || "",
          showResetPage: action.payload.showResetPage || false,
          otp: action.payload.otp || "",
        },
      };
    default:
      return state;
  }
}

export default createStore(reducer);
