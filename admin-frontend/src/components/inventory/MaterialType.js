import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Pagination } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function MaterialType() {
  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState();
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

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(searchQuery);
  };

  const handleDeleteItem = async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}inventory/remove-material-type/${id}`
    );
    fetchData();
    handleClose();
  };

  const fetchData = (search='') => {
    axios
      .get(`${process.env.REACT_APP_API_URL}inventory/get-material-type?search=${search}`)
      .then((res) => {
        console.log(res.data.materialType);
        setData(res.data.materialType);
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
        <h3>MATERIAL TYPE</h3>
        <div className="float-end  me-5">
          <Link to={"/material-inventory"}>
            <Button variant="danger" size="sm" className="ms-2">
              Back to Material Inventory
            </Button>
          </Link>

          <Link to={"/add-material-type"}>
            <Button variant="danger" size="sm" className="ms-2">
              Add Material Type
            </Button>
          </Link>
        </div>
        <div
          className="p-4 mt-4 bg-dark"
          style={{ height: "590px", borderRadius: "10px" }}
        >
          <div className="float-end d-flex mb-4">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="success"
              size="md"
              className="ms-2"
              onClick={handleSearch}
            >
              &nbsp;&nbsp;Search&nbsp;&nbsp;
            </Button>
          </div>
          <div className="paint-list">
            <table className="paint-inventory-table ">
              <tbody>
                <tr>
                  <th style={{ width: "6%" }}>Sl</th>
                  <th style={{ width: "10%" }}>Material Type</th>
                  <th style={{ width: "8%" }}>Actions</th>
                </tr>
                {currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.materialType}</td>
                    <td>
                      <Link to={"/edit-material-type/" + item._id}>
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

export default MaterialType;
