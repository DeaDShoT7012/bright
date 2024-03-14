import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Col, Pagination, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function ViewMaterialUsage() {

  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState();
  const [itemToVerify, setItemToVerify] = useState();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [verify,setVerify]= useState(Boolean)
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };

  

  const handleVerify = (id,status)=>{
    console.log('ddcec',id,status);
    setItemToVerify(id);
    if (!status) {
      setVerify(true);
    } else {
      setVerify(false);
    }
    handleShow2();
  }

  console.log('verify',verify);

  const handleVerifyItem = async(id)=>{
    const data ={
        verify
    }
    const result = await axios.post(
        `${process.env.REACT_APP_API_URL}projectmaterialusage/update-status/${id}`,
        data
    )
    console.log(result);
    fetchData();
    handleClose2();
  }

  const handleDeleteItem = async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}projectmaterialusage/remove-material/${id}`
    );
    fetchData();
    handleClose();
  };

  const fetchData = () => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}projectmaterialusage/get-material?projectName=${selectedProjectName}`
        )
        .then((res) => {
          console.log(res.data.material);
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
      <h3>VIEW MATERIAL USAGE</h3>
      <div className="float-end  me-5">
      <Link to={"/material-usage"}>
          <Button variant="danger" size="sm" className="ms-2">
            Back to Material Usage
          </Button>
        </Link>
        <Link to={"/work-supervision"}>
          <Button variant="danger" size="sm" className="ms-2">
            View Work Supervision
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
        <div className="float-end d-flex mb-4">
        <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={selectedProjectName}
              onChange={(e) => setSelectedProjectName(e.target.value)}
            />
            <Button variant="success" size="md" className="ms-2"  onClick={fetchData}>
              &nbsp;&nbsp;Search&nbsp;&nbsp;
            </Button>
        </div>
        <div className="paint-list">
          <table className="paint-inventory-table ">
            <tbody>
              <tr>
                <th style={{ width: "6%" }}>Sl</th>
                <th style={{ width: "20%" }}>Project</th>
                <th style={{ width: "15%" }}>Material Type</th>
                <th style={{ width: "15%" }}>Material Used</th>
                <th style={{ width: "8%" }}>Quantity</th>
                <th style={{ width: "8%" }}>Location</th>
                <th style={{ width: "8%" }}>Shift</th>
                <th style={{ width: "10%" }}>Employee</th>
                <th style={{ width: "10%" }}>Status</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
              {currentItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    {item.projectName}-{item.subProject}-{item.topology}{" "}
                  </td>
                  <td>{item.materialType} </td>
                  <td>{item.materialUsed} </td>
                  <td>{item.qtyUsed} </td>
                  <td>{item.stock} </td>
                  <td>{item.shift} </td>
                  <td>{item.employeeName} </td>
                  <td>
                   <Link onClick={()=>handleVerify(item._id,item.status)}>
                     {item.status == false ? <span className="text-danger">Not Verified</span> : <span className="text-success">Verified</span>}
                    </Link>
                  </td>
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

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Bright Aluminium</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={()=>handleVerifyItem(itemToVerify)}
          >
            Ok
          </Button>
          <Button variant="secondary" onClick={handleClose2}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>  
      
    </div>
  )
}

export default ViewMaterialUsage