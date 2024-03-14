import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditWork() {
  const navigate = useNavigate();
  const params = useParams();
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [paintColor, setPaintColor] = useState("");
  const [description, setDescription] = useState("");

  const handleDate = ({ target }) => setDate(target.value);
  const handleShift = ({ target }) => setShift(target.value);
  const handlePaintColor = ({ target }) => setPaintColor(target.value);
  const handleDescription = ({ target }) => setDescription(target.value);

  useEffect(() => {
    console.log("hhh ", params.id);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}tentativework/edit-work/${params.id}`
      )
      .then((res) => {
        console.log("res", res.data.work);
        setDate(res.data.work.date);
        setShift(res.data.work.shift);
        setPaintColor(res.data.work.paintColor);
        setDescription(res.data.work.description);
      });
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        date,
        shift,
        paintColor,
        description,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}tentativework/update-work/${params.id}`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/tentative-works");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h3>ADD MATERIAL</h3>
        <div
          className="p-5 mt-4 bg-dark"
          style={{ height: "350px", borderRadius: "10px" }}
        >
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Date</Form.Label>
                  <Form.Control
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleDate}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Shift</Form.Label>
                  <Form.Select id="shift" value={shift} onChange={handleShift}>
                    <option disabled selected required>
                      Select
                    </option>
                    <option value="Morning">Morning</option>
                    <option value="Noon">Noon</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Paint Colour</Form.Label>
                  <Form.Control
                    type="text"
                    id="paintColor"
                    value={paintColor}
                    onChange={handlePaintColor}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Col md>
                  <Form.Group as={Col}>
                    <Form.Label className="text-light">Description</Form.Label>
                    <Form.Control
                      type="text"
                      id="description"
                      value={description}
                      onChange={handleDescription}
                    />
                  </Form.Group>
                </Col>
              </Col>
            </Row>
            <div className="mt-5">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/tentative-works"}>
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

export default EditWork;
