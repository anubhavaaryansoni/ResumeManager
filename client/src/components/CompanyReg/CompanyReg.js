import React, { useState } from "react";
import axios from "axios";
import 'bulma/css/bulma.min.css';
import './companyRegistration.css';
import Navbar from "../Navbar/index";

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    field: "",
    location: "",
    scale: "",
    description: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/company", 
        formData,
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        alert("Company registered successfully!");
        window.location.href = "/";
        setFormData({
          companyName: "",
          field: "",
          location: "",
          scale: "",
          description: ""
        });
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while registering the company");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="cont">
      <h1 className="title is-2 has-text-centered mb-5">Register New Company</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="Form.Field">
          <label className="label">Company Name</label>
          <div className="Form.Control">
            <input
              className="input"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>
        </div>

        <div className="Form.Field">
          <label className="label">Field/Industry</label>
          <div className="Form.Control">
            <input
              className="input"
              type="text"
              name="field"
              value={formData.field}
              onChange={handleChange}
              placeholder="e.g. Technology, Healthcare, Finance"
              required
            />
          </div>
        </div>

        <div className="Form.Field">
          <label className="label">Location</label>
          <div className="Form.Control">
            <input
              className="input"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Company location"
              required
            />
          </div>
        </div>

        <div className="Form.Field">
          <label className="label">Company Scale</label>
          <div className="Form.Control">
            <div className="select is-fullwidth">
              <select
                name="scale"
                value={formData.scale}
                onChange={handleChange}
                required
              >
                <option value="">Select company scale</option>
                <option value="startup">Startup</option>
                <option value="small">Small Business</option>
                <option value="medium">Medium Enterprise</option>
                <option value="large">Large Corporation</option>
              </select>
            </div>
          </div>
        </div>

        <div className="Form.Field">
          <label className="label">Description</label>
          <div className="Form.Control">
            <textarea
              className="textarea input"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter company description"
              rows="4"
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          className={`button is-fullwidth ${isLoading ? 'is-loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register Company"}
        </button>
      </form>
    </div>
    </>
  );
};

export default CompanyRegistration;