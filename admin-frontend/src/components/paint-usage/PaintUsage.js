import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Modal, Pagination } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

function PaintUsage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState();
  const [selectedPaint,setSelectedPaint] = useState('')
  const [createdAt,setDate]=useState('')
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
    setSelectedPaint('')
    setDate('');
    fetchData();
  };

  const handleDeleteItem = async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}paintusage/remove-paintUsage/${id}`
    );
    fetchData();
    handleClose();
  };

  const fetchData = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}paintusage/get-paintUsage?paintName=${selectedPaint}&createdAt=${createdAt}`)
        .then((res) => {
          console.log(res.data.paint);
          setData(res.data.paint);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
        <h3>PAINT USED by DATE</h3>
        <span className="float-end  me-5">
          <Link to={""}>
            <Button variant="danger" size="sm" className="ms-2">
              Paint Used Log
            </Button>
          </Link>
          <Link to={"/add-paint-used"}>
            <Button variant="danger" size="sm" className="ms-2">
              Add Paint Used
            </Button>
          </Link>
          <Link to={"/add-paint"}>
            <Button variant="danger" size="sm" className="ms-2">
              Add Paint
            </Button>
          </Link>
        </span>
        <div
          className="p-4 mt-4 bg-dark"
          style={{ height: "600px", borderRadius: "10px" }}
        >
          <div className="mb-3">
            <Row>
              <Col xs={3}>
                <Form.Label className="text-light">Name</Form.Label>
                <Form.Group as={Col}>
                  <Form.Select
                  value={selectedPaint}
                  onChange={(e) => setSelectedPaint(e.target.value)}
                  >
                    <option>Select</option>
                    {data
                      .reduce((uniquePaintsArray, item) => {
                        const paintKey = `${item.paintName}-${item.paintCode}-${item.paintColor}`;
                        if (!uniquePaintsArray.includes(paintKey)) {
                          uniquePaintsArray.push(paintKey);
                          return uniquePaintsArray;
                        }
                        return uniquePaintsArray;
                      }, [])
                      .map((paintKey) => (
                        <option key={paintKey} value={paintKey}>
                          {paintKey}
                        </option>
                      ))}
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
              <Button
              variant="success"
              size="lg"
              className="ms-2 mt-4"
              onClick={fetchData}
            >
              &nbsp;&nbsp;Search&nbsp;&nbsp;
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="ms-2 mt-4"
              onClick={resetData}
            >
              &nbsp;&nbsp;Reset&nbsp;&nbsp;
            </Button>
              </Col>
            </Row>
          </div>
          <div className="paint-list">
            <table className="paint-inventory-table ">
              <tbody>
                <tr>
                  <th style={{ width: "10%" }}>Date</th>
                  <th style={{ width: "30%" }}>Name</th>
                  <th style={{ width: "25%" }}>Paint Code</th>
                  <th style={{ width: "25%" }}>Paint Colour</th>
                  <th style={{ width: "10%" }}>Used Quantity</th>
                  {user?.adminType==="admin"? <th style={{ width: "10%" }}>Actions</th>:""}
                </tr>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.createdAt.split("T")[0]}</td>
                    <td>{item.paintName} </td>
                    <td>{item.paintCode} </td>
                    <td>{item.paintColor} </td>
                    <td> 0</td>
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

export default PaintUsage;
