import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditEmployee() {

    const navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [designation, setDesignation] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPswd, setConfirmPswd] = useState("");

    const handleName = ({ target }) => setName(target.value);
  const handleAddress = ({ target }) => setAddress(target.value);
  const handleDate = ({ target }) => setDate(target.value);
  const handleDesignation = ({ target }) => setDesignation(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);
  const handleConfirmPswd = ({ target }) => setConfirmPswd(target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        name,
        address,
        date,
        designation,
        password,
        confirmPswd,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}employee/update-employee/${params.id}`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/employee");
      }
    } catch (error) {
      console.log(error);
      alert('Password not Matched')
    }
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}employee/edit-employee/${params.id}`)
    .then((res) => {
        console.log("res", res.data.employee);
        setName(res.data.employee.name)
        setAddress(res.data.employee.address)
        setDate(res.data.employee.date)
        setDesignation(res.data.employee.designation)
    });
  }, [])


  

  return (
    <div>
    <Header />
    <div className="container mt-3">
      <h3>EDIT EMPLOYEE</h3>
      <div
        className="p-5 mt-4 bg-dark"
        style={{ height: "430px", borderRadius: "10px" }}
      >
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md>
              <FloatingLabel label="Name">
                <Form.Control
                  type="text"
                  placeholder="Paint Name"
                  id="name"
                  onChange={handleName}
                  required
                  value={name}
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel label="Address">
                <Form.Control
                  type="text"
                  placeholder="Paint Name"
                  id="address"
                  onChange={handleAddress}
                  required
                  value={address}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md>
              <FloatingLabel label="Joining Date">
                <Form.Control
                  type="date"
                  placeholder="Paint Name"
                  id="date"
                  onChange={handleDate}
                  required
                  value={date}
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel label="Designation">
                <Form.Control
                  type="text"
                  placeholder="Paint Name"
                  id="designation"
                  onChange={handleDesignation}
                  required
                  value={designation}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md>
              <FloatingLabel label="Password">
                <Form.Control
                  type="password"
                  placeholder="Paint Name"
                  id="password"
                  onChange={handlePassword}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel label="Confirm Password">
                <Form.Control
                  type="password"
                  placeholder="Paint Name"
                  id="confirmPswd"
                  onChange={handleConfirmPswd}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <div className="mt-4">
            <Button variant="success" size="lg" type="submit">
              &nbsp;&nbsp;Save&nbsp;&nbsp;
            </Button>
            <Link to={"/employee"}>
              <Button className="ms-4" variant="warning" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div> 
    )
}

export default EditEmployee