import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import {signin, authenticate} from "../auth"


class Signin extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
    }

    handleChange = name => event => {
        this.setState({ error: ""})
        this.setState({ [name]: event.target.value})

    }

   

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { email, password } = this.state;
        const user = {
            email,
            password
        }

        signin(user).then(data => {
            if(data.error){
                this.setState({ error: data.error,loading:false })
            }else{
                //authenticate
                authenticate(data, () => {
                    this.setState({ redirectToReferer: true})
                })
            }
        })
    }

    

    signinForm = ( email, password) => (
            <form>
                            
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

    warningMessage = (error) => (
        
        <div className="notification is-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
        </div>

               
    )
    render(){
        const { email ,password, error, redirectToReferer , loading} = this.state

        if(redirectToReferer){
            return <Redirect to = "/" />
        }
        return (
            <div className="box box-shadow container mt-6"> 
                <h2 className ="title">Signin</h2>
                {this.warningMessage(error)} 
                {loading ?(
                    <progress class="progress is-small is-dark" max="100">15%</progress>
                ):("")}   
                {this.signinForm( email, password)}
            </div>
        )
    }
    
}

export default Signin;