import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GeneralMain(){
    const [activityCode, setActivityCode]=useState("");
    const [errorMessage, setErrorMessage]=useState("");
    const navigate=useNavigate();

    const handleCodeChange=(e)=>{
        setActivityCode(e.target.value);
    };

    const handleCodeSubmit=async(e)=>{
        e.preventDefault();
        try{
            //checking if the activity code exists in the db
            const response=await axios.get( `http://localhost:5000/api/activities/code/${activityCode}`);
            if(response.data){
                navigate(`/activity/${activityCode}`);
            }else{
                setErrorMessage("Activity code not valid.");
            }
        }catch(err){
            setErrorMessage("Activity code not valid.");
        }
    }

    return(
        <div className="container ">
            <div className="d-flex justify-content-between mt-5 mb-5">
                <h2>Continuous Feedback App</h2>
                <a href="/login" className="btn btn-primary">Log In</a>
            </div>
            <form onSubmit={handleCodeSubmit}>
                <div className="mb-3">
                    <label htmlFor="activityCode" className="form-label">Activity Code</label>
                    <input type="text" className="form-control" id="activityCode" value={activityCode} onChange={handleCodeChange}/>
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button type="submit" className="btn btn-success">Go!</button>
            </form>
        </div>
    );
}

export default GeneralMain;