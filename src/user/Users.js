import React, { Component } from 'react'
import { list } from './apiUser'

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

    render(){
        const { users } = this.state;
        return (
            <>
                
                <div className = "box container ">
                    <div className = "title">Users</div>
                        <div className = "block">
                        {users.map((user, i) => (
                                <>
                                    <div className = "card" key = {i}>
                                        <div  > {user.name}</div>
                                    </div>
                                
                                </>
                                
                            ))}
                    </div>
                        
                
                </div>
            </>
            
        )
    }
}

export default Users;