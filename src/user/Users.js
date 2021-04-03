import React, { Component } from 'react'
import { list } from './apiUser'
import DefaultProfile from '../images/avatar.png'
import { Link } from 'react-router-dom'

class Users extends Component {
    constructor(){
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        list().then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({ users: data })
            }
        })
    }

    renderUsers = users => (
        < >
            {users.map((user, i) => (
                <div className =" card  column  is-one-third" key = {i}>
                     <div className=" card-image">
                            <figure >
                            <img src={DefaultProfile} alt={user.name}  style={{
                                width: "50%",
                                objectFit: "cover"
                            }}></img>
                            </figure>
                     </div>
                     <div className ="card-content" >
                        <div className="content">{user.name}</div>
                        <div className="content">{user.email}</div>  
                        <div className ="card-footer">
                        <Link to ={`/user/${user._id}`} class="button is-warning card-footer-item">View Profile</Link> 
                        </div>
                         
                     </div>
                    
                </div>
            ))}
        </>
    )

    render(){
        const { users } = this.state;
        return (
            <>
                
                <div className = "box container ">
                    <div className = "title">Users</div>
                        <div className = "columns is-multiline " >
                        {this.renderUsers(users)}
                        
                        </div>
                        
                
                </div>
            </>
            
        )
    }
}

export default Users;