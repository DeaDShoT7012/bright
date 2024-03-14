import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Col, Pagination, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";


function WorkSupervision() {
  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState();
  const [selectedProcess, setSelectedProcess] = useState("");
  const [createdAt,setDate]=useState('')
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;




  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };

  const resetData = () => {
    // window.location.reload()
    setCurrentPage(1);
    setSelectedProcess('')
    setSearchQuery('')
    setDate('');
    fetchData();
  };

  const handleDeleteItem = async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}projectmaterialusage/remove-work-supervision/${id}`
    );
    fetchData();
    handleClose();
  };

  const fetchData = () => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}projectmaterialusage/get-work-supervision?process=${selectedProcess}&createdAt=${createdAt}&searchQuery=${searchQuery}`
        )
        .then((res) => {
          console.log('work',res.data.material);
          setData(res.data.material);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
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
      <h3>WORK SUPERVISION</h3>
      <div className="float-end  me-5">
      <Link to={"/material-usage"}>
          <Button variant="danger" size="sm" className="ms-2">
            Back to Material Usage
          </Button>
        </Link>
        <Link to={"/view-material-usage"}>
          <Button variant="danger" size="sm" className="ms-2">
            View Material Usage
          </Button>
        </Link>
        <Link to={"/add-work-supervision"}>
          <Button variant="danger" size="sm" className="ms-2">
            Add Work Supervision
          </Button>
        </Link>
      </div>
      <div
        className="p-4 mt-4 bg-dark"
        style={{ height: "600px", borderRadius: "10px" }}
      >
         <div className="mb-3">
            <Row>
              <Col xs={3}>
              <Form.Label className="text-light">Process</Form.Label>
                <Form.Group as={Col}>
                  <Form.Select
                    value={selectedProcess}
                    onChange={(e) => setSelectedProcess(e.target.value)}
                  >
                    <option>Select</option>
                    {[...new Set(data.map((item) => item.process))].map(
                      (process) => (
                        <option key={process} value={process}>
                          {process}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={3}>
              <Form.Label className="text-light">Start Date</Form.Label>
                <Form.Group as={Col} className="d-flex">
                  <Form.Control
                    type="date"
                    placeholder="Start Date"
                    value={createdAt}
                    onChange={(e)=>setDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
              <Form.Label className="text-light">End Date</Form.Label>
                <Form.Group as={Col} className="d-flex">
                  <Form.Control
                    type="date"
                    placeholder="Start Date"
                    // onChange={handlePaintCode}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
              <Form.Label className="text-light">Search</Form.Label>
                <Form.Group as={Col} className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder='Search'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className="float-end d-flex mb-3">
          <Button variant="success" size="md" className="ms-2" 
          onClick={fetchData}
          >
            &nbsp;&nbsp;Search&nbsp;&nbsp;
          </Button>
          <Button variant="secondary" size="md" className="ms-2"
          onClick={resetData}
          >
            &nbsp;&nbsp;Reset&nbsp;&nbsp;
          </Button>
        </div>
        <div className="paint-list">
          <table className="paint-inventory-table ">
            <tbody>
              <tr>
                <th style={{ width: "6%" }}>Sl</th>
                <th style={{ width: "20%" }}>Project</th>
                <th style={{ width: "8%" }}>Qty Completed</th>
                <th style={{ width: "10%" }}>Process</th>
                <th style={{ width: "10%" }}>Employee</th>
                <th style={{ width: "10%" }}>Remarks</th>
                <th style={{ width: "10%" }}>Date</th>
                <th style={{ width: "8%" }}>Actions</th>
              </tr>
              {currentItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    {item.projectName}-{item.subProject}-{item.topology}{" "}
                  </td>
                  <td>{item.quantity} </td>
                  <td>{item.process} </td>
                  <td>{item.supervisorName} </td>
                  <td>{item.remark} </td>
                  <td>{item.createdAt.split("T")[0]} </td>
                  <td>
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
    </div>
  )
}

export default WorkSupervision