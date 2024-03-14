import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button,Col,Pagination } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function TentativeWork() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [date,setDate]=useState('')
  const [itemToDelete, setItemToDelete] = useState();
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
    setDate('');
    fetchData();
  };

  const handleDeleteItem = async (id) => {
    const result = axios.delete(
      `${process.env.REACT_APP_API_URL}tentativework/remove-work/${id}`
    );
    fetchData();
    handleClose();
  };

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}tentativework/get-work?date=${date}`)
      .then((res) => {
        console.log(res.data.work);
        setData(res.data.work);
      });
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
        <h3>TENTATIVE WORKS</h3>
        <div className="float-end  me-5">
          <Link to={"/add-tentative-works"}>
            <Button
              variant="danger"
              size="sm"
              className="ms-2"
            >
              Add
            </Button>
          </Link>
        </div>
        <div
          className="p-4 mt-4 bg-dark"
          style={{ height: "590px", borderRadius: "10px" }}
        >
          <div className="float-end d-flex mb-4">
          <Form.Label className="text-light me-4">Start Date</Form.Label>
                <Form.Group as={Col} className="d-flex me-5" >
                  <Form.Control
                    type="date"
                    placeholder="Start Date"
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Label className="text-light me-4">End Date</Form.Label>
                <Form.Group as={Col} className="d-flex">
                  <Form.Control
                    type="date"
                    placeholder="End Date"  
                  />
                </Form.Group>
            <Button variant="success" size="md" className="ms-2" onClick={fetchData}>
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
                  <th style={{ width: "20%" }}>Date</th>
                  <th style={{ width: "20%" }}>Shift</th>
                  <th style={{ width: "20%" }}>Paint Colour</th>
                  <th style={{ width: "30%" }}>Description</th>
                  {user?.adminType==="admin"? <th style={{ width: "10%" }}>Actions</th>:""}
                </tr>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.date}</td>
                    <td>{item.shift} </td>
                    <td>{item.paintColor} </td>
                    <td>{item.description} </td>
                   {user?.adminType==="admin"? <td>
                      <Link to={{ pathname: "/edit-works/" + item._id }}>
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

export default TentativeWork;
