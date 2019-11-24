import React from "react";
import "./userDashboard.css";
import TaskIcon from './../../images/task.png';
import EditIcon from './../../images/download.png';
import { logoutUserAction } from '../../Actions/userAction';
import { getAllBucketAction, createBucketAction, editBucketAction } from '../../Actions/bucketAction';
import {connect} from "react-redux";

const MapStateToProps = (store) => {
    return({
        userData: store.user.signUpData,
        logoutData: store.user.logoutData,
        getAllBucketData: store.bucket.getAllBucketData,
        createBucketData: store.bucket.createBucketData,
        updateBucketData: store.bucket.updateBucketData
    })
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        bucketName: "",
        bucketList: [],
        userName: "",
        bucketId: null,
        bucketIndex: null
    };
  }

  componentDidMount() {
    var data = JSON.parse(window.localStorage.getItem('user'));
    if(data===null) {
        this.props.history.push({
            pathname: `/`
        })
    } else {
        var token = data.token
        this.setState({
            userName: data.name
        })
        this.props.dispatch(getAllBucketAction(token))
    }
    var id = JSON.parse(window.localStorage.getItem('bucketId'));
    if(id !== null) {
        window.localStorage.removeItem('bucketId');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.logoutData !== nextProps.logoutData) {
        if(nextProps.logoutData.status) {
            var data = window.localStorage.removeItem('user');
            if(typeof(data) !== undefined) {
                this.props.history.push({
                    pathname: `/`
                })
            }
        }
    } 
    if(this.props.getAllBucketData !== nextProps.getAllBucketData) {
        if(nextProps.getAllBucketData.status) {
            this.setState({
                bucketList: nextProps.getAllBucketData.data,
                bucketName: ""
            }, () => {
              window.history.pushState(null, document.title, window.location.href);
              window.addEventListener("popstate", function(event) {
                window.history.pushState(
                  null,
                  document.title,
                  window.location.href
                );
              });
            })
        }
    }
    if(this.props.createBucketData !== nextProps.createBucketData) {
        if(nextProps.createBucketData.status) {
            var data = JSON.parse(window.localStorage.getItem('user'));
            if(typeof(data) === undefined) {
                this.props.history.push({
                    pathname: `/`
                })
            } else {
                var token = data.token
                this.props.dispatch(getAllBucketAction(token))
                this.setState({
                    bucketName: ""
                })
            }
        }
    }
    if(this.props.updateBucketData !== nextProps.updateBucketData) {
        if(nextProps.updateBucketData.status) {
            var data = JSON.parse(window.localStorage.getItem('user'));
            if(typeof(data) === undefined) {
                this.props.history.push({
                    pathname: `/`
                })
            } else {
                var token = data.token
                this.props.dispatch(getAllBucketAction(token))
                this.setState({
                    bucketName: "",
                    bucketId: null
                })
            }
        }
    }
  }

  getInfo = (e) => {
    this.setState({
        bucketName: e.target.value
    })
  }

  save = () => {
    var data = JSON.parse(window.localStorage.getItem('user'));
    if(typeof(data) === undefined) {
        this.props.history.push({
            pathname: `/`
        })
    } else {
        var token = data.token
        var data = {
            bucketName: this.state.bucketName
        }
        this.props.dispatch(createBucketAction(data,token))
    }
  }

  edit = () => {
    var data = JSON.parse(window.localStorage.getItem('user'));
    if(typeof(data) === undefined) {
        this.props.history.push({
            pathname: `/`
        })
    } else {
        var token = data.token
        var data = {
            bucketName: this.state.bucketName,
            bucketId: this.state.bucketId
        }
        this.props.dispatch(editBucketAction(data,token))
    }
  }

  logout = () => {
    var data = JSON.parse(window.localStorage.getItem('user'));
     if(typeof(data) !== undefined) {
        var email = data.email
        var token = data.token
        this.props.dispatch(logoutUserAction(email, token))
    } else{
        this.props.history.push({
            pathname: '/'
        })
    }
  }

  getTheBucketIndex(value) {
    this.setState({
        bucketIndex:value,
    })
  }

  removeTheBucketIndex() {
      this.setState({
        bucketIndex:null,
      })
  }

  getTheEditData(value, e) {
    e.stopPropagation();
    this.setState({
        bucketId:value._id,
        bucketName: value.bucketName
    })
  }

  getTheBucketData(id){
      var data = window.localStorage.setItem("bucketId",JSON.stringify(id))
      if(typeof(data) !== undefined) {
          this.props.history.push({
              pathname: `/dashboard/${id}`
          })
      }
  }

  removeBucketName = () => {
    this.setState({
      bucketName: ""
    })
  }

  render() {
    return (
      <div className="dashboard-main-container">
          <div className="dashboard-container-wrapper">
            <div className="dashboard-nav row">
              <div className="col-sm-12 col-md-12 col-lg-12 dashboard-nav-wrapper">
                <div className="col-sm-8 col-md-8 col-lg-8">
                  Welcome {this.state.userName}
                </div>
                <div className="col-md-4 col-lg-4 btn">
                  <button
                    className="btn-sort"
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="dashboard-data col-sm-10 col-md-10 col-lg-10">
                <div style={{textAlign: "right",marginBottom: "15px"}}>
                    <button className="btn btn-warning" data-toggle="modal" data-target="#showmodal">Create Bucket</button>
                </div>
                <div className="modal fade" id="showmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLongTitle" onClick={this.removeBucketName}>Bucket title</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                          <input onChange={this.getInfo} value={this.state.bucketName.length !== 0 ? this.state.bucketName : "" }/>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.removeBucketName}>Close</button>
                          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.state.bucketId !== null ? this.edit : this.save}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              {(this.state.bucketList) &&
                 (this.state.bucketList).length !== 0 ? ( 
                <div className="row" style={{ paddingTop: "60px" }}>
                  {this.state.bucketList.map((value, key) => {
                    return (
                      <div
                        className="col-sm-12 col-md-6 col-lg-4 dashboard-margin"
                        key={key}
                      >
                        <div
                          className="dashboard-card"
                          onClick={this.getTheBucketData.bind(
                            this,
                            value._id
                          )}
                            onMouseOver={this.getTheBucketIndex.bind(this, key)}
                            onMouseLeave={this.removeTheBucketIndex.bind(this)}
                        >
                            <div style={{textAlign: "right"}}>
                              {
                                this.state.bucketIndex === key ?
                                <img src={EditIcon} alt="" width="30px" height="30px" data-toggle="modal" data-target="#showmodal" onClick={this.getTheEditData.bind(this, value)}/>
                                  :null
                              }   
                            </div>
                          <div style={{ width: "100px", margin: "auto" }}>
                            <img src={TaskIcon} alt="" width="100%" />
                          </div>
                          <div style={{display:"flex"}}>Bucket :<div style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              width: "80px",
                              marginLeft: "5px"
                          }}> {value.bucketName}</div></div>
                        </div>
                      </div>
                     );
                  })} 
                </div>
              ) : ( 
                <div className="not-found">
                  <div>Not Bucket is available. Please create new bucket!!</div>
                </div>
                ) 
              } 
            </div>
          </div>
      </div>
    );
  }
}

export default connect(MapStateToProps)(Dashboard);
