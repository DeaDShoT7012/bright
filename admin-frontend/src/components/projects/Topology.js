import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Modal  } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function Topology() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const params = useParams();
  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState();

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const handleDelete = (id) => {
  setItemToDelete(id);
  handleShow(); 
};

const handleDeleteItem = async (tid) => {
  const result = await axios.delete(`${process.env.REACT_APP_API_URL}project/remove-topology/${params.id}/${params.sid}/${tid}`);
  getSubProject();
  handleClose();
};

  const getSubProject = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}project/get-topology/${params.id}/${params.sid}`
      )
      .then((res) => {
        console.log("res", res.data.topologyList);
        setData(res.data.topologyList);
      });
  };

  

  useEffect(() => {
    getSubProject();
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
        <h3>Topologies under {params.name} </h3>
        <div className="float-end  me-5">
          <Link to={"/add-sub-projects/"+params.id}>
            <Button variant="danger" size="sm" className="ms-2">
              Back to Sub Projects
            </Button>
          </Link>
         <Link to={'/add-topology/'+params.id+"/"+params.name+"/"+params.sid}>
            <Button
              variant="danger"
              size="sm"
              className="ms-2"
            >
              Add Topology
            </Button>
         </Link>
        </div>
        <div
          className="p-5 mt-4 bg-dark"
          style={{ height: "auto", borderRadius: "10px" }}
        >
          <div className="float-end d-flex mb-4">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button variant="success" size="md" className="ms-2">
              &nbsp;&nbsp;Search&nbsp;&nbsp;
            </Button>
          </div>
          <div className="paint-list">
            <table className="paint-inventory-table ">
              <tbody>
                <tr>
                  <th style={{ width: "6%" }}>Sl</th>
                  <th style={{ width: "15%" }}>Topology</th>
                  <th style={{ width: "15%" }}>Specification</th>
                  <th style={{ width: "8%" }}>Cost</th>
                  <th style={{ width: "8%" }}>Qty</th>
                  <th style={{ width: "8%" }}>Width</th>
                  <th style={{ width: "8%" }}>Height</th>
                  <th style={{ width: "8%" }}>Area</th>
                  <th style={{ width: "8%" }}>Qty Cmpltd</th>
                  {user?.adminType==="admin"? <th style={{ width: "8%" }}>Actions</th>:""}
                </tr>

                {data.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.topologyName} </td>
                      <td>{item.specification}</td>
                      <td>{item.cost}</td>
                      <td>{item.quantity}</td>
                      <td>{item.width}</td>
                      <td>{item.height}</td>
                      <td>{item.height*item.width*item.quantity}</td>
                      <td>{item.qtyCmpltd?item.qtyCmpltd:"0"}</td>
                      {user?.adminType==="admin"?<td>
                     <Link to={'/edit-topology/'+params.id+"/"+params.sid+"/"+params.name+"/"+item._id} 
                     > <i className="fa fa-pencil text-warning"></i></Link>
                      <Link onClick={(e)=>handleDelete(item._id)}><i className="fa fa-trash text-danger ms-3"></i></Link>
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
  );
}

export default Topology;
