import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddDeliveryBright() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [documentNo, setDocument] = useState("");
  const [quantity, setQuantity] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [remark, setRemark] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [subProjects, setSubProjects] = useState([]);
  const [selectedSubProject, setSelectedSubProject] = useState("");
  const [topologies, setTopologies] = useState([]);
  const [topology, setTopology] = useState("");

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}project/get-project`)
      .then((res) => {
        console.log("res", res.data.project);
        setData(res.data.project);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProjectChange = (e) => {
    const selectedProjectName = e.target.value;
    setSelectedProject(selectedProjectName);
    const selectedProjectData = data.find(
      (item) => item.projectName === selectedProjectName
    );
    if (selectedProjectData) {
      setSubProjects(selectedProjectData.subProjectList || []);
    } else {
      setSubProjects([]);
    }
    setSelectedSubProject("");
    setTopologies([]);
  };

  const handleSubProjectChange = (e) => {
    const selectedSubProjectName = e.target.value;
    setSelectedSubProject(selectedSubProjectName);
    const selectedSubProjectData = subProjects.find(
      (subProject) => subProject.subProject === selectedSubProjectName
    );
    if (selectedSubProjectData) {
      setTopologies(selectedSubProjectData.topologyList || []);
    } else {
      setTopologies([]);
    }
  };

  const handleTopology = (event) => {
    setTopology(event.target.value);
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
        selectedProject,
        selectedSubProject,
        topology,
        documentNo,
        quantity,
        vehicleNo,
        remark,
        userName,
        password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}deliverpaint/add-delivery-bright`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/delivery-bright");
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
              <Form.Group as={Col}>
                <Form.Label className="text-light">Project Name</Form.Label>
                <Form.Select onChange={handleProjectChange}>
                  <option disabled selected required>
                    Select
                  </option>
                  {data.map((item) => (
                    <option key={item._id} value={item.projectName}>
                      {item.projectName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="text-light">Sub Project</Form.Label>
                <Form.Select onChange={handleSubProjectChange}>
                  <option disabled selected required>
                    Select
                  </option>
                  {subProjects.map((subProject) => (
                    <option key={subProject.id} value={subProject.subProject}>
                      {subProject.subProject}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="text-light">Topology</Form.Label>
                <Form.Select onChange={handleTopology}>
                  <option disabled selected required>
                    Select
                  </option>
                  {topologies.map((topology) => (
                    <option key={topology._id} value={topology.topologyName}>
                      {topology.topologyName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="text-light">Document No</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleDocumentNo}
                  id="date"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="text-light">Quantity</Form.Label>
                <Form.Control type="text" onChange={handleQuantity} id="date" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="text-light">Vehicle No</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleVehicleNo}
                  id="date"
                />
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
              <Link to={"/delivery-bright"}>
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

export default AddDeliveryBright;
