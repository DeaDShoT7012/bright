import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddWork() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedOrderFrom, setSelectedOrderFrom] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedMaterialType, setSelectedMaterialType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [pieces, setPieces] = useState("");
  const [projectNames, setProjectNames] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
  const [projectStartDates, setProjectStartDates] = useState([]);


  const fetchData = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  console.log('data',data);


  useEffect(() => {
    fetchData();
  }, []);

  const handleOrderFromChange = (event) => {
    const selectedOrderFromValue = event.target.value;
    setSelectedOrderFrom(selectedOrderFromValue);
    const filteredProjectNames = data
      .filter((item) => item.orderFrom === selectedOrderFromValue)
      .map((item) => item.projectName);

    setProjectNames(filteredProjectNames);
    setSelectedProjectName("");
    setSelectedMaterialType("");
  };

  const handleProjectNameChange = (event) => {
    const selectedProjectNameValue = event.target.value;
    setSelectedProjectName(selectedProjectNameValue);

    const filteredMaterialTypes = data
      .filter(
        (item) =>
          item.orderFrom === selectedOrderFrom &&
          item.projectName === selectedProjectNameValue
      )
      .map((item) => item.materialType.materialType);

    setMaterialTypes(filteredMaterialTypes);
    setSelectedMaterialType("");
  };

  const handleMaterialTypeChange = (event) => {
    const selectedMaterialTypeValue = event.target.value;
    setSelectedMaterialType(selectedMaterialTypeValue);

    const filteredProjectStartDates = data
      .filter(
        (item) =>
          item.orderFrom === selectedOrderFrom &&
          item.projectName === selectedProjectName &&
          item.materialType.materialType === selectedMaterialTypeValue
      )
      .map((item) => item);

    setProjectStartDates(filteredProjectStartDates);
  };

  const handleStartDate=(event)=>{
    setStartDate(event.target.value);
  }

  const handleDate=(event)=>{
    setDate(event.target.value);
  }
  const handleShift=(event)=>{
    setShift(event.target.value);
  }
  const handlePieces=(event)=>{
    setPieces(event.target.value);
  }


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        selectedOrderFrom,
        selectedProjectName,
        selectedMaterialType,
        startDate,
        date,
        shift,
        pieces

      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}assignwork/add-work`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/assign-work");
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
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="text-light">Order From</Form.Label>
                <Form.Select onChange={handleOrderFromChange} id="orderFrom">
                  <option disabled selected required>
                    Select
                  </option>
                  {[...new Set(data.map((item) => item.orderFrom))].map(
                    (orderFrom) => (
                      <option key={orderFrom} value={orderFrom}>
                        {orderFrom}
                      </option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
  
              <Form.Group as={Col}>
                <Form.Label className="text-light">Project Name</Form.Label>
                <Form.Select onChange={handleProjectNameChange} id="projectName">
                  <option disabled selected required>
                    Select
                  </option>
                  {[...new Set(projectNames)].map((projectName) => (
                    <option key={projectName} value={projectName}>
                      {projectName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className="text-light">Material Type</Form.Label>
                <Form.Select onChange={handleMaterialTypeChange} id="materialType">
                  <option disabled selected required>
                    Select
                  </option>
                  {[...new Set(materialTypes)].map((materialType) => (
                    <option key={materialType} value={materialType}>
                      {materialType}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
  
              <Form.Group as={Col}>
                <Form.Label className="text-light">Project Start Date</Form.Label>
                <Form.Select
                onChange={handleStartDate}
                id="startDate"
                >
                  <option disabled selected required>
                    Select
                  </option>
                  {projectStartDates.map((projectStartDate) => (
                    <option key={projectStartDate._id} value={projectStartDate._id}>
                      {projectStartDate.createdAt.split("T")[0]}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail"> 
                <Form.Label className="text-light">Date</Form.Label>
                <Form.Control type="date" 
                onChange={handleDate}
                id="date"
                />
              </Form.Group>
  
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="text-light">Shift</Form.Label>
                <Form.Select
                onChange={handleShift}
                id="shift"
                >
                <option disabled selected required>
                    Select
                  </option>
                  <option value={'Morning'}>Morning</option>
                  <option value={'Noon'}>Noon</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className="text-light">No:of Pieces</Form.Label>
                <Form.Control type="text"
                onChange={handlePieces}
                id="pieces"
                />
              </Form.Group>
  
              <Form.Group as={Col} controlId="formGridState"></Form.Group>
            </Row>
            <div className="mt-4">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/assign-work"}>
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

export default AddWork;
