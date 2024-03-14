import React, { useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddExpense() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedOrderFrom, setSelectedOrderFrom] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  // const [selectedMaterialType, setSelectedMaterialType] = useState("");
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [expense, setExpense] = useState("");
  const [projectNames, setProjectNames] = useState([]);

 
  const handleOrderFromChange = async (event) => {
    const selectedOrderFromValue = event.target.value;
    setSelectedOrderFrom(selectedOrderFromValue);

    try {
      if (selectedOrderFromValue === "Painting Projects") {
        const paintProjectsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}paintproject/get-paint-project`
        );

        const paintProjectsData = paintProjectsResponse.data.project;

        const updatedPaintProjectsData = await Promise.all(
          paintProjectsData.map(async (item) => {
            const materialTypeResponse = await axios.get(
              `${process.env.REACT_APP_API_URL}inventory/edit-paint-material/${item.materialType}`
            );
            const materialTypeData = materialTypeResponse.data.inventory;

            return {
              ...item,
              materialType: materialTypeData,
            };
          })
        );

        setData(updatedPaintProjectsData);
        const filteredProjectNames = updatedPaintProjectsData.map(
          (item) => item
        );
        setProjectNames(filteredProjectNames);
      } else {
        const apiUrl =
          selectedOrderFromValue === "Bright Projects"
            ? `${process.env.REACT_APP_API_URL}project/get-project`
            : `${process.env.REACT_APP_API_URL}another-project-api`;

        const response = await axios.get(apiUrl);
        setData(response.data.project);

        const filteredProjectNames = response.data.project.map(
          (item) => item
        );
        setProjectNames(filteredProjectNames);
        // setSelectedProjectName("");
        // setSelectedMaterialType("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProjectNameChange = (event) => {
    const selectedProjectNameValue = event.target.value;
    setSelectedProjectName(selectedProjectNameValue);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const handlePurpose = (event) => {
    setPurpose(event.target.value);
  };
  const handleAmount = (event) => {
    setExpense(event.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        selectedProjectName,
        expense,
        purpose,
        date
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}expense/add-expense`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/expense");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h3>ASSIGN WORK</h3>
        <div
          className="p-5 mt-4 bg-dark"
          style={{ height: "500px", borderRadius: "10px" }}
        >
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className="text-light">Select Project</Form.Label>
                <Form.Select onChange={handleOrderFromChange}>
                  <option disabled selected required>
                    Select
                  </option>
                  <option value={"Bright Projects"}>Bright Projects</option>
                  <option value={"Painting Projects"}>Painting Projects</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className="text-light">
                  {selectedOrderFrom === "Bright Projects"
                    ? "Bright Projects"
                    : selectedOrderFrom === "Painting Projects"
                    ? "Painting Projects"
                    : "Project Name"}
                </Form.Label>{" "}
                <Form.Select
                  onChange={handleProjectNameChange}
                >
                  <option required>Select</option>
                  {projectNames.map((project) => {
                    // console.log("p", project);
                    return (
                      <option key={project._id} value={project._id}>
                        {selectedOrderFrom === "Painting Projects"
                          ? `${project.projectName}-${project.orderFrom}-${
                              project.materialType
                                ? project.materialType.materialType
                                : "N/A"
                            }`
                          : `${project.projectName}`}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className="text-light">Purpose</Form.Label>
                <Form.Control type="text" onChange={handlePurpose}  />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className="text-light">Amount</Form.Label>
                <Form.Control type="text" onChange={handleAmount}  />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className="text-light">Date</Form.Label>
                <Form.Control type="date" onChange={handleDate}  />
              </Form.Group>
              <Form.Group as={Col}></Form.Group>
            </Row>
            <div className="mt-4">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/expense"}>
                <Button className="ms-4" variant="warning" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddExpense;
