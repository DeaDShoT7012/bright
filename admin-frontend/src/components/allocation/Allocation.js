import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function Allocation() {

    const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();




  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };

  const handleSearch = () => {
    fetchData(searchQuery);
  };

  const handleDeleteItem = async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}allocation/remove-allocation/${id}`
    );
    fetchData();
    handleClose();
  };

  const fetchData = (search='') => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}allocation/get-allocation?search=${search}`).then((res) => {
        console.log(res.data.allocation);
        setData(res.data.allocation);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();  
  }, []);

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



  return (
<div>
      <Header />
      <div className="container mt-3">
        <h3>BRIGHT PROJECTS - ALLOCATION</h3>
        <span className="float-end  me-5">
          <Link to={"/add-allocation"}>
            <Button variant="danger" size="sm" className="ms-2">
              Add Project
            </Button>
          </Link>
        </span>
        <div
          className="p-5 mt-4 bg-dark"
          style={{ height: "550px", borderRadius: "10px" }}
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
                  <th style={{ width: "8%" }}>Sl</th>
                  <th style={{ width: "25%" }}>Project</th>
                  <th style={{ width: "10%" }}>Total Qty </th>
                  <th style={{ width: "15%" }}>Allocation</th>
                  <th style={{ width: "10%" }}>Qty Completed</th>
                  {user?.adminType==="admin"? <th style={{ width: "10%" }}>Actions</th>:""}

                </tr>
                {data.map((item,index) => (
                  <tr key={item._id}>
                    <td>{index+1}</td>
                    <td>{item.projectName}-{item.subProject}-{item.topology} </td>
                    <td>{item.quantity} </td>
                    <td>{item.allocation} </td>
                    <td>{item.completion} </td>
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

export default Allocation