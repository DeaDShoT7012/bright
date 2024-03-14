import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditMaterialUsage() {

    const navigate = useNavigate();
    const params = useParams();
    const [qtyUsed,setQtyUsed] = useState('')
    const [pieces,setPieces] = useState('')
    const [stock,setStock] = useState('')
    const [date,setDate] = useState('')
    

    const handleQtyUsed=(event)=>{
        setQtyUsed(event.target.value);
      }
      const handlePiece=(event)=>{
        setPieces(event.target.value);
      }
      const handleStock=(event)=>{
        setStock(event.target.value);
      }
      const handleDate=(event)=>{
        setDate(event.target.value);
      }
 
  
  
    useEffect(() => {
      console.log("hhh ", params.id);
      axios
        .get(`${process.env.REACT_APP_API_URL}projectmaterialusage/edit-material/${params.id}`)
        .then((res) => {
          console.log("res", res.data.material);
          setQtyUsed(res.data.material.qtyUsed);
          setPieces(res.data.material.pieces);
          setStock(res.data.material.stock);
          setDate(res.data.material.date);
        });
    }, []);
  
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const data = {
          qtyUsed,
          pieces,
          stock,
          date,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}projectmaterialusage/update-material/${params.id}`,
          data
        );
        console.log('res',response);
        if (response) {
          navigate("/material-usage");
        }
      } catch(error) {
          console.log(error);
      }
    };

  return (
    <div>
    <Header />
    <div className="container mt-3">
      <h3>EDIT MATERIAL USAGE</h3>
      <div
        className="p-5 mt-4 bg-dark"
        style={{ height: "530px", borderRadius: "10px" }}
      >
        <form onSubmit={handleSubmit}>
          <Row>
          <Form.Group as={Col} >
                <Form.Label className="text-light">
                  Quantity Used
                </Form.Label>
                <Form.Control type="text" value={qtyUsed} onChange={handleQtyUsed} />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label className="text-light">
                  Parameter value
                </Form.Label>
                <Form.Control type="text" value={pieces} onChange={handlePiece}/>
              </Form.Group>
          </Row>
          <Row className="mt-4">
             <Form.Group as={Col} >
                <Form.Label className="text-light">Length in Stock</Form.Label>
                <Form.Control type="text" value={stock} onChange={handleStock}/>
              </Form.Group>
              
              <Form.Group as={Col} >
                <Form.Label className="text-light">Date</Form.Label>
                <Form.Control type="date" value={date} onChange={handleDate}/>
              </Form.Group>
          </Row>
          <div className="mt-4">
            <Button variant="success" size="lg" type="submit">
              &nbsp;&nbsp;Save&nbsp;&nbsp;
            </Button>
           <Link to={"/material-usage"}>
              <Button
                className="ms-4"
                variant="warning"
                size="lg"
              >
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

export default EditMaterialUsage