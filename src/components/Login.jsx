import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  
let navigate = useNavigate()

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/loginUser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }) 
    });
    const json = await response.json();
    console.log(json.authToken)
    if(json.authToken){
        localStorage.setItem('token',json.authToken)
        navigate("/")

    }
    else{
        alert("inavalid credentials")
    }


    try {

      const UserDetails = await fetch("http://localhost:5000/api/auth/GetUserDetails", {
        method: "GET",
  
        headers: {
          "Content-Type": "application/json",
          "auth-token":`${json.authToken}`
        },
      
      });
      const json2 = await UserDetails.json();
      console.log(json2)
       localStorage.setItem('credentials',JSON.stringify(json2))
      
    } catch (error) {
      console.log(error)
      
    }


  
   
   


  };

  return (
    <div>
      <h1 className="text-center">Login</h1>
      <form className="container col-6" onSubmit={handleOnSubmit}>
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
