import { userConstants } from "./../_constants"

import { history } from "../_helpers";

export const loginAsync = loginData => dispatch => {

    dispatch({ type : userConstants.LOGIN_REQUEST });
    const username = loginData.username;
    const password = loginData.password;

    fetch('http://localhost:8082/login/', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            "username": username, "password": password
        })
    })
    .then((res) => res.json())
    .then(data=> {
            console.log(data);

            if(data.token) {
                localStorage.setItem("user", JSON.stringify(data));
                history.push("/home")
                return dispatch({ type : userConstants.LOGIN_SUCCESS });
            } else {
                return dispatch({
                  type : userConstants.LOGIN_FAILURE,
                  msg : "Could't log in user"
                });
            }
        })
    .catch(err=> {
            console.log(err);
        });
}
export const logout = () => dispatch => {

    fetch('http://localhost:8082/logout/', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
    }).then(data=> {
        console.log(data);
        dispatch({ type : userConstants.LOGOUT });
    })
    localStorage.removeItem("user");
    history.push("/home")
}

export const register = (registerData) => dispatch => {
    console.log(registerData);

    fetch('http://localhost:8082/register/', {
        method: 'post',
        body: JSON.stringify({
            "username": registerData.username, "password": registerData.password, email: registerData.email
        }),
        headers: {'Content-Type' : 'application/json'},
    }).then(data=> {
        dispatch({type: userConstants.REGISTER});
        history.push("/login")
    })

}