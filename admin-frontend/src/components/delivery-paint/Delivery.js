import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Col, Modal, Pagination, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Delivery() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedMaterialType, setSelectedMaterialType] = useState("");
  const [selectedOrderFrom, setSelectedOrderFrom] = useState("");
  const [selectedPaint, setSelectedPaint] = useState("");
  const [createdAt, setStartDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;

  const [itemToDelete, setItemToDelete] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };

  const handleDeleteItem = async (id) => {
   const result = await axios.delete(
     `${process.env.REACT_APP_API_URL}deliverpaint/remove-delivery-paint/${id}`
   );
   fetchData();
   handleClose();
 };

  const resetData = () => {
    // window.location.reload()
    setCurrentPage(1);
    setSelectedProjectName("");
    setSelectedMaterialType("");
    setSelectedOrderFrom("");
    setSelectedPaint('');
    setStartDate("");
    fetchData();
  };

  const fetchData = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}deliverpaint/get-delivery?projectName=${selectedProjectName}&materialType=${selectedMaterialType}&orderFrom=${selectedOrderFrom}&paintName=${selectedPaint}&createdAt=${createdAt}`)
        .then((res) => {
          console.log(res.data.work);
          setData(res.data.work);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

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
        <h3>Delivery - Painting Project</h3>
        <span className="float-end  me-5">
          <Link to={"/add-delivery"}>
            <Button variant="danger" size="sm" className="ms-2">
              Delivery Add
            </Button>
          </Link>
        </span>
        <div
          className="p-4 mt-4 bg-dark"
          style={{ height: "800px", borderRadius: "10px" }}
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
              <Col xs={3}>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Paint</Form.Label>
                  <Form.Select
                    value={selectedPaint}
                    onChange={(e) => setSelectedPaint(e.target.value)}
                  >
                    <option>Select</option>
                    {[...new Set(data.map((item) => item.paintName))].map(
                      (paintName) => (
                        <option key={paintName} value={paintName}>
                          {paintName}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className="float-end d-flex mb-3">
            <Col>
              <Form.Group as={Col} className="d-flex">
                <Form.Label className="text-light me-5">Date</Form.Label>
                <Form.Control
                  type="date"
                  value={createdAt}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Button
              variant="success"
              size="md"
              className="ms-2"
              onClick={fetchData}
            >
              &nbsp;&nbsp;Search&nbsp;&nbsp;
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="ms-2"
              onClick={resetData}
            >
              &nbsp;&nbsp;Reset&nbsp;&nbsp;
            </Button>
          </div>
          <div className="paint-list">
            <table className="paint-inventory-table ">
              <tbody>
                <tr>
                  <th style={{ width: "20%" }}>Project</th>
                  <th style={{ width: "10%" }}>Date</th>
                  <th style={{ width: "15%" }}>Order From</th>
                  <th style={{ width: "15%" }}>Material Name</th>
                  <th style={{ width: "15%" }}>Paint</th>
                  <th style={{ width: "10%" }}>Document No</th>
                  <th style={{ width: "8%" }}>Quantity</th>
                  <th style={{ width: "10%" }}>Vehicle</th>
                  <th style={{ width: "20%" }}>Remark</th>
                  <th style={{ width: "10%" }}>Employee</th>
                  {user?.adminType==="admin"? <th style={{ width: "10%" }}>Actions</th>:""}
                </tr>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.projectName}</td>
                    <td>{item.createdAt.split("T")[0]} </td>
                    <td>{item.orderFrom} </td>
                    <td>{item.materialType} </td>
                    <td>{item.paintName} </td>
                    <td>{item.documentNo}</td>
                    <td>{item.quantity} </td>
                    <td>{item.vehicleNo} </td>
                    <td>{item.remark} </td>
                    <td>{item.userName} </td>
                    {user?.adminType==="admin"?
                    <td>
                      <Link onClick={(e) => handleDelete(item._id)}>
                        <i className="fa fa-trash text-danger ms-3"></i>
                      </Link>
                    </td>:""}
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
          <Button variant="danger" onClick={() => handleDeleteItem(itemToDelete)}>
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

export default Delivery;
