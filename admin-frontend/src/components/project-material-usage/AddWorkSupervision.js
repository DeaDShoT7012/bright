import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddWorkSupervision() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [remark, setRemark] = useState("");
    const [password, setPassword] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
    const [subProjects, setSubProjects] = useState([]);
    const [selectedSubProject, setSelectedSubProject] = useState("");
    const [topologies, setTopologies] = useState([]);
    const [topology, setTopology] = useState("");
    const [employee,setEmployee] = useState([])
    const [employeeName,setEmployeeName] = useState('');
    const [processing,setProcessing] = useState('');


    const fetchData = () => {
        axios
          .get(`${process.env.REACT_APP_API_URL}project/get-project`)
          .then((res) => {
            console.log("res", res.data.project);
            setData(res.data.project);
          });
      };

      const getEmployee = () => {
        axios
          .get(`${process.env.REACT_APP_API_URL}employee/get-employee`)
          .then((res) => {
            console.log('employee',res.data.employee);
            setEmployee(res.data.employee);
          });
      };
      useEffect(() => {
        fetchData();
        getEmployee();
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
      const handleEmployee=(event)=>{
        setEmployeeName(event.target.value);
      }

      const handlePassword=(event)=>{
        setPassword(event.target.value);
      }
      const handleRemark=(event)=>{
        setRemark(event.target.value);
      }
      const handleQuantity=(event)=>{
        setQuantity(event.target.value);
      }
      const handleProcess=(event)=>{
        setProcessing(event.target.value);
      }
    
    
      const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          const data = {
            selectedProject,
            selectedSubProject,
            topology,
            employeeName,
            password,
            remark,
            quantity,
            processing
          };
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}projectmaterialusage/add-work-supervision`,
            data
          );
          console.log("res", response);
          if (response) {
            navigate("/work-supervision");
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
        <h3>Add Work Supervision</h3>
        <div
          className="p-4 mt-2 bg-dark"
          style={{ height: "500px", borderRadius: "10px" }}
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
                <Form.Label className="text-light">Name of Supervisor</Form.Label>
                <Form.Select onChange={handleEmployee}>
                <option disabled selected required >
                 Select
                </option>
                  {employee.map((item)=>(
                    <option
                    key={item._id}
                    value={item.name}
                    >
                    {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} >
                <Form.Label className="text-light">Supervisor Password</Form.Label>
                <Form.Control type="password" onChange={handlePassword}  />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label className="text-light">Quantity completed today</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleQuantity}
               />
              </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col}>
                <Form.Label className="text-light">Process</Form.Label>
                <Form.Select onChange={handleProcess}>
                <option disabled selected required >
                 Select
                </option>
                <option value={'Cutting'}>Cutting</option>
                <option value={'Joining'}>Joining</option>
                <option value={'Glass Assembly'}>Glass Assembly</option>
                <option value={'Installation'}>Installation</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label className="text-light">Remarks</Form.Label>
                <Form.Control type="text" onChange={handleRemark}  />
              </Form.Group>
            </Row>
            <div className="mt-4">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/work-supervision"}>
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
  )
}

export default AddWorkSupervision