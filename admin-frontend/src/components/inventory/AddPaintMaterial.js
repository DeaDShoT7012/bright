import React, { useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function AddPaintMaterial() {
    const navigate = useNavigate();
    const [materialType,setMaterialType] = useState('');
    const [perimeter,setPerimeter] = useState('');
    const [materialPrice,setMaterialPrice] = useState('');
    const [description,setDescription] = useState('');


    const handleMaterialType=({target})=>setMaterialType(target.value);
    const handlePerimeter=({target})=>setPerimeter(target.value);
    const handleMaterialPrice=({target})=>setMaterialPrice(target.value);
    const handleDescription=({target})=>setDescription(target.value);

    const handleSubmit=async(e)=>{
        try{
          e.preventDefault();
          const data ={
            materialType,
            perimeter,
            materialPrice,
            description
          }
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}inventory/add-paint-material`,
            data
          )
          console.log('res',response);
          if (response) {
            navigate("/paint-material");
          }
        }
        catch(error){
          console.log(error);
        }
      }



  return (
    <div>
    <Header />
    <div className="container mt-3">
      <h3>ADD MATERIAL TYPE</h3>
      <div
        className="p-5 mt-4 bg-dark"
        style={{ height: "400px", borderRadius: "10px" }}
      >
       <form onSubmit={handleSubmit}>
            <Row>
              <Col md>
                <FloatingLabel  label="Title">
                  <Form.Control type="text" placeholder="Paint Name" 
                   id="materialType" 
                   name="materialType"
                   onChange={handleMaterialType}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel  label="Perimeter">
                  <Form.Control type="text" placeholder="Paint Name"
                  id="perimeter" 
                  name="perimeter"
                  onChange={handlePerimeter}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md>
                <FloatingLabel  label="Price per sq ft.">
                  <Form.Control type="text" placeholder="Paint Name" 
                  id="materialPrice" 
                  name="materialPrice"
                  onChange={handleMaterialPrice}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel  label="Description">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    id="description" 
                   name="description"
                   onChange={handleDescription}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <div className="mt-4">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
             <Link to={"/paint-material"}>
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

export default AddPaintMaterial