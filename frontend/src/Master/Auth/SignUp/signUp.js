import React from "react";
import { createUserAction } from "../../../Actions/userAction";
import {connect} from "react-redux";

const MapStateToProps = (store) => {
    return({
        userData: store.user.signUpData
    })
}

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                name:"",
                email: "",
                password: ""
            },
            signUpError: false,
            showValidateErr: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.userData !== nextProps.userData) {
            if(nextProps.userData && nextProps.userData.status) {
                window.localStorage.setItem('user', JSON.stringify(nextProps.userData.data));
                this.props.history.push({
                    pathname: `/dashboard`
                })
            } else {
                this.setState({
                    signUpError: true
                })
            }
        }
    }

    getUserInfo = (e) => {
        this.setState({
            showValidateErr: false
        })
        var input = e.target.value
        if (input && input.length !== 0) {
            var obj = Object.assign({}, this.state.userData)
            var field = e.target.id
            obj[field] = input
            this.setState({
                userData: obj
            })
        }
    }

    goToDashboard = ()  => {
        this.setState({
            signUpError: false
        })
        if(this.state.userData && this.state.userData.length !== 0) {
            var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            if(regex.test(this.state.userData.email))
                this.props.dispatch(createUserAction(this.state.userData))
            else{
                this.setState({
                    showValidateErr: true
                })
            }
        }
    }

    goToLogin = () => {
        this.props.history.push({
            pathname: `/`
        })
    }

    render() {
        return(
            <div className="auth-main-container">
                <div className="row auth-container">
                    <div className="col-sm-8 col-md-6 col-lg-5 auth-container-wrapper" style={{height: "585px"}}>
                        {
                            this.state.signUpError ?
                            <div className="error-message">Email Already Exist</div>
                            : null
                        }
                        <div className="auth-flex">
                            <label>Name</label>
                            <input type="text" placeholder="Enter your name" id="name" autoComplete="off" onChange={this.getUserInfo}/>
                        </div>
                        <div className="auth-flex">
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email" id="email" autoComplete="off" onChange={this.getUserInfo}/>
                            {this.state.showValidateErr ? <div>Email is invalid.</div>: null}
                        </div>
                       <div className="auth-flex">
                            <label>Password</label>
                            <input type="password" id="password" autoComplete="off" onChange={this.getUserInfo}/>
                       </div>
                        <button className="login-btn btn-primary btn-lg active" onClick={this.goToDashboard}>Sign Up</button>
                        <div className="auth-option">OR</div>
                        <div onClick={this.goToLogin} style={{cursor: "pointer"}}>Login</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect(MapStateToProps)(SignUp);