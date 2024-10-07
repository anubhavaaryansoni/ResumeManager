import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./allInterns.css";

const Allinterns = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/intern", { withCredentials: true })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <React.Fragment>
        <Navbar />
        <div className="interns-container">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="loading-skeleton" />
          ))}
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className="interns-container">
        {data.map((internship) => (
          <article key={internship._id} className="intern-card">
            <header className="intern-card-header">
              <Link 
                to={`/intern/${internship._id}`} 
                className="company-link"
              >
                {internship.companyID.companyName}
              </Link>
            </header>
            <div className="intern-card-content">
              <p className="description">{internship.description}</p>
            </div>
          </article>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Allinterns;