import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function PaintProjects() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState();
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedMaterialType, setSelectedMaterialType] = useState("");
  const [selectedOrderFrom, setSelectedOrderFrom] = useState("");
  const [createdAt,setStartDate]=useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };

  const resetData = () => {
    // window.location.reload()
    setSelectedProjectName("");
    setSelectedMaterialType("");
    setSelectedOrderFrom('');
    setStartDate('');
    fetchData();
  };

  const handleDeleteItem = async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}paintproject/remove-paint-project/${id}`
    );
    fetchData();
    handleClose();
  };


  const fetchData = async () => {
    try {
      const url =`${process.env.REACT_APP_API_URL}paintproject/get-paint-project?projectName=${selectedProjectName}&materialType=${selectedMaterialType}&orderFrom=${selectedOrderFrom}&createdAt=${createdAt}`;
      const paintProjectsResponse = await axios.get(url)
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

  
  console.log("data",data);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log(userData);
      setUser(userData)
      if (userData.adminType === 'admin'|| userData.adminType === 'office'|| userData.adminType === 'employee'||userData.adminType === 'assignEmployee') {
        console.log('user loged');
      }
       else {
        navigate('/');
      }
    }
    else{
      navigate('/')
    }
  }, [])



  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div>
      <Header />
      <div className="container mt-2">
        <h3>PAINTING PROJECTS</h3>
        <div className="float-end  me-5">
          <Link to={"/add-paint-projects"}>
            <Button variant="danger" size="sm" className="ms-2">
              Add Painting Project
            </Button>
          </Link>
        </div>
        <div
          className="p-4 mt-4 bg-dark"
          style={{ height: "590px", borderRadius: "10px" }}
        >
          <div className="mb-4">
            <Row>
              <Col xs={3}>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Name</Form.Label>
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
                    {[...new Map(data.map((item) => [item.materialType.materialType,item.materialType,])).values(),
                    ].map((materialType) => (
                      <option key={materialType._id} value={materialType._id}>
                        {materialType.materialType}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={3}>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Order From</Form.Label>
                  <Form.Select
                    value={selectedOrderFrom}
                    onChange={(e) => setSelectedOrderFrom(e.target.value)}
                  >
                    <option>Select</option>
                    {[...new Set(data.map((item) => item.orderFrom))].map(
                      (orderFrom) => (
                        <option key={orderFrom} value={orderFrom}>
                          {orderFrom}
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
                    value={createdAt}
                    onChange={(e)=>setStartDate(e.target.value)}
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
                {/* <Button
                  variant="warning"
                  size="lg"
                  className=" mt-1 ms-2"
                >
                  &nbsp;&nbsp;Print&nbsp;&nbsp;
                </Button> */}
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
        
          <div className="paint-list" style={{ maxHeight: "380px", overflowY: "auto" }}>
            <table className="paint-inventory-table ">
              <tbody>
                <tr>
                  <th style={{ width: "10%" }}>Date</th>
                  <th style={{ width: "15%" }}>Name</th>
                  <th style={{ width: "15%" }}>Order From</th>
                  <th style={{ width: "20%" }}>Type</th>
                  <th style={{ width: "10%" }}>Pcs</th>
                  <th style={{ width: "10%" }}>Sq Ft</th>
                  <th style={{ width: "10%" }}>COMPL</th>
                  <th style={{ width: "10%" }}>Tot Cost</th>
                  <th style={{ width: "10%" }}>Expense</th>
                 {user?.adminType==="admin"? <th style={{ width: "15%" }}>Actions</th>:""}
                </tr>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.createdAt.split("T")[0]}</td>
                    <Link
                      to={
                        "/view-paint-projects/" +
                        item._id +
                        "/" +
                        item.materialType._id
                      }
                      className="text-dark"
                    >
                      <td>{item.projectName}</td>
                    </Link>
                    <td>{item.orderFrom}</td>
                    <td>{item.materialType.materialType}</td>
                    <td>{item.pieces}</td>
                    <td>
                      {(
                        item.materialType.perimeter *
                        item.pieces *
                        item.pieceLength
                      ).toFixed(5)}
                    </td>
                    <td>0</td>
                    <td>
                      {(
                        item.materialType.perimeter *
                        item.pieceLength *
                        item.materialType.materialPrice *
                        item.pieces
                      ).toFixed(5)}
                    </td>
                    <td>{item.expense ? item.expense : "0"}</td>
                   {user?.adminType==="admin"?
                   <td>
                      <Link to={"/edit-paint-projects/" + item._id}>
                        <i className="fa fa-pencil text-warning"></i>
                      </Link>
                      <Link onClick={(e) => handleDelete(item._id)}>
                        <i className="fa fa-trash text-danger ms-3"></i>
                      </Link>
                    </td>:''}
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    </div>
  );
}

export default PaintProjects;
