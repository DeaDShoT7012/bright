import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function ViewPaintProject() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const params = useParams();
  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);
  const [paint, setPaint] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [paintName, setPaintName] = useState("");
  const [pieces, setPieces] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [password, setPassword] = useState("");
  const [shift, setShift] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = () => {
    handleShow();
  };

  const handlePaint = (event) => {
    setPaintName(event.target.value);
  };

  const handlePieces = (event) => {
    setPieces(event.target.value);
  };

  const handleEmployee = (event) => {
    setEmployeeName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleShift = (event) => {
    setShift(event.target.value);
  };

  console.log("no.of.p", pieces);

  const handleAddLog = async () => {
    try {
      const data = {
        paintName,
        pieces,
        employeeName,
        password,
        shift,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}paintproject/add-log/${params.id}`,
        data
      );
      console.log("res", response);
      if (response) {
        fecthProject();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert("Incorrect Password/UserName");
    }
  };

  // const fecthProject = () => {
  //   axios
  //   .get(`${process.env.REACT_APP_API_URL}paintproject/edit-paint-project/${params.id}`)
  //   .then((res) => {
  //     console.log("response", res.data.project);
  //     setData(res.data.project)
  //   });
  // };

  // const fecthProject = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}paintproject/edit-paint-project/${params.id}`)
  //     .then((res) => {
  //       console.log("response", res.data.project);
  //       const updatedDailyLog = [];
  //         res.data.project.dailyLog.forEach((logEntry) => {
  //         axios
  //           .get(`${process.env.REACT_APP_API_URL}inventory/edit-paint/${logEntry.paint}`)
  //           .then((paintDetails) => {
  //             const updatedLogEntry = { ...logEntry, paintDetails: paintDetails.data };
  //             updatedDailyLog.push(updatedLogEntry);

  //             if (updatedDailyLog.length === res.data.project.dailyLog.length) {
  //               setData({ ...res.data.project, dailyLog: updatedDailyLog });
  //             }
  //           })
  //           .catch((error) => {
  //             console.error("Error fetching paint details:", error);
  //           });
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching project:", error);
  //     });
  // };

  const fecthProject = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}paintproject/edit-paint-project/${params.id}`
      )
      .then((res) => {
        console.log("response", res.data.project);

        if (res.data.project.dailyLog && res.data.project.dailyLog.length > 0) {
          const updatedDailyLog = [];
          res.data.project.dailyLog.forEach((logEntry) => {
            axios
              .get(
                `${process.env.REACT_APP_API_URL}inventory/edit-paint/${logEntry.paint}`
              )
              .then((paintDetails) => {
                const updatedLogEntry = {
                  ...logEntry,
                  paintDetails: paintDetails.data,
                };
                updatedDailyLog.push(updatedLogEntry);

                if (
                  updatedDailyLog.length === res.data.project.dailyLog.length
                ) {
                  setData({ ...res.data.project, dailyLog: updatedDailyLog });
                }
              })
              .catch((error) => {
                console.error("Error fetching paint details:", error);
              });
          });
        } else {
          // Handle the case when dailyLog is empty or not present
          setData(res.data.project);
        }
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
      });
  };

  console.log("log", data);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}paintproject/get-paint-material/${params.mid}`
        );
        console.log("material", response.data.project);
        setItem(response.data.project);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, []);

  const fetchPaint = async (search = "") => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}inventory/get?search=${search}`
      );
      console.log(res.data.inventory);
      setPaint(res.data.inventory);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployee = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}employee/get-employee`)
      .then((res) => {
        console.log("employee", res.data.employee);
        setEmployee(res.data.employee);
      });
  };

  useEffect(() => {
    fetchPaint();
    getEmployee();
    fecthProject();
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
      <div className="container mt-5">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div className="paint-project-dashboard">
            <div>
              <h2
                style={{
                  background:
                    "linear-gradient(to bottom, #636363 0%,#7d7d7d 100%",
                }}
              >
                <i class="fa-solid fa-user fa-xl me-3"></i>
                {data.projectName}
                {user?.adminType === "admin" ? (
                  <Link to={"/edit-paint-projects/" + data.projectName}>
                    <button className="paint-project-edit">Edit</button>
                  </Link>
                ) : (
                  ""
                )}
              </h2>
              <span
                className="paint-project-span"
                style={{
                  background:
                    "url(https://brightaluminiumworks.com/mod/twitter_bootstrap/vendors/bootstrap/img/dsh_dnarrow.png) no-repeat",
                }}
              ></span>
            </div>
            <div>
              <h6 className="text-center mt-5">No: of Pieces: {data.pieces}</h6>
              <h6 className="text-center ">
                No: of Pieces left: {data.pieces}
              </h6>
              <h6 className="text-center ">
                Length per piece: {data.pieceLength}
              </h6>
            </div>
          </div>

          <div className="paint-project-dashboard">
            <div>
              <h2
                style={{
                  background:
                    "linear-gradient(to bottom, #cf3801 0%,#da4713 100%)",
                }}
              >
                <i class="fa-solid fa-bell fa-xl me-3"></i>
                Material Specifics
              </h2>
              <span
                className="paint-project-span"
                style={{
                  background:
                    "url(https://brightaluminiumworks.com/mod/twitter_bootstrap/vendors/bootstrap/img/alerts_dnarrow.png) no-repeat",
                }}
              ></span>
            </div>
            <div className=" mt-2 view-materialType">
              <h6>
                <b>Material Type : {item.materialType}</b>
              </h6>
              <h6>Perimeter : {item.perimeter}</h6>
              <h6>Price per sq ft : {item.materialPrice}</h6>
              <h6>{item.description}</h6>
            </div>
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "space-evenly" }}
          className="mt-5"
        >
          <div className="paint-project-dashboard">
            <h2
              style={{
                background:
                  "linear-gradient(to bottom, #46663e 0%,#597d4f 100%)",
              }}
            >
              <i class="fa-solid fa-book-open fa-xl me-3"></i>
              Daily Log
              <button className="paint-project-edit" onClick={handleAdd}>
                Add
              </button>
            </h2>
            <span
              className="paint-project-span"
              style={{
                background:
                  "url(https://brightaluminiumworks.com/mod/twitter_bootstrap/vendors/bootstrap/img/dsh_dnarrow.png) no-repeat",
              }}
            ></span>
            {data.dailyLog?.map((item) => (
              <ul
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  listStyleType: "none",
                }}
                className="ps-3 pe-3"
              >
                <li>
                  <b>{item.createdAt.split("T")[0]}</b>
                </li>
                <li>{item.paintDetails?.inventory.paintName}</li>
                <li>{item.noPieces}Nos</li>
                <li>{item.employeeName}</li>
                <li>{item.shift}</li>
              </ul>
            ))}
          </div>

          <div className="paint-project-dashboard">
            <div>
              <h2
                style={{
                  background:
                    "linear-gradient(to bottom, #c26518 0%,#d57930 100%)",
                }}
              >
                <i class="fa-solid fa-sack-dollar fa-xl me-3"></i>
                Cost
              </h2>
              <span
                className="paint-project-span"
                style={{
                  background:
                    "url(https://brightaluminiumworks.com/mod/twitter_bootstrap/vendors/bootstrap/img/sites_dnarrow.png) no-repeat",
                }}
              ></span>
            </div>
            <div className="mt-2 view-materialType">
              <h6>
                Price per Piece:{" "}
                {(
                  item.perimeter *
                  data.pieceLength *
                  item.materialPrice
                ).toFixed(5)}{" "}
              </h6>

              {data.dailyLog?.length === 0 ? (
                <h6>
                  Total Cost:
                  {(
                    item.perimeter *
                    data.pieceLength *
                    item.materialPrice *
                    data.pieces
                  ).toFixed(5)}
                </h6>
              ) : (
                data.dailyLog?.map((i) => (
                  <h6 key={i._id}>
                    Total Cost:
                    {(i.paintDetails?.inventory.price > 200
                      ? (item.perimeter *
                          data.pieceLength *
                          item.materialPrice *
                          data.pieces +
                          (item.perimeter * data.pieces * data.pieceLength)*2)
                      : item.perimeter *
                        data.pieceLength *
                        item.materialPrice *
                        data.pieces
                    ).toFixed(5)}
                  </h6>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Add Daily Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <Form.Label>
                <b>Paint</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select
                style={{ border: "1px solid black" }}
                onClick={handlePaint}
              >
                <option>Select</option>
                {paint.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.paintName}-{item.paintCode}-{item.paintColor}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs={4}>
              <Form.Label>
                <b>No.of Pieces</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                style={{ border: "1px solid black" }}
                onChange={handlePieces}
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs={4}>
              <Form.Label>
                <b>Shift</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select
                style={{ border: "1px solid black" }}
                onChange={handleShift}
              >
                <option disabled selected required>
                  Select
                </option>
                <option value="Morning">Morning</option>
                <option value="Noon">Noon</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs={4}>
              <Form.Label>
                <b>Employee Name</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Select
                style={{ border: "1px solid black" }}
                onChange={handleEmployee}
              >
                <option disabled selected required>
                  Select
                </option>
                {employee.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs={4}>
              <Form.Label>
                <b>Password</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="password"
                style={{ border: "1px solid black" }}
                onChange={handlePassword}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddLog}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewPaintProject;
