import React from 'react';
import './style.css'

export interface UserInfoProps {
    profilePictureURL: string,
    firstName: string,
    lastName: string,
    jobTitle: string,
    id: string | null,
}

export interface UserInfoState {

}

class UserInfo extends React.Component<UserInfoProps, UserInfoState> {
    constructor(props: UserInfoProps) {
        super(props);
        this.state = {};
    }
    render() {
        const { profilePictureURL, lastName, firstName, jobTitle } = this.props
        return (
            <div className="row">
                <div className="col-1 dummy"></div>
                <div className="col-10">
                    <div className="profile-container">
                        <div className="profile-pic-border">
                            <img className="profile-pic" src={profilePictureURL} alt="عکس پروفایل کاربر" />
                        </div>
                        <div className="skewed-rectangle-container">
                            <div className="rectangle big skewed"></div>
                        </div>
                        <div id="title-container">
                            <div id="profile-name">
                                <span className="first-name">{firstName}</span>
                                <span className="last-name">{lastName}</span>
                            </div>
                            <div id="job-title">{jobTitle}</div>
                        </div>
                    </div>
                </div>
                <div className="col-1 dummy"></div>
            </div>
        );
    }
}

export default UserInfo;