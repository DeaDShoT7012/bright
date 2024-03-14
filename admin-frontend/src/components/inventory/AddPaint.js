import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddPaint() {
  const navigate = useNavigate();
  const [paintName, setPaintName] = useState("");
  const [paintCode, setPaintCode] = useState("");
  const [paintColor, setPaintColor] = useState("");
  const [price, setPrice] = useState("");
  const [initialStock, setInitialStock] = useState("");
  const [alertThreshold, setAlertThreshold] = useState("");

  const handlePaintName = ({ target }) => setPaintName(target.value);
  const handlePaintCode = ({ target }) => setPaintCode(target.value);
  const handlePaintolor = ({ target }) => setPaintColor(target.value);
  const handlePrice = ({ target }) => setPrice(target.value);
  const handleInitialStock = ({ target }) => setInitialStock(target.value);
  const handleAlertThreshold = ({ target }) => setAlertThreshold(target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        paintName,
        paintCode,
        paintColor,
        price,
        initialStock,
        alertThreshold,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}inventory/add`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/paint-inventory");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h3>ADD PAINT</h3>
        <div
          className="p-5 mt-4 bg-dark"
          style={{ height: "430px", borderRadius: "10px" }}
        >
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md>
                <FloatingLabel label="Paint Name">
                  <Form.Control
                    type="text"
                    placeholder="Paint Name"
                    id="paintName"
                    name="paintName"
                    onChange={handlePaintName}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel label="Paint Code">
                  <Form.Control
                    type="text"
                    placeholder="Paint Name"
                    id="paintCode"
                    name="paintCode"
                    onChange={handlePaintCode}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md>
                <FloatingLabel label="Paint Colour">
                  <Form.Control
                    type="text"
                    placeholder="Paint Name"
                    id="paintColor"
                    name="paintColor"
                    onChange={handlePaintolor}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel label="Price per kg">
                  <Form.Control
                    type="text"
                    placeholder="Paint Name"
                    id="price"
                    name="price"
                    onChange={handlePrice}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md>
                <FloatingLabel label="Initial Stock(Kgs)">
                  <Form.Control
                    type="text"
                    placeholder="Paint Name"
                    id="initialStock"
                    name="initialStock"
                    onChange={handleInitialStock}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel label="Alert Threshold(Kgs)">
                  <Form.Control
                    type="text"
                    placeholder="Paint Name"
                    id="alertThreshold"
                    name="alertThreshold"
                    onChange={handleAlertThreshold}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <div className="mt-4">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/paint-inventory"}>
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
  );
}

export default AddPaint;
