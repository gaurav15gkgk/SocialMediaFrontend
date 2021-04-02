import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: 'hsl(229, 53%,  53%)' ,
                border:'1px solid hsl(0, 0%, 86%)',
                
            };
    } 
   
    else return { color: "#363636"}
   
};

const signout = next => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    return fetch("http://localhost:8080/signout", {
        method: "GET"
    })
        .then(response => {
            
            return response.json();
        })
        .catch(err => console.log(err));
};

const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

const Menu = ({ history }) =>(
    <div className="tabs is-centered is-boxed mt-3">
        <ul>
            <li >
                <Link  style ={isActive(history,'/')} to ="/">
                   
                    <span>Home</span>
                </Link>
            </li>
            { !isAuthenticated() && 
                <>
                    <li>
                        <Link style ={isActive(history,'/signup')} to  ='/signup'>
                            
                            <span>SignUp</span>
                        </Link>
                    </li>
                    <li>
                        <Link style ={isActive(history,'/signin')} to ='/signin'>
                            
                            <span>SignIn</span>
                        </Link>
                    </li>
                </>
            }


            {isAuthenticated() && 
                <>
                     <li>
                        <a href style ={isActive(history,'/signin'),
                            {cursor: "pointer", color: "#363636"}
                            
                            }  onClick={() => signout(() => history.push("/"))}>
                            
                            <span>Signout</span>
                        </a>
                    </li>

                    <li>
                        <a href >{isAuthenticated().user.name}</a>
                    </li>
           
                </>
            }
           
        </ul>
    </div>
)



export default withRouter(Menu)