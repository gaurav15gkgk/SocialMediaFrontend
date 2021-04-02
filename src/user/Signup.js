import React, { Component } from 'react'

class Signup extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false


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
        const { name, email, password }= this.state
        const user = {
            name,
            email,
            password
        }
        this.signup(user).then(data => {
            if(data.error){
                this.setState({ error : data.error})
            }
            else{
                this.setState({
                    error: "",
                    name: "",
                    email:"",
                    password: "",
                    open: true
                })
            }
        })
       

    };
    //signup function to send an api request to backend for creating a user
    signup = user => {
        return  fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then( response => {
                return response.json()
            })
            .catch(err => console.log(err))
    }

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
                    <button onClick = {this.clickSubmit} className = "button is-dark is-rounded is-active">SUBMIT</button>
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
        const { name, email, password, error, open} = this.state;
        return (
            //SignUp page
            <div className="box box-shadow container mt-6"> 
                <h2 className ="title">Signup</h2>
                {this.Message(error, open)}    
                {this.signupForm(name, email, password)}
            </div>
        )
    }


}

export default Signup;