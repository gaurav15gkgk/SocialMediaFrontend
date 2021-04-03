import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from "../auth"

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: 'hsl(229, 53%,  53%)' ,
                border:'1px solid hsl(0, 0%, 86%)',
                
            };
    } 
   
    else return { color: "#363636"}
   
};




const Menu = ({ history }) =>(
    <div className="tabs is-centered is-boxed mt-3">
        <ul>
            <li >
                <Link  style ={isActive(history,'/')} to ="/">
                   
                    <span>Home</span>
                </Link>
            </li>
            <li >
                <Link
                    
                    style={isActive(history, "/users")}
                    to="/users"
                >
                    Users
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
                        <Link  style={isActive(
                                history,
                                `/user/${isAuthenticated().user._id}`
                            )} to ={`/user/${isAuthenticated().user._id}`} >{`${isAuthenticated().user.name}'s Profile`}</Link>
                    </li>
           
                </>
            }
           
        </ul>
    </div>
)



export default withRouter(Menu)