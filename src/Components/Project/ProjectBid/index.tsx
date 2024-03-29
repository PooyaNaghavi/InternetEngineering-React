import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import { number } from "prop-types";
import { Redirect } from "react-router";

export interface ProjectBidProps {
  projectId: string | null;
  deadlinePassed: boolean;
  alreadyBid: boolean;
}

export interface ProjectBidState {
  amount: number;
  userHasBid: boolean;
  error: boolean;
}

class ProjectBid extends React.Component<ProjectBidProps, ProjectBidState> {
  constructor(props: ProjectBidProps) {
    super(props);
    this.state = {
      amount: 0,
      userHasBid: false,
      error: false
    };
  }

  render() {
    const { deadlinePassed, alreadyBid } = this.props;
    const { userHasBid, error } = this.state;

    return !localStorage.getItem("JWT") ? (
      <Redirect to="/login" />
    ) : (
        <div className="bid-status-container section-container">
          <div className="sabt-e-pishnahad">ثبت پیشنهاد</div>
          {!deadlinePassed && !alreadyBid && !userHasBid && (
            <form
              className="insert-bid-form"
              onSubmit={e => this.handleSubmit(e)}
              method="POST"
            >
              <div className="form-input-container">
                <input
                  className="insert-bid-input"
                  type="number"
                  onChange={e => this.handleInputChange(e)}
                  placeholder="پیشنهاد خود را وارد کنید"
                />
                <div className="form-input-text">تومان</div>
              </div>
              <button className="insert-bid-button" type="submit">
                ارسال
            </button>
            </form>
          )}
          {!deadlinePassed && (alreadyBid || userHasBid) && (
            <div className="already-bid">
              <i className="flaticon-check-mark" />
              <div>شما قبلا پیشنهاد خود را ثبت کرده‌اید</div>
            </div>
          )}
          {deadlinePassed && (
            <div className="bid-deadline-passed">
              <i className="flaticon-danger" />
              <div>مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده است!</div>
            </div>
          )}
          {error && (
            <div className="project-bid-error">
              درخواست شما با خطا مواجه شد، لطفا دوباره تلاش کنید
          </div>
          )}
        </div>
      );
  }
  handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      amount: parseInt(e.target.value),
      error: false
    });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/project/bid?id=${
        this.props.projectId
        }`,
        {
          amount: this.state.amount
        },
        {
          headers: {
            "content-type": "application/json; charset=utf-8",
            Authorization: localStorage.getItem("JWT")
          }
        }
      )
      .then((response: any) => {
        this.setState({
          error: false,
          userHasBid: true
        });
      })
      .catch((err: any) => {
        console.error(err);
        this.setState({
          error: true
        });
      });
  }
}

export default ProjectBid;
