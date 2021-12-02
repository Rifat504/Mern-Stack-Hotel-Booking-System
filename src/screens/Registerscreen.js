import React, { useState } from "react";
import axios from "axios";
import Loader from "react-spinners/BounceLoader";
import Error from "../components/Error";
import Success from "../components/Success";

const Registerscreen = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  const register = async() =>{
      if(password===cpassword){
          const user = {
            name,
            email,
            password,
            cpassword
          }
         try {
           setloading(true);
           const result = await axios.post('/api/users/register',user).data
           setloading(false);
           setsuccess(true);

           setname('')
           setemail('')
           setpassword('')
           setcpassword('')
         } catch (error) {
           console.log(error);
           setloading(false);
           seterror(true);
           
         }
      }else{
          alert("Password not Matched")
      }
  }
  return (
    <div>
    {loading && (<Loader/>)}
    {error && (<Error/>)}
   

    <div className="row justify-content-center bs m-5 p-2">
      <div className="col-md-5">
      {success && (<Success message='Registration Success'/>)}
        <div className="m-5">
          <h2 className="text-center">Register</h2>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Name"
            value={name} 
            onChange={(e)=>{setname(e.target.value)}}
            />
          <input 
            type="text" 
            className="form-control" 
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
          <input
            type="text"
            className="form-control"
            placeholder="Confirm Password"
            value={cpassword} 
            onChange={(e)=>{setcpassword(e.target.value)}}
          />
          <button onClick={register} className="mt-3 shadow-none btn btn-dark">Register</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Registerscreen;
