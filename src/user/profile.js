import React , { Component } from 'react'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    async componentDidMount(){
        const userId = this.props.match.params.userId;
        await fetch(`http://localhost:8080/user/${userId}`, {
            method: "GET",
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        })

        .then(response => {
            return response.json()
        })

        .then( data => {
            if(data.error){
                this.setState({ redirectToSignin: true})
            }else{
                this.setState({ user: data })
            }
        })
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

