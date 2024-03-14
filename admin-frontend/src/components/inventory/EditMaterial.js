import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditMaterial() {
  const navigate = useNavigate();
  const params = useParams();
  const [materialList, setMaterialList] = useState([]);
  const [materialType, setMaterialType] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [specification, setSpecification] = useState("");
  const [parameter, setParameter] = useState("");

  const handleMaterialName = ({ target }) => setMaterialName(target.value);
  const handleSpecification = ({ target }) => setSpecification(target.value);
  const handleMaterialType = ({ target }) => {
    setMaterialType(target.value);
  };
  const handleParameter = ({ target }) => {
    setParameter(target.value);
  };

  const getMaterialList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}inventory/get-material-type`)
      .then((res) => {
        console.log(res.data.materialType);
        setMaterialList(res.data.materialType);
      });
  };

  useEffect(() => {
    getMaterialList();
  }, []);

  useEffect(() => {
    console.log("hhh ", params.id);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}inventory/edit-material/${params.id}`
      )
      .then((res) => {
        console.log("res", res.data.inventory);
        setMaterialType(res.data.inventory.materialType);
        setMaterialName(res.data.inventory.materialName);
        setSpecification(res.data.inventory.specification);
        setParameter(res.data.inventory.parameter);
      });
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        materialType,
        materialName,
        specification,
        parameter,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}inventory/update-material/${params.id}`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/material-inventory");
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
                  <Form.Label className="text-light">Material Type</Form.Label>
                  <Form.Select
                    id="materialType"
                    onChange={handleMaterialType}
                    value={materialType}
                  >
                    <option disabled selected required>
                      Select
                    </option>
                    {materialList.map((item) => (
                      <option key={item._id} value={item.materialType}>
                        {item.materialType}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Material Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="materialName"
                    name="materialName"
                    value={materialName}
                    onChange={handleMaterialName}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Specification</Form.Label>
                  <Form.Control
                    type="text"
                    id="specification"
                    name="specification"
                    value={specification}
                    onChange={handleSpecification}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Parameter</Form.Label>
                  <Form.Select
                    id="parameter"
                    onChange={handleParameter}
                    value={parameter}
                  >
                    <option disabled selected>
                      Select
                    </option>
                    <option value="Set">Set</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Length">Length</option>
                    <option value="Others">Others</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-5">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/material-inventory"}>
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

export default EditMaterial;
