import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AssignMaterial() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [material,setMaterial] = useState([])
  const [employee,setEmployee] = useState([])
  const [selectedMaterialType, setSelectedMaterialType] = useState("");
  const [materialUsed, setMaterialUsed] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [subProjects, setSubProjects] = useState([]);
  const [selectedSubProject, setSelectedSubProject] = useState("");
  const [topologies, setTopologies] = useState([]);
  const [topology,setTopology] = useState('')
  const [materialSelected,setMaterialSelected] = useState('')
  const [qtyUsed,setQtyUsed] = useState('')
  const [pieces,setPieces] = useState('')
  const [stock,setStock] = useState('')
  const [shift,setShift] = useState('')
  const [employeeName,setEmployeeName] = useState('')
  const [password,setPassword] = useState('')
  const [remark,setRemark] = useState('')
  const [date,setDate] = useState('')



  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}project/get-project`)
      .then((res) => {
        console.log('res',res.data.project);
        setData(res.data.project)
      });
  };

  const getMaterial = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}inventory/get-material`)
      .then((res) => {
        console.log('material',res.data.material);
        setMaterial(res.data.material);
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
    getMaterial()
    getEmployee()
  }, []);

  const handleProjectChange = (e) => {
    const selectedProjectName = e.target.value;
    setSelectedProject(selectedProjectName);
    const selectedProjectData = data.find((item) => item.projectName === selectedProjectName);
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
    const selectedSubProjectData = subProjects.find((subProject) => subProject.subProject === selectedSubProjectName);
    if (selectedSubProjectData) {
      setTopologies(selectedSubProjectData.topologyList || []);
    } else {
      setTopologies([]);
    }
  };

  const handleMaterialTypeChange = (event) => {
    const selecteMaterialTypeValue = event.target.value;
    setSelectedMaterialType(selecteMaterialTypeValue);
    const filteredMaterialtNames = material
      .filter((item) => item.materialType === selecteMaterialTypeValue)
      .map((item) => item.materialName);

      setMaterialUsed(filteredMaterialtNames);
  };

  const handleTopology=(event)=>{
    setTopology(event.target.value);
  }
  const handleMaterialUsed=(event)=>{
    setMaterialSelected(event.target.value);
  }
  const handleQtyUsed=(event)=>{
    setQtyUsed(event.target.value);
  }
  const handlePiece=(event)=>{
    setPieces(event.target.value);
  }
  const handleStock=(event)=>{
    setStock(event.target.value);
  }
  const handleShift=(event)=>{
    setShift(event.target.value);
  }
  const handleEmployee=(event)=>{
    setEmployeeName(event.target.value);
  }
  const handlePassword=(event)=>{
    setPassword(event.target.value);
  }
  const handleRemark=(event)=>{
    setRemark(event.target.value);
  }
  const handleDate=(event)=>{
    setDate(event.target.value);
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        selectedProject,
        selectedSubProject,
        selectedMaterialType,
        topology,
        materialSelected,
        qtyUsed,
        pieces,
        stock,
        shift,
        employeeName,
        password,
        remark,
        date
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}projectmaterialusage/add-material`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/material-usage");
      }
    } catch (error) {
      console.log(error);
      alert('Password not Matched')
    }
  };


  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h3>Assign Material Usage</h3>
        <div
          className="p-5 mt-4 bg-dark"
          style={{ height: "800px", borderRadius: "10px" }}
        >
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label className="text-light">Project Name</Form.Label>
                <Form.Select onChange={handleProjectChange}>
                <option disabled selected required >
                 Select
                </option>
                {
                  data.map((item)=>(
                    <option
                    key={item._id}
                    value={item.projectName}
                    >
                      {item.projectName}
                    </option>
                  ))
                }
                </Form.Select>
              </Form.Group>
  
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="text-light">Sub Project</Form.Label>
                <Form.Select onChange={handleSubProjectChange}>
                <option disabled selected required >
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
                <Form.Select 
                onChange={handleTopology}
                >
                <option disabled selected required >
                 Select
                </option> 
                  {topologies.map((topology) => (
                    <option key={topology._id} value={topology.topologyName}>
                      {topology.topologyName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
  
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="text-light">Material Type</Form.Label>
                <Form.Select onChange={handleMaterialTypeChange}>
                <option disabled selected required >
                 Select
                </option> 
                    {[...new Set(material.map((item) => item.materialType))].map(
                      (materialType) => (
                        <option key={materialType} value={materialType}>
                          {materialType}
                        </option>
                      )
                    )}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="text-light">Material Used</Form.Label>
                <Form.Select 
                onChange={handleMaterialUsed}
                >
                <option disabled selected required >
                 Select
                </option>
                  {materialUsed.map((item)=>(
                    <option
                    key={item}
                    value={item}
                    >
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
  
              <Form.Group as={Col} >
                <Form.Label className="text-light">
                  Quantity Used(Pieces)
                </Form.Label>
                <Form.Control type="text" onChange={handleQtyUsed} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label className="text-light">
                  Enter Pcs(in Meter)
                </Form.Label>
                <Form.Control type="text" onChange={handlePiece}/>
              </Form.Group>
  
              <Form.Group as={Col} >
                <Form.Label className="text-light">Length in Stock</Form.Label>
                <Form.Control type="text" onChange={handleStock}/>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className="text-light">Shift When Taken</Form.Label>
                <Form.Select onChange={handleShift}>
                <option disabled selected required >
                 Select
                </option>
                  <option value={'Shift1'}>Shift1</option>
                  <option value={'Shift2'}>Shift2</option>
                </Form.Select>
              </Form.Group>
  
              <Form.Group as={Col}>
                <Form.Label className="text-light">Employee Name</Form.Label>
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
                <Form.Label className="text-light">Password</Form.Label>
                <Form.Control type="password" onChange={handlePassword} />
              </Form.Group>
  
              <Form.Group as={Col} >
                <Form.Label className="text-light">Remark</Form.Label>
                <Form.Control type="text" onChange={handleRemark}/>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label className="text-light">Date</Form.Label>
                <Form.Control type="date" onChange={handleDate}/>
              </Form.Group>
  
              <Form.Group as={Col} ></Form.Group>
            </Row>
            <div className="mt-4">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/material-usage"}>
                <Button
                  className="ms-4"
                  variant="warning"
                  size="lg"
                >
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

export default AssignMaterial;
