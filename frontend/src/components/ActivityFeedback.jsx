import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Emotions, getEmotionText } from "./reactions";
import image_happy from "../assets/happy.png";
import image_sad from "../assets/sad.png";
import image_surprised from "../assets/surprised.png";
import image_confused from "../assets/confused.png";

function ActivityFeedback() {
  const { code } = useParams();
  const [activity, setActivity] = useState({});
  const [timeNow, setTimeNow] = useState(new Date());
  const [minutesTotalLeft, setMinutesTotalLeft] = useState();
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  useEffect(() => {
    setInterval(() => setTimeNow(new Date()), 1000);
  }, []);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/activities/code/${code}`
        );
        setActivity(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error loading activity:", err);
      }
    };
    fetchActivity();
  }, [code]);

  useEffect(() => {
    const calculateRemainingTime = (payload) => {
      const endTime = new Date(payload);
      const timeDifference = endTime - new Date();
      setMinutesTotalLeft(Math.floor(timeDifference / (1000 * 60)));
    };
    calculateRemainingTime(activity?.endTime);

    if (minutesTotalLeft) {
      minutesTotalLeft > 0 ? setIsActivityOpen(true) : setIsActivityOpen(false);
    }
  }, [activity]);

  const onFeedbackClick = (emotion) => {
    const payload = {
      activityId: activity.activityId,
      timestamp: new Date(),
      emotionId: emotion,
    };

    console.log(payload);

    const createFeedback = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/activities-feedback/create`,
          payload
        );

        console.log(response);
      } catch (err) {
        console.error("Error loading activity:", err);
      }
    };
    createFeedback();
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark">
      {isActivityOpen ? (
        <div className="bg-white p-5 rounded w-75 h-75">
          <a
            href="/"
            className="btn btn-outline-secondary"
            style={{ marginBottom: "20px" }}
          >
            Go Back
          </a>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <h2>{activity?.name}</h2>
            <p>
              <strong>
                Time now: {timeNow.toLocaleTimeString("RO-ro", "")}{" "}
              </strong>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "",
              alignItems: "baseline",
            }}
          >
            <p>
              <strong>Activity Time:</strong>{" "}
              {new Date(activity?.startTime).toLocaleString("RO-ro")}
            </p>
            <p style={{ margin: "0px 4px 0px 4px" }}> - </p>
            <p>{new Date(activity?.endTime).toLocaleString("RO-ro")}</p>
          </div>

          <p>
            <strong>Description:</strong> {activity?.description}
          </p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button
              onClick={() => {
                onFeedbackClick(Emotions.HAPPY);
              }}
              className="btn btn-secondary border w-25 rounded-0 text-decoration-none"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
                gap: "30px",
              }}
            >
              {getEmotionText(Emotions.HAPPY)}
              <img
                src={image_happy}
                style={{ width: "100px", height: "100px" }}
              />
            </button>
            <button
              onClick={() => {
                onFeedbackClick(Emotions.SAD);
              }}
              className="btn btn-secondary border w-25 rounded-0 text-decoration-none"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
                gap: "30px",
              }}
            >
              {getEmotionText(Emotions.SAD)}
              <img
                src={image_sad}
                style={{ width: "100px", height: "100px" }}
              />
            </button>
            <button
              onClick={() => {
                onFeedbackClick(Emotions.SURPRISED);
              }}
              className="btn btn-secondary border w-25 rounded-0 text-decoration-none"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
                gap: "30px",
              }}
            >
              {getEmotionText(Emotions.SURPRISED)}
              <img
                src={image_surprised}
                style={{ width: "100px", height: "100px" }}
              />
            </button>
            <button
              onClick={() => {
                onFeedbackClick(Emotions.CONFUSED);
              }}
              className="btn btn-secondary border w-25 rounded-0 text-decoration-none"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
                gap: "30px",
              }}
            >
              {getEmotionText(Emotions.CONFUSED)}
              <img
                src={image_confused}
                style={{ width: "100px", height: "100px" }}
              />
            </button>
          </div>
        </div>
      ) : (
        
        <div style={{color:"white"}}>
            <a
            href="/"
            className="btn btn-outline-secondary bg-light"
            style={{ marginBottom: "20px" }}>Back</a>
            <h2>This activity is no longer available!</h2>
            </div>
      )}
    </div>
  );
}

export default ActivityFeedback;
