import React, { useState } from "react";
import axios from "axios";
import Loader from "react-spinners/BounceLoader";
import Error from "../components/Error";

const Loginscreen = () => {
  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const Login = async() =>{
          const user = {
            email,
            password
          }
          try {
            setloading(true);
            const result = (await axios.post('/api/users/login',user)).data
            setloading(false);
           
            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href = '/home'
          } catch (error) {
            console.log(error);
            setloading(false);
            seterror(true);
            
          }
  }
  return (
    <div>
      {loading && (<Loader />)}
    <div className="row justify-content-center bs m-5">
      <div className="col-md-5">
        <div className="m-5">
        {error && (<Error message='Invalid Credentials'/>)}
          <h2 className="text-center">Login</h2>
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e)=>{setemail(e.target.value)}}
            />
          <input 
            type="text" 
            className="form-control" 
            placeholder="Password" 
            value={password} 
            onChange={(e)=>{setpassword(e.target.value)}}
            />
          <button onClick={Login} className="mt-3 shadow-none btn btn-dark">Login</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Loginscreen;
