
const signin = user => {
    
    return fetch(`http://localhost:8080/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

    .then(response => {
        return response.json()

    })
    .catch(err => console.log(err))
}

//signup function to send an api request to backend for creating a user
const signup = user => {
    return  fetch(`http://localhost:8080/signup`, {
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

const authenticate = (jwt, next) =>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    }
}

const signout = next => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    next();
    return fetch(`http://localhost:8080/signout`, {
        method: "GET"
    })
        .then(response => {
            
            return response.json();
        })
        .catch(err => console.log(err));
};

module.exports ={
    signin,
    signout,
    signup,
    authenticate,
    isAuthenticated
}