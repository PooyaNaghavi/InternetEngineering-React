import React, { Component } from "react";
import axios from "axios";

import "./style.css";
import Footer from "../Utils/Footer";
import Header from "../Utils/Header";

import projectPic from "../Project/assets/Project.jpg";
import UserPreview from "./UserPreview/index";
import ProjectPreview from "./ProjectPreview/index";

interface HomeState {
  users: Array<any>,
  projects: Array<any>,
  searchInput: string,
  searchPlaceHolder: string,
  searchPlaceHolderColor: string
}

interface Props { }

class HomePage extends Component<Props, HomeState> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      users: [],
      projects: [],
      searchInput: '',
      searchPlaceHolder: 'جستجو در جاب‌اونجا',
      searchPlaceHolderColor: ''
    };
  }

  componentDidMount() {
    const profilesUrl: string = `${process.env.REACT_APP_BASE_URL}/users`;
    axios
      .get(profilesUrl, {})
      .then((response: any) => {
        console.log(response);
        this.setState({
          users: response.data
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
    const projectsUrl: string = `${process.env.REACT_APP_BASE_URL}/projects`;
    axios
      .get(projectsUrl, {})
      .then((response: any) => {
        console.log(response);
        this.setState({
          projects: response.data
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  render() {
    const { users, searchPlaceHolder, searchInput, searchPlaceHolderColor } = this.state;
    return (
      <div>
        <Header />
        <div className="row homepage-blue-background" />

        <div className="container body-container">
          <div className="row">
            <div className="col-1 dummy" />
            <div className="col-10">
              <div className="home-container">
                <div className="home-title-container">
                  <div className="home-title">جاب‌اونجا خوب است!</div>
                  <div className="home-subtitle">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است
                  </div>
                </div>
                <div className="project-search-container">
                  <input
                    className={`search-input place-holder-${searchPlaceHolderColor}`}
                    onChange={e => this.handleSearchInputChange(e)}
                    value={searchInput}
                    type="text"
                    placeholder={searchPlaceHolder}
                  />
                  <button className="search-button" onClick={(e) => this.handleProjectSearchOnClick(e)}>جستجو</button>
                </div>
                <div className="home-body">
                  <div className="user-search">
                    <div className="user-search-container">
                      <input
                        className="user-search-input"
                        type="text"
                        placeholder="جستجو نام کاربر"
                      />
                    </div>
                    <div className="user-list">
                      {this.state.users.map(user => (
                        <UserPreview key={user.id} user={user} />
                      ))}
                    </div>
                  </div>
                  <div className="project-list">
                    {this.state.projects.map(project => (
                      <ProjectPreview
                        key={project.id}
                        project={project}
                        deadlinePassed={project.deadline < Date.now()}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 dummy" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      searchInput: e.target.value
    })
  }
  handleProjectSearchOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if (this.state.searchInput === '') {
      this.setState({
        searchPlaceHolder: 'ورودی جستجو نمی‌تواند خالی باشد.',
        searchPlaceHolderColor: 'red',
      })
    }
  }
}

export default HomePage;
