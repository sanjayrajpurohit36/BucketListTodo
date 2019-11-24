import React from "react";
import "./login.css";
import { loginUserAction } from "../../../Actions/userAction";
import { connect } from "react-redux";

const MapStateToProps = store => {
    return {
        userData: store.user.signUpData
    };
};

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            userData: {
                email:"",
                password:""
            },
            showErr: false,
            showValidateErr: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.userData !== nextProps.userData) {
            if(nextProps.userData.status) {
                window.localStorage.setItem('user', JSON.stringify(nextProps.userData.data));
                this.props.history.push({
                    pathname: `/dashboard`
                })
                var data = JSON.parse(window.localStorage.getItem('user'));
            if(typeof(data) !== undefined) {
                this.props.history.push({
                    pathname: `/dashboard`
                })
            } else {
                this.props.history.push({
                    pathname: `/`
                })
            }
            }
            if(nextProps.userData.status===false && nextProps.userData.message === "Invalid password!") {
                this.setState({
                    showErr: true
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
        if(this.state.userData && this.state.userData.length !== 0) {
            var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            if(regex.test(this.state.userData.email))
                this.props.dispatch(loginUserAction(this.state.userData))
            else(
                this.setState({
                    showValidateErr: true
                })
            )
        }
        this.setState({
            showErr: false
        })
    }

    goToSignUp = () => {
        this.props.history.push({
            pathname: `/signup`
        })
    }

    render() {
        return(
            <div className="auth-main-container">
                <div className="row auth-container">
                    <div className="col-sm-8 col-md-6 col-lg-5 auth-container-wrapper">
                        {
                            this.state.showErr ?
                            <div className="error-message">Incorrect Credentials</div>
                            : null
                        }
                        <div className="auth-flex">
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email" id="email" onChange={this.getUserInfo} autoComplete="off"/>
                            {this.state.showValidateErr ? <div>Email is invalid.</div>: null}
                        </div>
                        <div className="auth-flex">
                            <label>Password</label>
                            <input type="password" id="password" onChange={this.getUserInfo} autoComplete="off"/>
                        </div>
                        <button onClick={this.goToDashboard} className="login-btn btn-primary btn-lg active">Login</button>
                        <div className="auth-option">OR</div>
                        <div onClick={this.goToSignUp} style={{cursor: "pointer"}}>Sign Up</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(MapStateToProps)(Login);