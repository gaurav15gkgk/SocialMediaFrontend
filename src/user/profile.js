import React , { Component } from 'react'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'
import {read } from './apiUser'

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                this.setState({ user: data });
            }
        });
    };

    componentDidMount(){
        const userId = this.props.match.params.userId;
        this.init(userId) 
    }
    render(){
        const redirectToSignin = this.state.redirectToSignin;
        if(redirectToSignin)
            return <Redirect to ='/signin' />
        return(
            <div className="box box-shadow container mt-6">
                <div className="title"> Profile</div>
                <div>Hello {isAuthenticated().user.name}</div>
                <div>Email: {isAuthenticated().user.email}</div>
                <div>{`Joined ${new Date(this.state.user.created).toDateString()}`}</div>
            </div>
        )
    }
}
export default Profile;

