import axios from "axios";

export const loginStart = () => {
  return {
    type: "LOGIN_START"
  };
};
export const loginSuccess = (userId, idToken) => {
  console.log(userId);
  return {
    type: "LOGIN_SUCCESS",
    userId: userId,
    idToken: idToken
  };
};
export const loginFail = error => {
  return {
    type: "LOGIN_FAIL",
    error: error
  };
};
export const logout = () => {
  return dispatch => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("orderData");
    localStorage.removeItem("counter");
    localStorage.removeItem("finalPrice");
    dispatch(loginLogout());
    dispatch(orderLogout());
  };
};

export const loginLogout = () => {
  return {
    type: "LOGIN_LOGOUT"
  };
};
export const orderLogout = () => {
  return {
    type: "ORDER_LOGOUT"
  };
};

export const checkLoginTime = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const login = (email, password, loginMethod) => {
  return dispatch => {
    dispatch(loginStart());
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFr8_cD1hwNolhCWFe1befrevgrD1VU6g";
    if (loginMethod === "signUp") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFr8_cD1hwNolhCWFe1befrevgrD1VU6g";
    }

    axios
      .post(url, data)
      .then(response => {
        console.log(response.data);
        let expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(loginSuccess(response.data.localId, response.data.idToken));
        dispatch(checkLoginTime(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(loginFail(err.response.data.error));
        console.log(err.response.data.error);
      });
  };
};

export const checkloginExpiration = () => {
  return dispatch => {
    let token = localStorage.getItem("token");
    if (!token) {
      dispatch(checkLoginOrderData());
      dispatch(logout());
      // dispatch(checkLoginOrderData());
    } else {
      let expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        let userId = localStorage.getItem("userId");
        dispatch(loginSuccess(userId, token));
        dispatch(checkLoginOrderData());
        dispatch(
          checkLoginTime(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const checkLoginOrderData = () => {
  localStorage.removeItem("orderData");
  localStorage.removeItem("counter");
  localStorage.removeItem("finalPrice");
  return {
    type: "CHECK_LOGIN_ORDERDATA"
  };
};

// export const signUp = data => {
//   return dispatch => {
//     dispatch(loginStart());
//     const loginData = {
//       // firstName: data.firstName,
//       // lastName: data.lastName,
//       email: data.email,
//       password: data.password,
//       returnSecureToken: true
//     };

//     axios
//       .post(
//         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFr8_cD1hwNolhCWFe1befrevgrD1VU6g",
//         loginData
//       )
//       .then(response => {
//         console.log(response);
//         dispatch(loginSuccess(response.data.localId, response.data.idToken));
//       })
//       .catch(err => {
//         console.log(err);
//         dispatch(loginFail(err));
//       });
//   };
// };
