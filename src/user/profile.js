import React , { Component } from 'react'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'
import {read } from './apiUser'
import DefaultProfile from '../images/avatar.png'
import DeleteUser from './DeleteUser'
import { Link } from 'react-router-dom'

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

    componentWillRecieveProps(props){
        const userId = props.match.params.userId
        this.init(userId)
    }
    render(){
        const {redirectToSignin, user} = this.state;
        if(redirectToSignin)
            return <Redirect to ='/signin' />
        return(
            <div className="box box-shadow container mt-6">
                <div className="title"> Profile</div>
                <div className = "columns">
                    <div className ="column">
                        <div >
                        <div className="card-image">
                            <figure >
                            <img src={DefaultProfile} alt={user.name}  style={{
                                width: "50%",
                                objectFit: "cover"
                            }}></img>
                            </figure>
                        </div>
                        </div>
                        
                       
                    </div>

                    <div className = "column">
                    {isAuthenticated().user && isAuthenticated().user._id === user._id && (
                         <div class="buttons">
                            <Link className="button is-warning  " to= {`/user/edit/${user._id}`}>Edit profile</Link>
                            <DeleteUser userId = {user._id} />
                          </div>
                          
                        )} 
                    <div>Hello {user.name}</div>
                        <div>Email: {user.email}</div>
                        <div>{`Joined ${new Date(this.state.user.created).toDateString()}`}</div>
                       
                    </div>
                </div>
               
            </div>
        )
    }
}
export default Profile;

