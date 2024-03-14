import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddAllocation() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [subProjects, setSubProjects] = useState([]);
  const [selectedSubProject, setSelectedSubProject] = useState("");
  const [topologies, setTopologies] = useState([]);
  const [topology, setTopology] = useState("");
  const [quantity, setQuantity] = useState("");
  const [allocation, setAllocation] = useState("");
  const [completion, setCompletion] = useState("");

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

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleAllocation = (event) => {
    setAllocation(event.target.value);
  };

  const handleCompletion = (event) => {
    setCompletion(event.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        selectedProject,
        selectedSubProject,
        topology,
        quantity,
        allocation,
        completion,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}allocation/add-allocation`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/allocation");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h3>Assign Material Usage</h3>
        <div
          className="p-5 mt-4 bg-dark"
          style={{ height: "400px", borderRadius: "10px" }}
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

              <Form.Group as={Col}>
                <Form.Label className="text-light">Quantity</Form.Label>
                <Form.Control type="text" onChange={handleQuantity} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className="text-light">Allocation</Form.Label>
                <Form.Control type="text" onChange={handleAllocation} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className="text-light">Completion</Form.Label>
                <Form.Control type="text" onChange={handleCompletion} />
              </Form.Group>
            </Row>

            <div className="mt-4">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/allocation"}>
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

export default AddAllocation;
