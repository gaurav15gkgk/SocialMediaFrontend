
import React , { Component } from 'react'
import { Redirect } from 'react-router'
import { isAuthenticated } from '../auth'
import { read , update} from './apiUser'

class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false
        }
    }

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if(data.error){
                this.setState({ redirectToProfile: true})
            }else{
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error:""
                })
            }
        })
    }

    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    clickSubmit = event => {
        event.preventDefault()
        const { name, email, password } = this.state
        const user = {
            name,
            email,
            password: password || undefined
        }
    

        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;

        update(userId, token, user).then(data => {
            if(data.error){
                this.setState({ error: data.error })
            }
            else{
                this.setState({
                    redirectToProfile:true
                })
            }
        })
    }

    
        signupForm = (name, email, password) => (
            <form>
                    <div className ="field">
                            <label className = "label">Name</label>
                            <div className = "control">
                            <input onChange = {this.handleChange("name")}
                                type = "text" 
                                className = "input is-rounded"
                                value = {name} ></input>
                        </div>
                            </div>
                            
                        <div className ="field">
                            <label className = "label">Email</label>
                            <div className = "control has-icons-left has-icons-right">
                            <input onChange = {this.handleChange("email")}
                                type = "email" 
                                className = "input is-rounded"
                                value = {email} ></input>
                             <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                            </div>
                            </div>
                           
                        <div className ="field">
                            <label className = "label">Password</label>
                            <input onChange = {this.handleChange("password")}
                                type = "password" 
                                className = "input is-rounded"
                                value = {password} ></input>
                        </div>
                        <button onClick = {this.clickSubmit} className = "button is-dark is-rounded is-focused ">SUBMIT</button>
            </form>
        )

    render(){
        const { id,name, email, password ,redirectToProfile } = this.state

        if(redirectToProfile){
            return <Redirect to ={`/user/${id}`} />
        }
        return (
            <div className ="container box">
                <div className ="title">Edit Profile</div>
                {this.signupForm(name, email, password)}
            </div>
        )
    }
}

export default EditProfile;