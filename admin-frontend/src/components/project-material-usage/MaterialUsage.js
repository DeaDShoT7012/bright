import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Col, Pagination, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function MaterialUsage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [employee,setEmployee] = useState([])
  const [employeeName,setEmployeeName] = useState('')
  const [password,setPassword] = useState('')
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedMaterialType, setSelectedMaterialType] = useState("");
  const [selectedMaterialUsed, setSelectedMaterialUsed] = useState("");
  const [date,setDate]=useState('')
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;


  const [itemToDelete, setItemToDelete] = useState();

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };

  const resetData = () => {
    // window.location.reload()
    setCurrentPage(1);
    setSelectedProjectName("");
    setSelectedMaterialType("");
    setSelectedMaterialUsed('');
    setDate('');
    fetchData();
  };

  const handleDeleteItem = async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}projectmaterialusage/remove-material/${id}`
    );
    fetchData();
    handleClose();
  };

  const fetchData = () => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}projectmaterialusage/get-material?projectName=${selectedProjectName}&materialType=${selectedMaterialType}&materialUsed=${selectedMaterialUsed}&date=${date}`
        )
        .then((res) => {
          console.log(res.data.material);
          setData(res.data.material);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmployee=(event)=>{
    setEmployeeName(event.target.value);
  }
  const handlePassword=(event)=>{
    setPassword(event.target.value);
  }

  const handleSupervisorLogin =async(e)=>{
    try {
      e.preventDefault();
      const data = {
        employeeName,
        password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}paintusage/supervisor-login`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/work-supervision");
      }
    } catch (error) {
      console.log(error);
      alert('Incorrect Password/UserName')
    }
  }

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
    getEmployee()
  }, [currentPage]);

       // Calculate the index range to display based on the current page
       const indexOfLastItem = currentPage * itemsPerPage;
       const indexOfFirstItem = indexOfLastItem - itemsPerPage;
       const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
       // Calculate total number of pages
       const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <Header />
      <div className="container mt-2">
        <h3>MATERIAL USAGE</h3>
        <div className="float-end  me-5">
          <Button
            variant="danger"
            size="sm"
            className="ms-2"
            onClick={handleShow2}
          >
            Work Supervision
          </Button>
          <Link to={"/assign-material"}>
            <Button variant="danger" size="sm" className="ms-2">
              Assign Material
            </Button>
          </Link>
        </div>
        <div
          className="p-4 mt-4 bg-dark"
          style={{ height: "800px", borderRadius: "10px"}}
        >
         <div className="mb-4">
            <Row>
              <Col xs={3}>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Project</Form.Label>
                  <Form.Select
                    value={selectedProjectName}
                    onChange={(e) => setSelectedProjectName(e.target.value)}
                  >
                    <option>Select</option>
                    {[...new Set(data.map((item) => item.projectName))].map(
                      (projectName) => (
                        <option key={projectName} value={projectName}>
                          {projectName}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Material Type</Form.Label>
                  <Form.Select
                    value={selectedMaterialType}
                    onChange={(e) => setSelectedMaterialType(e.target.value)}
                  >
                    <option>Select</option>
                    {[...new Set(data.map((item) => item.materialType))].map(
                      (materialType) => (
                        <option key={materialType} value={materialType}>
                          {materialType}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={3}>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Material Used</Form.Label>
                  <Form.Select
                    value={selectedMaterialUsed}
                    onChange={(e) => setSelectedMaterialUsed(e.target.value)}
                  >
                    <option>Select</option>
                    {[...new Set(data.map((item) => item.materialUsed))].map(
                      (materialUsed) => (
                        <option key={materialUsed} value={materialUsed}>
                          {materialUsed}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs={3}>
                <Form.Group as={Col} className="d-flex">
                  <Form.Label className="text-light me-5">Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Start Date"
                    name="paintCode"
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xs={3}>
                <Form.Group as={Col} className="d-flex">
                  <Form.Label className="text-light me-5"> End Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Start Date"
                    name="paintCode"
                  />
                </Form.Group>
              </Col>

              <Form.Group as={Col}>
                <Button
                  variant="success"
                  size="lg"
                  className=" mt-1"
                  onClick={fetchData}
                >
                  &nbsp;&nbsp;Search&nbsp;&nbsp;
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className=" mt-1 ms-2"
                   onClick={resetData}
                >
                  &nbsp;&nbsp;Reset&nbsp;&nbsp;
                </Button>
              </Form.Group>
            </Row>
          </div>
          <div className="paint-list">
            <table className="paint-inventory-table">
              <tbody>
                <tr>
                  <th style={{ width: "6%" }}>Sl</th>
                  <th style={{ width: "6%" }}>Date</th>
                  <th style={{ width: "20%" }}>Project</th>
                  <th style={{ width: "15%" }}>Material Type</th>
                  <th style={{ width: "15%" }}>Material Used</th>
                  <th style={{ width: "8%" }}>Pieces</th>
                  <th style={{ width: "8%" }}>QtyUsed</th>
                  <th style={{ width: "8%" }}>L in Stock</th>
                  <th style={{ width: "6%" }}>Shift</th>
                  <th style={{ width: "10%" }}>Employee</th>
                  <th style={{ width: "10%" }}>Status</th>
                  <th style={{ width: "12%" }}>Actions</th>
                </tr>
                {currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>
                      {item.projectName}-{item.subProject}-{item.topology}{" "}
                    </td>
                    <td>{item.materialType} </td>
                    <td>{item.materialUsed} </td>
                    <td>{item.qtyUsed} </td>
                    <td>{item.qtyUsed * item.pieces} </td>
                    <td>{item.pieces} </td>
                    <td>{item.shift} </td>
                    <td>{item.employeeName} </td>
                    <td>
                      {item.status == false ? "Not Verified" : "Verified"}{" "}
                    </td>
                    <td>
                      <Link
                        to={{ pathname: "/edit-material-usage/" + item._id }}
                      >
                        <i className="fa fa-pencil text-warning"></i>
                      </Link>

                      <Link onClick={(e) => handleDelete(item._id)}>
                        <i className="fa fa-trash text-danger ms-3"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination className="mt-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
        </div>
      </div>
      <Footer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bright Aluminium</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this item</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => handleDeleteItem(itemToDelete)}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Supervisor Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <Form.Label><b>Supervisor Name</b></Form.Label>
            </Col>
            <Col>
            <Form.Select style={{border:'1px solid black'}} onChange={handleEmployee}>
                <option disabled selected required >
                 Select
                </option>
                  {employee.map((item)=>(
                    <option
                    key={item._id}
                    value={item._id}
                    >
                    {item.name}
                    </option>
                  ))}
                </Form.Select>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs={4}>
              <Form.Label><b>Password</b></Form.Label>
            </Col>
            <Col>
            <Form.Control type="password" style={{border:'1px solid black'}} onChange={handlePassword}/>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={handleSupervisorLogin}
          >
            Login
          </Button>
          <Button variant="secondary" onClick={handleClose2}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MaterialUsage;
