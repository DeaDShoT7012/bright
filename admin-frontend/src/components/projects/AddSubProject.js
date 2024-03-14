import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function AddSubProject() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const params = useParams();
  const [sname, setSname] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [itemToDelete, setItemToDelete] = useState();

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow2();
  };

  const handleDeleteItem = async (sid) => {
    const result = axios.delete(
      `${process.env.REACT_APP_API_URL}project/remove-sub-project/${params.id}/${sid}`
    );
    console.log(result);
    handleClose2();
    getSubProject();
  };

  const handleSubProjectName = ({ target }) => setSname(target.value);

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      const data = {
        sname,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}project/add-sub-project/${params.id}`,
        data
      );
      console.log("res", response);
      handleClose();
      getSubProject();
    } catch (error) {
      console.log(error);
    }
  };

  const getSubProject = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}project/get-sub-project/${params.id}`
      )
      .then((res) => {
        console.log("res", res.data.project);
        setData(res.data.project);
      });
  };

  useEffect(() => {
    getSubProject();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      console.log(userData);
      setUser(userData);
      if (
        userData.adminType === "admin" ||
        userData.adminType === "office" ||
        userData.adminType === "employee" ||
        userData.adminType === "assignEmployee"
      ) {
        console.log("user loged");
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h3>{data.projectName}</h3>
        <div className="float-end  me-5">
          <Link to={"/bright-projects"}>
            <Button variant="danger" size="sm" className="ms-2">
              Back to Projects
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            className="ms-2"
            onClick={handleShow}
          >
            Add Sub Projects
          </Button>
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
                  <th style={{ width: "12%" }}>Sub Project</th>
                  <th style={{ width: "10%" }}>No: of Topology</th>
                  <th style={{ width: "8%" }}>Total Amount</th>
                  <th style={{ width: "8%" }}>Qty</th>
                  <th style={{ width: "8%" }}>Qty Completed</th>
                  {user?.adminType === "admin" ? (
                    <th style={{ width: "8%" }}>Actions</th>
                  ) : (
                    ""
                  )}
                </tr>
                {data.subProjectList &&
                  data.subProjectList.map((item, index) => {
                    const totalQuantity = item.topologyList.reduce(
                      (acc, topology) => acc + parseInt(topology.quantity, 10),
                      0
                    );
                    const totalAmount = item.topologyList.reduce(
                      (acc, topology) => {
                        const cost = parseFloat(topology.cost);
                        const quantity = parseInt(topology.quantity, 10);
                        return acc + cost * quantity;
                      },
                      0
                    );
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <Link
                          to={
                            "/topology/" +
                            data._id +
                            "/" +
                            item.subProject +
                            "/" +
                            item._id
                          }
                        >
                          <td className="text-dark">{item.subProject} </td>
                        </Link>
                        <td>{item.topologyList.length}</td>
                        <td>{totalAmount}</td>
                        <td>{totalQuantity}</td>
                        <td>0</td>
                        {user?.adminType === "admin" ? (
                          <td>
                            <Link onClick={(e) => handleDelete(item._id)}>
                              <i className="fa fa-trash text-danger ms-3"></i>
                            </Link>
                          </td>
                        ) : (
                          ""
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-center">Sub Project Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Project Name">
            <Form.Control
              type="text"
              placeholder="Paint Name"
              style={{ border: "1px solid grey" }}
              id="paintName"
              name="paintName"
              onChange={handleSubProjectName}
            />
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={handleAdd}>
            Add
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
        <Modal.Body>Are you sure to delete this item</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => handleDeleteItem(itemToDelete)}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose2}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddSubProject;
