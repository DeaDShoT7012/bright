import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Pagination } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function AssignWork() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
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

  const handleDeleteItem = async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}assignwork/remove-work/${id}`
    );
    fetchData();
    handleClose();
  };

  const fetchData = () => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}assignwork/get-work`).then((res) => {
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
        <h3>ASSIGNED WORKS</h3>
        <div className="float-end  me-5">
          <Link to={"/add-assign-work"}>
            <Button variant="danger" size="sm" className="ms-2">
              Assign Work
            </Button>
          </Link>
        </div>
        <div
          className="p-4 mt-4 bg-dark"
          style={{ height: "600px", borderRadius: "10px" }}
        >
          <div className="paint-list mt-5">
            <table className="paint-inventory-table">
              <tbody >
                <tr>
                  <th style={{ width: "25%" }}>Project</th>
                  <th style={{ width: "10%" }}>Date</th>
                  <th style={{ width: "20%" }}>Order from</th>
                  <th style={{ width: "20%" }}>Material Name</th>
                  <th style={{ width: "10%" }}>Shift</th>
                  <th style={{ width: "8%" }}>Assigned</th>
                  <th style={{ width: "8%" }}>Finished</th>
                  <th style={{ width: "8%" }}>Efficiency</th>
                  {user?.adminType==="admin"? <th style={{ width: "10%" }}>Actions</th>:""}
                </tr>
              
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <Link className="text-dark" to={'/view-assign-work/'+item.startDate+'/'+item.materialType}><td>{item.projectName}</td></Link>
                    <td>{item.date} </td>
                    <td>{item.orderFrom} </td>
                    <td>{item.materialType} </td>
                    <td>{item.shift} </td>
                    <td>{item.pieces} </td>
                    <td>0</td>
                    <td>0</td>
                    {user?.adminType==="admin"?<td>
                      <Link to={''}>
                        <i className="fa fa-pencil text-warning"></i>
                      </Link>

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

export default AssignWork;
