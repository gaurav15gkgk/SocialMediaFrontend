import React, { Component } from 'react'
import {signup} from '../auth'

class Signup extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            loading: false


        };
    }
    //to handle the change in input boxes and assigning the error associated with it if any
    handleChange = name => event => {
        this.setState({ error: ""})
        this.setState({ [name]: event.target.value })
    };

    //sending data to backend when submit button is clicked
    clickSubmit = event => {
        event.preventDefault()
        this.setState({loading:true})
        const { name, email, password }= this.state
        const user = {
            name,
            email,
            password
        }
        signup(user).then(data => {
            if(data.error){
                this.setState({ error : data.error, loading:false})
            }
            else{
                this.setState({
                    error: "",
                    name: "",
                    email:"",
                    password: "",
                    open: true,
                    loading: false
                })
            }
        })
       

    };
    

    //signup form 
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


    //warning and confirmation messages
    Message = (error, open) => (
        <>
        <div className="notification is-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="notification is-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please Sign In.
                </div>
                </>
    )
    render(){
        const { name, email, password, error, open,loading} = this.state;
        return (
            //SignUp page
            <div className="box box-shadow container mt-6"> 
                <h2 className ="title">Signup</h2>
                {this.Message(error, open)}    
                {loading ?(
                    <progress class="progress is-small is-dark" max="100">15%</progress>
                ):("")}
                {this.signupForm(name, email, password)}
            </div>
        )
    }


}

export default Signup;