// TAKE A LOOK at this way of organize request api services
import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        //console.log(response.data);
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  validateUserToken() {
    //compare jwt token in server
  }
}

export default new AuthService();

//TODO this is for sessions auth, not at the moment
// import {
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,
//     REGISTER_SUCCESS,
//     REGISTER_FAIL,
//     AUTH_SUCCESS,
//     AUTH_FAIL,
//     LOGOUT_SUCCESS,
//     IS_LOADING,
//   } from "./types";

//   axios.defaults.baseURL = "http://localhost:8000";

//   //check if user is already logged in
//   export const isAuth = () => (dispatch) => {

//     axios
//     .get("api/users/authchecker", {withCredentials: true})
//     .then((res) =>
//     dispatch({
//         type: AUTH_SUCCESS,
//         payload: res.data,
//     })
//     )
//     .catch((err) => {
//         dispatch({
//             type: AUTH_FAIL,
//         });
//     });

//   }

//   //Logout User and Destroy session
// export const logout = () => (dispatch) => {

//     axios
//     .delete("/api/users/logout", { withCredentials: true })
//     .then((res) =>
//       dispatch({
//         type: LOGOUT_SUCCESS,
//       })
//     )
//     .catch((err) => {
//       console.log(err);
//     });

// }

//Register New User
// export const register = ({ name, email, password }) => (dispatch) => {
//     // Headers
//     const headers = {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     };

//     // Request body
//     const body = JSON.stringify({ name, email, password });

//     axios
//       .post("/api/users/register", body, headers)
//       .then((res) =>{
//         dispatch(returnStatus(res.data, res.status, 'REGISTER_SUCCESS'));
//         dispatch({ type: IS_LOADING })
//       })
//       .catch((err) => {
//         dispatch(returnStatus(err.response.data, err.response.status, 'REGISTER_FAIL'))
//         dispatch({
//           type: REGISTER_FAIL
//         });
//         dispatch({ type: IS_LOADING })
//       });
//   };

//   //Login User
//   export const login = ({ email, password }) => (dispatch) => {
//     // Headers
//     const headers = {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     };

//     // Request body
//     const body = JSON.stringify({ email, password });

//     axios
//       .post("/api/users/login", body, headers)
//       .then((res) => {
//         console.log(res);
//         dispatch({
//           type: LOGIN_SUCCESS,
//           payload: res.data
//         });
//         dispatch({ type: IS_LOADING });
//       }
//       )
//       .catch((err) => {
//         dispatch(returnStatus(err.response.data, err.response.status, 'LOGIN_FAIL'))
//         dispatch({
//           type: LOGIN_FAIL
//         });
//         dispatch({ type: IS_LOADING })
//       });
//   };
