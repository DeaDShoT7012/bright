import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Modal, Pagination } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function BrightProjects() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const handleDeleteItem = async (id) => {
    const result = axios.delete(
      `${process.env.REACT_APP_API_URL}project/remove-project/${id}`
    );
    fetchData();
    handleClose();
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(searchQuery);
  };

  const fetchData = (search='') => {
    axios
      .get(`${process.env.REACT_APP_API_URL}project/get-project?search=${search}`)
      .then((res) => {
        const projects = res.data.project;
        projects.forEach((project) => {
          let totalQty = 0;
          let totalCost = 0;

          project.subProjectList.forEach((subProject) => {
            subProject.topologyList.forEach((topology) => {
              totalQty += parseInt(topology.quantity, 10);
              totalCost +=
                parseInt(topology.cost, 10) * parseInt(topology.quantity, 10);
            });
            subProject.totalQty = totalQty;
            subProject.totalCost = totalCost;
          });
          project.totalQty = totalQty;
          project.totalCost = totalCost;
        });

        setData(projects);
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
      <Header/>
      <div className="container mt-2">
        <h3>BRIGHT PROJECTS</h3>
        <div className="float-end  me-5">
         <Link to={"/add-bright-projects"}>
            <Button
              variant="danger"
              size="sm"
              className="ms-2"
            >
              Add Project
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
            <Button variant="success" size="md" className="ms-2"  onClick={handleSearch}>
              &nbsp;&nbsp;Search&nbsp;&nbsp;
            </Button>
          </div>
          <div className="paint-list">
            <table className="paint-inventory-table ">
              <tbody>
                <tr>
                  <th style={{ width: "6%" }}>Sl</th>
                  <th style={{ width: "15%" }}>Project</th>
                  <th style={{ width: "10%" }}>Deadline</th>
                  <th style={{ width: "8%" }}>Total Qty</th>
                  <th style={{ width: "8%" }}>Total Cost</th>
                  <th style={{ width: "8%" }}>Qty Completed</th>
                  <th style={{ width: "8%" }}>Expense</th>
                  {user?.adminType==="admin"? <th style={{ width: "8%" }}>Actions</th>:""}
                </tr>
                {currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <Link to={"/add-sub-projects/" + item._id}>
                      <td className="text-dark">{item.projectName}</td>
                    </Link>
                    <td>{item.deadline} </td>
                    <td>{item.totalQty}</td>
                    <td>{item.totalCost} </td>
                    <td>0</td>
                    <td>{item.expense?item.expense:"0"}</td>
                    {user?.adminType==="admin"?<td>
                      <Link
                        to={{ pathname: "/edit-bright-projects/" + item._id }}
                      >
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

export default BrightProjects;
