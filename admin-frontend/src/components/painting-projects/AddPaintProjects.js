import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddPaintProjects() {
  
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [orderFrom, setOrderFrom] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [pieces, setPieces] = useState("");
  const [pieceLength, setPieceLength] = useState("");
  const [pieceSign, setPieceSign] = useState("");

  const handleOrderFrom = ({ target }) => setOrderFrom(target.value);
  const handleMaterialType = ({ target }) => setMaterialType(target.value);
  const handleProjectName = ({ target }) => setProjectName(target.value);
  const handlePieces = ({ target }) => setPieces(target.value);
  const handlePieceLength = ({ target }) => setPieceLength(target.value);
  const handlePieceSign = ({ target }) => setPieceSign(target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        orderFrom,
        materialType,
        projectName,
        pieces,
        pieceLength,
        pieceSign,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}paintproject/add-paint-project`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/paint-projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fecthData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}inventory/get-paint-material`)
      .then((res) => {
        console.log(res.data.paintMaterial);
        setData(res.data.paintMaterial);
      });
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h3>ADD PAINTING PROJECT</h3>
        <div
          className="p-5 mt-4 bg-dark"
          style={{ height: "430px", borderRadius: "10px" }}
        >
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md>
                <Col md>
                  <Form.Select
                    size="lg"
                    id="orderFrom"
                    onChange={handleOrderFrom}
                  >
                    <option disabled selected required>
                      Order From Select
                    </option>
                    <option value="Bright Ernakulam">Bright Ernakulam</option>
                    <option value="Bright Bypass">Bright Bypass</option>
                    <option value="Bright Kayamkulam">Bright Kayamkulam</option>
                    <option value="Eternia">Eternia</option>
                    <option value="Direct">Direct</option>
                  </Form.Select>
                </Col>
              </Col>
              <Col md>
                <Col md>
                  <Form.Select
                    size="lg"
                    id="materialType"
                    onChange={handleMaterialType}
                  >
                    <option disabled selected required>
                      Material Type Select
                    </option>
                    {data.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.materialType}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md>
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Project Name"
                >
                  <Form.Control
                    type="text"
                    placeholder="Paint Name"
                    id="projectName"
                    onChange={handleProjectName}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="No:of Pieces"
                >
                  <Form.Control
                    type="text"
                    placeholder="Paint Name"
                    id="pieces"
                    onChange={handlePieces}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md>
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Length of Piece"
                >
                  <Form.Control
                    type="text"
                    placeholder="Length of Piece"
                    id="pieceLength"
                    onChange={handlePieceLength}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <Form.Select
                  size="lg"
                  id="pieceSign"
                  onChange={handlePieceSign}
                >
                  <option disabled selected required>
                  Select
                </option>
                  <option value="feet">feet</option>
                  <option value="inch">inch</option>
                  <option value="meter">meter</option>
                  <option value="centimeter">centimeter</option>
                  <option value="millimeter">millimeter</option>
                </Form.Select>
              </Col>
            </Row>
            <div className="mt-4">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/paint-projects"}>
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

export default AddPaintProjects;
