import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getEmotionText } from "./reactions";
import image_happy from "../assets/happy.png";
import image_sad from "../assets/sad.png";
import image_surprised from "../assets/surprised.png";
import image_confused from "../assets/confused.png";

function ActivityDetails() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState({});
  const [activityFeedbackList, setActivityFeedbackList] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/activities/${activityId}`
      );
      setActivity(response.data);
      console.log(response);
    } catch (err) {
      console.error("Error fetching activity details:", err);
    }
  };

  const fetchActivityFeedback = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/activities-feedback/get`,
        { params: { activityId: activityId } }
      );

      console.log("activity feedback list: ", response.data);
      setActivityFeedbackList(response.data);
    } catch (error) {
      console.error("Error fetching activity feedback list :", error);
    }
  };
  useEffect(() => {
    fetchDetails();
    fetchActivityFeedback();
  }, [activityId]); //request refreshes when activityId chnges

  const returnImage = (emotionId) => {
    switch (emotionId) {
      case 1:
        return image_happy;
      case 2:
        return image_sad;
      case 3:
        return image_surprised;
      case 4:
        return image_confused;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="bg-white p-5 rounded w-75">
        <a href="/home" className="btn btn-outline-secondary">
          Go Back
        </a>
        {activity ? (
          <>
            <h2 className="text-center mb-4">{activity.name}</h2>
            <p>
              <strong>Description:</strong> {activity.description}
            </p>
            <p>
              <strong>Start Time:</strong>{" "}
              {new Date(activity.startTime).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong>{" "}
              {new Date(activity.endTime).toLocaleString()}
            </p>
            <p>
              <strong>Code:</strong> {activity.code}
            </p>

            <div>
              {activityFeedbackList?.length == 0 ? (
                <div> No activity feedback history ...</div>
              ) : (
                <div>
                  <h5>Activity Feedback History:</h5>
                  <div style={{ overflowY: "scroll", height: "200px" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black"}}>
                      <thead>
                        <tr>
                          <th style={{width: "33.3%", border: "1px solid black", padding: "8px",textAlign: "left"}}>
                            Time
                          </th>
                          <th style={{width: "33.3%", border: "1px solid black", padding: "8px",textAlign: "left"}}>
                            Emotion Name
                          </th>
                          <th style={{width: "33.3%", border: "1px solid black", padding: "8px",textAlign: "left"}}>
                            Emotion Image
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {activityFeedbackList.map((activity) => (
                          <tr key={activity?._id}>
                            <td style={{width: "33.3%", border: "1px solid black", padding: "8px",textAlign: "left"}}> 
                              {new Date(activity?.timestamp).toLocaleTimeString("RO-ro")}
                            </td>
                            <td style={{width: "33.3%", border: "1px solid black", padding: "8px",textAlign: "left"}}> 
                              {getEmotionText(activity?.emotionId)}
                            </td>
                            <td style={{width: "33.3%", border: "1px solid black", padding: "8px",textAlign: "center"}}> 
                              <img
                                src={returnImage(activity?.emotionId)}
                                alt={getEmotionText(activity?.emotionId)}
                                style={{ width: "40px", height: "40px" }}/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Loading activity details...</p>
        )}
      </div>
    </div>
  );
}

export default ActivityDetails;
