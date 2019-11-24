import React from 'react';
import { logoutUserAction } from "../../Actions/userAction";
import { getAllTaskAction, createTaskAction, deleteTaskAction, editTaskAction } from "../../Actions/todoAction";
import {connect} from "react-redux";

const MapStateToProps = (store) => {
    return({
        userData: store.user.signUpData,
        logoutData: store.user.logoutData,
        getAllTask: store.todo.getAllTaskData,
        createTask: store.todo.createTask,
        deleteTask: store.todo.deleteTask,
        updateTask: store.todo.updateTask
    })
}

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userName: "",
            taskList: [],
            taskName: "",
            bucketId: null,
            taskId: null,
            taskStatus: false
        };
    }

    componentDidMount() {
        var data = JSON.parse(window.localStorage.getItem('user'));
        var id = JSON.parse(window.localStorage.getItem('bucketId'));
        if(data===null && id === null) {
            this.props.history.push({
                pathname: `/`
            })
        } else {
            var token = data.token
            this.setState({
                userName: data.name,
                bucketId: id
            })
            this.props.dispatch(getAllTaskAction(id,token))
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.getAllTask !== nextProps.getAllTask) {
            if(nextProps.getAllTask.status) {
                this.setState({
                    taskList: nextProps.getAllTask.data
                })
            }
        }

        if(this.props.createTask !== nextProps.createTask) {
            if(nextProps.createTask.status) {
                var data = JSON.parse(window.localStorage.getItem('user'));
                var id = JSON.parse(window.localStorage.getItem('bucketId'));
                if(data===null && id === null) {
                    this.props.history.push({
                        pathname: `/`
                    })
                } else {
                    var token = data.token
                    this.props.dispatch(getAllTaskAction(id,token))
                    this.setState({
                        taskName: ""
                    })
                }
            }
        }
        if(this.props.logoutData !== nextProps.logoutData) {
            if(nextProps.logoutData.status) {
                var data = window.localStorage.removeItem('user');
                var id = window.localStorage.removeItem('bucketId')
                if(typeof(data) !== undefined && typeof(id) !== undefined) {
                    this.props.history.push({
                        pathname: `/`
                    })
                }
            }
        } 
        if(this.props.updateTask !== nextProps.updateTask) {
            if(nextProps.updateTask.status) {
                var data = JSON.parse(window.localStorage.getItem('user'));
                var id = JSON.parse(window.localStorage.getItem('bucketId'));
                if(data===null && id === null) {
                    this.props.history.push({
                        pathname: `/`
                    })
                } else {
                    var token = data.token
                    this.props.dispatch(getAllTaskAction(id,token))
                    this.setState({
                        taskName: "",
                        taskId: null
                    })
                }
            }
        }
        if(this.props.deleteTask !== nextProps.deleteTask) {
            if(nextProps.deleteTask.status) {
                var data = JSON.parse(window.localStorage.getItem('user'));
                var id = JSON.parse(window.localStorage.getItem('bucketId'));
                if(data===null && id === null) {
                    this.props.history.push({
                        pathname: `/`
                    })
                } else {
                    var token = data.token
                    this.props.dispatch(getAllTaskAction(id,token))
                }
            }
        }
    }

    getTaskTitle = (e) => {
        this.setState({
            taskName: e.target.value,
        })
    }

    save = () => {
        var userData = JSON.parse(window.localStorage.getItem('user'));
        if(typeof(userData) === undefined) {
            this.props.history.push({
                pathname: `/`
            })
        } else {
            var data = {
                title: this.state.taskName,
                status: false,
                bucketId: this.state.bucketId
            }
            var token = userData.token
            this.props.dispatch(createTaskAction(data, token))
        }
    }

    edit = () => {
        var userData = JSON.parse(window.localStorage.getItem('user'));
        if(typeof(userData) === undefined) {
            this.props.history.push({
                pathname: `/`
            })
        } else {
            var data = {
                title: this.state.taskName,
                status: this.state.taskStatus,
                id: this.state.taskId
            }
            var token = userData.token
            this.props.dispatch(editTaskAction(data, token))
        }
    }

    editTask(value) {
        this.setState({
            taskId: value._id,
            taskStatus: value.status,
            taskName: value.title
        })
    }

    deleteTask(id) {
        var userData = JSON.parse(window.localStorage.getItem('user'));
        if(typeof(userData) === undefined) {
            this.props.history.push({
                pathname: `/`
            })
        } else {
            var data = {
                id: id
            }
            var token = userData.token
            this.props.dispatch(deleteTaskAction(data, token))
        }
        
    }

    getStatus(e) {
        if(e.target.id==="complete") {
            this.setState({
                taskStatus: true
            })
        } else {
            this.setState({
                taskStatus: false
            })
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

      removeTaskName = () => {
        this.setState({
          taskName: "",
          taskId: null
        })
      }
    
    render() {
        return(
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
                            <button className="btn btn-warning" data-toggle="modal" data-target="#showModal" >Create Task</button>
                        </div>
                        <div className="modal fade" id="showModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Task title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.removeTaskName}>
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <input onChange={this.getTaskTitle} value={this.state.taskName.length !== 0 ? this.state.taskName: ""}/>
                                        {
                                            this.state.taskId ?
                                            <div style={{marginTop: "12px"}}>
                                                <input type="radio" name="task" value="pending" id="pending" checked={this.state.taskStatus === false ? true: false} onClick={this.getStatus.bind(this)} style={{marginRight: "12px"}}/> Pending<br></br>
                                                <input type="radio" name="task" value="complete" id="complete" checked={this.state.taskStatus === true ? true: false} onClick={this.getStatus.bind(this)} style={{marginRight: "12px"}}/>Complete 
                                            </div>
                                            : null
                                        }
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.removeTaskName}>Close</button>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.state.taskId !== null ? this.edit : this.save}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.taskList && this.state.taskList.length !== 0 ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.taskList.map((value,key) => {
                                                return(
                                                    <tr>
                                                        <td>{value.title}</td>
                                                        <td>{value.status === false ? "Pending":"Confirmed"}</td>
                                                        <td>{value.updatedAt.split('T')[0]}</td>
                                                        <td>
                                                            <button onClick={this.editTask.bind(this, value)} className="btn btn-warning" style={{marginRight: "10px"}} data-toggle="modal" data-target="#showModal">Edit</button>
                                                            <button onClick={this.deleteTask.bind(this, value._id)} className="btn btn-danger">Delete</button> 
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                            : <div className="not-found">No Task</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(MapStateToProps)(UserInfo);