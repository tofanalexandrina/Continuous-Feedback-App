import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp(){
    const [name, setName]=useState()
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const navigate=useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/api/auth/signup', {name, email, password})
        .then(result=>{console.log(result);
        navigate('/login')})
        .catch(err=>console.log(err))
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="bg-white p-3 rounded w-25">
                <h2 className="text-center mb-4">Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" placeholder="Name" autoComplete="off" name="name" className="form-control rounded-0" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="email" placeholder="Email" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="password" placeholder="Password" name="password" className="form-control rounded-0" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Sign Up</button>
                    </form>
                    <p className="text-center mt-3">Already have an account?</p>
                    <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none w-100 rounded-0">Log In</Link>
            </div>
        </div>
    );
}

export default SignUp;