import React from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./internPage.css";

const InternPage = () => {
  const { internId } = useParams();
  const [Data, setData] = useState({ companyID: {} });
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/intern/${internId}`, {
        withCredentials: true,
      })
      .then(function (res) {
        console.log(res.data);
        setData(res.data);
      })
      .catch(function (e) {
        console.log(e);
      });

    axios
      .get("http://localhost:4000/api/user", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [internId]);

  const obj = { msg: "application" };

  const applyForIntern = () => {
    axios
      .post(`http://localhost:4000/api/intern/${internId}`, obj, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        alert("applied for intern!");
      })
      .catch((e) => {
        alert("An error occured in the application");
        console.log(e);
      });
  };

  const getAllInterns = () => {
    axios
      .get(`http://localhost:4000/api/intern/applications/${internId}`, {
        responseType: "blob",
        withCredentials: true,
      })
      .then((res) => {
        const zipBlob = new Blob([res.data], { type: "application/zip" });
        const zipUrl = URL.createObjectURL(zipBlob);
        window.location.href = zipUrl;
      })
      .catch((e) => {
        console.log(e);
        alert("An error occured while fetching");
      });
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="intern-card">
        <div className="card-header">
          <h2 className="card-header-title">{Data.companyID.companyName}</h2>
        </div>
        
        <div className="card-content">
          <div className="info-card">
            <h3 className="section-title">Description</h3>
            <p className="info-text">{Data.description}</p>
          </div>
          
          <div className="info-card">
            <div className="info-row">
              <span className="info-label">Start Date:</span>
              <span className="info-value">{Data.start_date}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Stipend:</span>
              <span className="info-value">Rs {Data.stipend}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Compensation:</span>
              <span className="info-value">{Data.compensation || "None"}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Application Deadline:</span>
              <span className="info-value">{Data.application_deadline}</span>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-section">
              <h3 className="section-title">Supervision (If Needed)</h3>
              <p className="info-text">{Data.supervision_mentorship}</p>
            </div>
            
            <div className="info-section">
              <h3 className="section-title">Eligibility for FE</h3>
              <p className="info-text">{Data.eligiblity_for_FE}</p>
            </div>
          </div>
        </div>
        
        <div className="card-footer">
          {!(user.designation === "comp_representative") && (
            <button className="button" onClick={applyForIntern}>
              Apply
            </button>
          )}
          
          {user.designation === "comp_representative" && (
            <button className="button" onClick={getAllInterns}>
              Get All Applications
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default InternPage;
