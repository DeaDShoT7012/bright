import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddDelivery() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [paint, setPaint] = useState([]);
  const [selectedOrderFrom, setSelectedOrderFrom] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedMaterialType, setSelectedMaterialType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [documentNo, setDocument] = useState("");
  const [quantity, setQuantity] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [paintName, setPaintName] = useState("");
  const [remark, setRemark] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
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

  const fetchPaint = () => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}inventory/get`).then((res) => {
        console.log(res.data.inventory);
        setPaint(res.data.inventory);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPaint();
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

  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  };

  const handleDocumentNo = (event) => {
    setDocument(event.target.value);
  };
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const handleVehicleNo = (event) => {
    setVehicleNo(event.target.value);
  };
  const handlePaint = (event) => {
    setPaintName(event.target.value);
  };
  const handleRemark = (event) => {
    setRemark(event.target.value);
  };
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        selectedOrderFrom,
        selectedProjectName,
        selectedMaterialType,
        startDate,
        documentNo,
        quantity,
        vehicleNo,
        paintName,
        remark,
        userName,
        password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}deliverpaint/add-delivery`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/delivery");
      }
    } catch (error) {
      console.log(error);
      alert("Incorrect UserName/Password");
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h3>Delivery - Painting Project</h3>
        <div
          className="p-4 mt-2 bg-dark"
          style={{ height: "600px", borderRadius: "10px" }}
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
                <Form.Select
                  onChange={handleProjectNameChange}
                  id="projectName"
                >
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
                <Form.Select
                  onChange={handleMaterialTypeChange}
                  id="materialType"
                >
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
                <Form.Label className="text-light">
                  Project Start Date
                </Form.Label>
                <Form.Select onChange={handleStartDate} id="startDate">
                  <option disabled selected required>
                    Select
                  </option>
                  {projectStartDates.map((projectStartDate) => (
                    <option
                      key={projectStartDate._id}
                      value={projectStartDate.createdAt}
                    >
                      {projectStartDate.createdAt.split("T")[0]}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="text-light">Document No</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleDocumentNo}
                  id="date"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="text-light">Quantity</Form.Label>
                <Form.Control type="text" onChange={handleQuantity} id="date" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="text-light">Vehicle No</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleVehicleNo}
                  id="date"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="text-light">Select Paint</Form.Label>
                <Form.Select onChange={handlePaint} id="shift">
                  <option disabled selected required>
                    Select
                  </option>
                  {paint.map((item) => (
                    <option key={item._id} value={item.paintName}>
                      {item.paintName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="text-light">Remark</Form.Label>
                <Form.Control type="text" onChange={handleRemark} id="date" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="text-light">UserName</Form.Label>
                <Form.Control type="text" onChange={handleUserName} id="date" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="text-light">Password</Form.Label>
                <Form.Control type="text" onChange={handlePassword} id="date" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState"></Form.Group>
            </Row>

            <div className="mt-4">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/delivery"}>
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

export default AddDelivery;
