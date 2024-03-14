import Footer from "../Footer";
import { Button, Pagination } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Header from "../Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function PaintMaterial() {
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
      `${process.env.REACT_APP_API_URL}inventory/remove-paint-material/${id}`
    );
    fetchData();
    handleClose();
  };

  const fetchData = (search='') => {
    axios
      .get(`${process.env.REACT_APP_API_URL}inventory/get-paint-material?search=${search}`)
      .then((res) => {
        console.log(res.data.paintMaterial);
        setData(res.data.paintMaterial);
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
        <span className="float-end  me-5">
          <Link to={"/paint-inventory"}>
            <Button variant="danger" size="sm" className="ms-2">
              Back to Paints
            </Button>
          </Link>
          <Link to={"/add-paint-material"}>
            <Button variant="danger" size="sm" className="ms-2">
              Add Material Type
            </Button>
          </Link>
        </span>
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
            <Button variant="success" size="md" className="ms-2"  onClick={handleSearch}>
              &nbsp;&nbsp;Search&nbsp;&nbsp;
            </Button>
          </div>
          <div className="paint-list">
            <table className="paint-inventory-table ">
              <tbody>
                <tr>
                  <th style={{ width: "25%" }}>Name</th>
                  <th style={{ width: "25%" }}>Description</th>
                  <th style={{ width: "20%" }}>Perimeter</th>
                  <th style={{ width: "20%" }}>Price per sq ft.</th>
                  <th style={{ width: "10%" }}>Actions</th>
                </tr>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.materialType}</td>
                    <td>{item.description} </td>
                    <td>{item.perimeter} </td>
                    <td>{item.materialPrice} </td>
                    <td>
                      <Link to={"/edit-paint-material/" + item._id}>
                        {" "}
                        <i className="fa fa-pencil text-warning"></i>
                      </Link>
                      <Link onClick={(e)=>handleDelete(item._id)}>
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

export default PaintMaterial;
