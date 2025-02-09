import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function Home(){
    const [professorName, setProfessorName]=useState("");
    const [activities, setActivities]=useState([]);
    const navigate=useNavigate();
    const [newActivity, setNewActivity]=useState({
        professorId: "",
        name: "",
        description: "",
        startTime: "",
        endTime: "",
        code: ""
    });
    const [showModal, setShowModal]=useState(false);

    useEffect(()=>{
        //getting the professor's name from local storage
        const name=localStorage.getItem("professorName");
        if(name){
        setProfessorName(name);
        }
        //fetching activities from database
        fetchActivities();
    }, []);

    const fetchActivities=async()=>{
        const professorId = localStorage.getItem("professorId");
        if (!professorId) return; 
        try{
            const response=await axios.get("http://localhost:5000/api/activities", {
                params:{professorId: professorId}
            });
            setActivities(response.data);
        }catch(err){
            console.error("Error fetching activities from database:", err);
        }
    }

    const handleInputChange=(e)=>{
        const {name, value}=e.target;
        setNewActivity({...newActivity, [name]:value});
    };

    const handleGenerateCode=()=>{
        const randomCode=Math.random().toString(36).substring(2, 8).toUpperCase();
        setNewActivity({...newActivity, code: randomCode});
    };

    const handleCreateActivity=async()=>{
        const professorId=localStorage.getItem("professorId");
        if (!professorId) {
            console.error("No professorId found in localStorage");
            return;
        }
        try{
            const activityData={
                professorId,
                name: newActivity.name,
                description: newActivity.description,
                startTime: newActivity.startTime,
                endTime: newActivity.endTime,
                code: newActivity.code,
            };

            await axios.post("http://localhost:5000/api/activities", activityData);
            setNewActivity({
                name: "",
                description: "",
                startTime: "",
                endTime: "",
                code: "",
            });
            setShowModal(false);
            //refresh the list of activities
            fetchActivities();
        }catch(err){
            console.error("Error creating activity:", err);
        }
    };

    const handleLogout=()=>{
        localStorage.clear();
        navigate('/login');
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="bg-white p-5 rounded w-75">
            <button type="button" className="btn btn-light" onClick={handleLogout}>Log Out</button>

            <h2 className="text-center mb-4">Welcome, {professorName}!</h2>
            <div className="mb-4">
                <h5>Your Activities:</h5>
                {activities.length>0 ? (
                    <ul className='list-group'>
                        {activities.map((activity, index)=>(
                            <li key={index} className='list-group-item'>
                                <strong>{activity.name}</strong> -{" "}
                                {new Date(activity.startTime).toLocaleDateString()}
                                <Link to={`/activities/${activity.activityId}`} className="btn btn-info ms-3">View Details</Link>
                            </li>
                        ))}
                    </ul>
                ):(
                    <p className='text-muted'>No activities added yet.</p>
                )}
                <button type="button" className="btn btn-success w-100 rounded-0" onClick={()=>setShowModal(true)}>+ Add Activity</button>
            </div>
            </div>

            {showModal && (
                <div className='modal d-block'  tabIndex='-1'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Create Activity</h5>
                            </div>
                            <div className='modal-body'>
                                <form>
                                    <div className='mb-3'>
                                        <label className='form-label'>Activity Name</label>
                                        <input type='text' className='form-control' name='name' value={newActivity.name} onChange={handleInputChange}/>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Description</label>
                                        <textarea type='text' className='form-control' name='description' value={newActivity.description} onChange={handleInputChange}></textarea>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Start Time</label>
                                        <input type='datetime-local' className='form-control' name='startTime' value={newActivity.startTime} onChange={handleInputChange}/>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>End Time</label>
                                        <input type='datetime-local' className='form-control' name='endTime' value={newActivity.endTime} onChange={handleInputChange}/>
                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <button type='button' className="btn btn-primary me-3" onClick={handleGenerateCode}>Generate Code</button>
                                        <span>{newActivity.code}</span>
                                    </div>
                                </form>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className="btn btn-secondary" onClick={()=>setShowModal(false)}>Cancel</button>
                                <button type='button' className="btn btn-success" onClick={handleCreateActivity}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )
}

export default Home;