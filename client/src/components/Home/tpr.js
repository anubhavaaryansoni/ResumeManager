import React from "react";
import axios from "axios";
import "./tprView.css";
import { Card, Button } from "react-bulma-components";

const Tprview = () => {
  const recieveResumes = async () => {
    try {
      const batchData = await axios.get(`http://localhost:4000/api/batch`, {
        withCredentials: true,
      });
      console.log(batchData);
      const batchId = batchData.data.batchId;
      console.log(batchId);
      const response = await axios.get(
        `http://localhost:4000/api/batch/resumes/${batchId}`,
        { responseType: "blob", withCredentials: true }
      );
      const zipBlob = new Blob([response.data], { type: "application/zip" });
      const zipUrl = URL.createObjectURL(zipBlob);
      window.location.href = zipUrl;
    } catch (error) {
      console.error(error);
    }
  };

  const Updf = (e) => {
    window.location.href = "/upload";
  };

  const Udata = (e) => {
    window.location.href = "/editinfo";
  };

  return (
    <React.Fragment>
      <div className="container">
        <Card className="card-container mt-5 mb-5 mr-5 ml-5 has-text-centered">
          <Card.Header className="card-header">
            <Card.Header.Title>Want to upload your resume?</Card.Header.Title>
          </Card.Header>
          <Card.Content>
            <Button onClick={Updf} className="Button">
              Go to Upload Page
            </Button>
          </Card.Content>
        </Card>

        <Card className="card-container mr-5 ml-5 mb-5 has-text-centered">
          <Card.Header className="card-header">
            <Card.Header.Title>
              Or if you want to update your info?
            </Card.Header.Title>
          </Card.Header>
          <Card.Content>
            <Button onClick={Udata} className="Button">
              Go to Update Page
            </Button>
          </Card.Content>
        </Card>

        <Card className="card-container mr-5 ml-5 has-text-centered">
          <Card.Header className="card-header">
            <Card.Header.Title>
              Collect Resumes of your Batch?
            </Card.Header.Title>
          </Card.Header>
          <Card.Content>
            <Button onClick={recieveResumes} className="Button">
              Collect
            </Button>
          </Card.Content>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Tprview;

// <p>Collect your resume</p>
// <button onClick={ownPdf}>collect</button>
