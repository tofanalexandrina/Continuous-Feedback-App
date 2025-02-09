import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LogIn(){
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const navigate=useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/api/auth/login', {email, password})
        .then(result=>{
            console.log(result);
            if(result.data.message ==="Success"){
                localStorage.setItem("professorId", result.data.professorId);
                localStorage.setItem("professorName", result.data.name);
                navigate('/home');
            }
        })
        .catch(err=>console.log(err))
    }
    return(
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="bg-white p-3 rounded w-25">
                <h2 className="text-center mb-4">Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" placeholder="Email" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="password" placeholder="Password" name="password" className="form-control rounded-0" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Log In</button>
                    </form>
                    <p className="text-center mt-3">Don't have an account?</p>
                    <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none w-100 rounded-0">Sign Up</Link>
                    <div className="d-flex justify-content-between mt-4">
                    <p className="text-center mt-3">Back to the main page?</p>
                    <a href="/" className="btn btn-outline-secondary">Back</a>
            </div>
            </div>
        </div>
    )
}

export default LogIn;