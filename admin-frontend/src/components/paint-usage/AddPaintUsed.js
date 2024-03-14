import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddPaintUsed() {
  const navigate = useNavigate();
  const [data,setData] = useState([]);
  const [paintName, setPaintName] = useState('');
  const [paintCode, setPaintCode] = useState('');
  const [paintColor, setPaintColor] = useState('');
  const [currentStock, setCurrentStock] = useState('')
  const [paintIntake, setPaintIntake] = useState('')
  const [paintLeftout, setPaintLeftout] = useState('')



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data={
        paintName,
        paintCode,
        paintColor,
        currentStock,
        paintIntake,
        paintLeftout
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}paintusage/add-paintUsage`,
        data
      );
      console.log("res", response);
      if (response) {
        navigate("/paint-usage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaintIntake=(event)=>{
    setPaintIntake(event.target.value)
  }

  const handlePaintLeftout=(event)=>{
    setPaintLeftout(event.target.value)
  }


  const handlePaintSelect = (selectedValue) => {
    const selectedPaintData = data.find(item => selectedValue.includes(item.paintName));  
    if (selectedPaintData) {
      setPaintName(selectedPaintData.paintName);
      setPaintCode(selectedPaintData.paintCode);
      setPaintColor(selectedPaintData.paintColor);
      setCurrentStock(selectedPaintData.initialStock)
    }
  };

  const fetchData = () => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}inventory/get`).then((res) => {
        console.log(res.data.inventory);
        setData(res.data.inventory);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])
  


  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h3>ADD PAINT USED</h3>
        <div
          className="p-5 mt-4 bg-dark"
          style={{ height: "530px", borderRadius: "10px" }}
        >
          <form onSubmit={handleSubmit}>
            <Row>
              <Col xs={6}>
                <Form.Group as={Col}>
                  <Form.Label className="text-light">Select Paint</Form.Label>
                  <Form.Select  onChange={(e) => handlePaintSelect(e.target.value)}>
                <option disabled selected required >
                 Select
                </option>
                {data.map((item)=>(
                  <option key={item._id}>
                    {item.paintName} - {item.paintCode} - {item.paintColor}
                  </option>
                ))}
                </Form.Select>
                </Form.Group>
              </Col>

              <Form.Group as={Col}>
                <Form.Label className="text-light">Paint Intake</Form.Label>
                <Form.Control type="text" required onChange={handlePaintIntake}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label className="text-light">Paint Leftout</Form.Label>
                <Form.Control type="text" required onChange={handlePaintLeftout}/>
              </Form.Group>
            </Row>

            <Row className="mt-4">
            <Form.Group as={Col}>
            <Form.Label className="text-light">Paint Name</Form.Label>
            <Form.Control type="text" value={paintName} onChange={(e) => setPaintName(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="text-light">Paint Code</Form.Label>
            <Form.Control type="text" value={paintCode} onChange={(e) => setPaintCode(e.target.value)} />
          </Form.Group>
            </Row>

            <Row className="mt-4">
              <Form.Group as={Col}>
            <Form.Label className="text-light">Paint Colour</Form.Label>
            <Form.Control type="text" value={paintColor} onChange={(e) => setPaintColor(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="text-light">Current Stock(Kgs)</Form.Label>
            <Form.Control type="text" value={currentStock} onChange={(e) => setCurrentStock(e.target.value)} />
          </Form.Group>
            </Row>
            <div className="mt-4">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/paint-usage"}>
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

export default AddPaintUsed;
