import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import Footer from "../Utils/Footer";
import Header from "../Utils/Header";
import Cookies from "universal-cookie";
import Popup from "reactjs-popup";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class index extends Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      status: "initial",
      usernameValue: "",
      passwordValue: ""
    };
  }

  render() {
    const { status } = this.state;
    console.log(status === "error");
    return status === "logged-in" || localStorage.getItem("JWT") ? (
      <Redirect to="/" />
    ) : (
      <div>
        <form
          onSubmit={e => this.submitLoginFrom(e)}
          className="login-form"
          action="index.html"
          method="POST"
        >
          <h1 className="login-header">ورود</h1>

          <fieldset>
            <input
              onChange={e => this.handleUsernameInputChange(e)}
              className="login-box-style"
              type="text"
              id="username"
              name="user_username"
              placeholder="نام کاربری"
              value={this.state.usernameValue}
            />
            <input
              onChange={e => this.handlePasswordInputChange(e)}
              className="login-box-style"
              type="password"
              id="password"
              name="user_password"
              placeholder="کلمه‌ی عبور"
              value={this.state.passwordValue}
            />
            <Link className="alreadyBid" to="/register">
              ثبت نام نکرده‌اید؟
            </Link>
          </fieldset>
          <Popup
            trigger={
              <button className="login-button" type="submit">
                ورود
              </button>
            }
            open={this.state.status === "error"}
            position="right center"
          >
            <div> نام کاربری یا رمز عبور نادرست است. </div>
          </Popup>
        </form>
      </div>
    );
  }
  handleErrorButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    this.setState({ status: "initial" });
  }

  handlePasswordInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ passwordValue: e.target.value });
  }

  handleUsernameInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ usernameValue: e.target.value });
  }

  submitLoginFrom(e: React.FormEvent<HTMLFormElement>): void {
    const { usernameValue, passwordValue } = this.state;
    e.preventDefault();
    const url: string = `${process.env.REACT_APP_BASE_URL}/login`;
    console.log(url);
    axios
      .post(
        url,
        { userName: usernameValue, password: passwordValue },
        {
          headers: {
            "content-type": "application/json; charset=utf-8",
            Authorization: localStorage.getItem("JWT")
          }
        }
      )
      .then((response: any) => {
        console.log(response);
        localStorage.setItem("JWT", `Bearer ${response.data.jwttoken}`);
        localStorage.setItem("userId", response.data.userId);
        this.setState({ status: "logged-in" });
      })
      .catch((err: any) => {
        this.setState({ passwordValue: "", status: "error" });
      });
  }
}

export default index;

interface Props {}

interface State {
  usernameValue: string;
  passwordValue: string;
  status: string;
}
