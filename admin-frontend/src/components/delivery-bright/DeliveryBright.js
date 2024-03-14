import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function DeliveryBright() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

     const [data, setData] = useState([]);
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
        `${process.env.REACT_APP_API_URL}deliverpaint/remove-delivery-bright/${id}`
      );
      fetchData();
      handleClose();
    };

  const fetchData = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}deliverpaint/get-delivery-bright`)
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
        <h3>Delivery - Bright Project</h3>
        <span className="float-end  me-5">
          <Link to={"/add-delivery-bright"}>
            <Button variant="danger" size="sm" className="ms-2">
              Delivery Add
            </Button>
          </Link>
        </span>
        <div
          className="p-5 mt-4 bg-dark"
          style={{ height: "550px", borderRadius: "10px" }}
        >
          <div className="paint-list">
            <table className="paint-inventory-table ">
              <tbody>
                <tr>
                  <th style={{ width: "20%" }}>Project</th>
                  <th style={{ width: "10%" }}>Date</th>
                  <th style={{ width: "15%" }}>Sub</th>
                  <th style={{ width: "15%" }}>Topology</th>
                  <th style={{ width: "10%" }}>Document No</th>
                  <th style={{ width: "8%" }}>Quantity</th>
                  <th style={{ width: "10%" }}>Vehicle</th>
                  <th style={{ width: "20%" }}>Remark</th>
                  <th style={{ width: "10%" }}>Employee</th>
                  {user?.adminType==="admin"? <th style={{ width: "10%" }}>Actions</th>:""}
                </tr>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.projectName}</td>
                    <td>{item.createdAt.split("T")[0]} </td>
                    <td>{item.subProject} </td>
                    <td>{item.topology} </td>
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
)
}

export default DeliveryBright