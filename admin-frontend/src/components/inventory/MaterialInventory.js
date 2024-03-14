import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Col, Row, Pagination } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function MaterialInventory() {
  const [data, setData] = useState([]);

  const [itemToDelete, setItemToDelete] = useState();
  const [selectedMaterialName, setSelectedMaterialName] = useState("");
  const [selectedMaterialType, setSelectedMaterialType] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };

  const handleDeleteItem = async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}inventory/remove-material/${id}`
    );
    fetchData();
    handleClose();
  };

  const resetData = () => {
    // window.location.reload()
    setCurrentPage(1);
    setSelectedMaterialName("");
    setSelectedMaterialType("");
    fetchData();
  };


  const fetchData = () => {
    const url = `${process.env.REACT_APP_API_URL}inventory/get-material?materialName=${selectedMaterialName}&materialType=${selectedMaterialType}`;
    axios.get(url).then((res) => {
      console.log(res.data.material);
      setData(res.data.material);
    });
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
        <h3>MATERIAL INVENTORY</h3>
        <div className="float-end  me-5">
          <Link to={"/add-material-type"}>
            <Button variant="danger" size="sm" className="ms-2">
              Add Material Type
            </Button>
          </Link>

          <Link to={"/add-material"}>
            <Button variant="danger" size="sm" className="ms-2">
              Add Material
            </Button>
          </Link>
        </div>
        <div
          className="p-4 mt-2 bg-dark"
          style={{ height: "620px", borderRadius: "10px" }}
        >
          <div className="mb-4">
          <Row>
              <Col xs={4}>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Material Name</Form.Label>
                  <Form.Select
                  value={selectedMaterialName}
                  onChange={(e) => setSelectedMaterialName(e.target.value)}
                  >
                <option>
                 Select
                </option>
                  {[...new Set(data.map((item) => item.materialName))].map(
                    (materialName) => (
                      <option key={materialName} value={materialName}>
                        {materialName}
                      </option>
                    )
                  )}
                </Form.Select>
                </Form.Group>
              </Col>

              <Form.Group as={Col}>
                  <Form.Label className="text-light">Material Type</Form.Label>
                  <Form.Select
                  value={selectedMaterialType}
                  onChange={(e) => setSelectedMaterialType(e.target.value)}
                  >
                <option>
                 Select
                </option>
                  {[...new Set(data.map((item) => item.materialType))].map(
                    (materialType) => (
                      <option key={materialType} value={materialType}>
                        {materialType}
                      </option>
                    )
                  )}
                </Form.Select>
                </Form.Group>

              <Form.Group as={Col}>
              <Button variant="success" size="lg" className=" mt-4"  onClick={fetchData}>
              &nbsp;&nbsp;Search&nbsp;&nbsp;
            </Button>
            <Button variant="secondary" size="lg" className=" mt-4 ms-2" 
             onClick={resetData}
            >
              &nbsp;&nbsp;Reset&nbsp;&nbsp;
            </Button>
              </Form.Group>
            </Row>      
          </div>
          <div className="paint-list">
            <table className="paint-inventory-table ">
              <tbody>
                <tr>
                  <th style={{ width: "6%" }}>Sl</th>
                  <th style={{ width: "15%" }}>Material Name</th>
                  <th style={{ width: "15%" }}>Material Type</th>
                  <th style={{ width: "5%" }}>Parameter</th>
                  <th style={{ width: "15%" }}>Specification</th>
                  <th style={{ width: "8%" }}>Actions</th>
                </tr>
                {currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.materialName}</td>
                    <td>{item.materialType} </td>
                    <td>{item.parameter} </td>
                    <td>{item.specification} </td>
                    <td>
                      <Link to={'/edit-material/'+item._id}>
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
    </div>
  );
}

export default MaterialInventory;
