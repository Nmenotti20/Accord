import React, { useState, useContext } from "react";
import "./style.css";
import { useHistory } from 'react-router-dom';
import { FaUnlock } from "react-icons/fa";
import { FaUsers  } from "react-icons/fa";
import API from "../utils/API/userAPI";
import UserContext from "../utils/Context/UserContext";
import {Animated} from "react-animated-css";

function UserLogin() {
  const routerHistory = useHistory();
  const { changeUser } = useContext(UserContext);

  const [formObject, setFormObject] = useState({});
  const [message, setMessage] = useState({
    text: "",
    color: ""
  });

  function handleLoginChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.username && formObject.password) {
      API.login({
        username: formObject.username,
        password: formObject.password,
      })
        .then(function (res) {
          if (res.data.message === "Welcome!") {
            const loginPromise = new Promise((resolve, reject) => {
              document.cookie = `token=${res.data.token}; Domain=${window.location.hostname}; SameSite=Strict; Secure`;
              resolve(res.data.token)
            });

            loginPromise
              .then(() => {
                localStorage.setItem("loggedInAs", res.data.loggedInAs);
                localStorage.setItem("name", res.data.name);
                localStorage.setItem("image", res.data.image);
              })
              .then(() => {
                changeUser(res.data.token, 'user', res.data.name, res.data.image)
              })
              .then(() => {
                setMessage({
                  text: res.data.message,
                  color: 'success'
                })
              })
              .then(() => routerHistory.push('/profile'))
            // document.cookie = `token=${res.data.token};SameSite=Lax; Secure`;
            // localStorage.setItem("loggedInAs", res.data.loggedInAs);
            // localStorage.setItem("name", res.data.name);
            // localStorage.setItem("image", res.data.image);
            // document.cookie = `loggedInAs=${res.data.loggedInAs}; SameSite=Lax; Secure`;
            // document.cookie = `name=${res.data.name}; SameSite=Lax; Secure`;
            // document.cookie = `image=${res.data.image}; SameSite=Lax; Secure`;
            // changeUser(res.data.token, 'user', res.data.name, res.data.image);
            // setMessage({
            //   text: res.data.message,
            //   color: "success",
            // })
            // window.location.replace("/profile")
          } else if (res.data.message === "Username or password does not match") {
            console.log(res.data.message)
            setMessage({
              text: res.data.message,
              color: "danger",
            });
          }
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-center h-100">
      <Animated animationIn="bounceInLeft" isVisible={true}>
        <div className="card">
          <div className="card-header">
            <h3>
              Returning User<br></br>Sign In
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaUsers   />{" "}
                  </span>
                </div>
                <input
                    name="username"
                  type="username"
                  className="form-control"
                  placeholder="User Name"
                  onChange={handleLoginChange}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaUnlock />{" "}
                  </span>
                </div>
                <input
                name = "password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleLoginChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Login"
                  className="btn float-right login_btn"
                />
                <div id="message" className={`text-${message.color}`}>
                  {message.text}
                </div>
              </div>
              <a href="./NewUser" className="card-link">
                Create NEW<br></br> User Account
              </a>
            </form>
          </div>
        </div>
        </Animated>
      </div>
      <div className="container"></div>
    </div>
  );
}

export default UserLogin;
