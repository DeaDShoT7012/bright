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

function AddMaterialType() {

    const navigate = useNavigate();
    const [materialType,setMaterialType] = useState('')

    const handleMaterialType=({target})=>setMaterialType(target.value);

    const handleSubmit=async(e)=>{
        try{
          e.preventDefault();
          const data ={
            materialType
          }
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}inventory/add-material-type`,
            data
          )
          console.log('res',response);
          if (response) {
            navigate("/material-type");
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
          style={{ height: "200px", borderRadius: "10px" }}
        >
          <form onSubmit={handleSubmit}>
              <Row>
                <Col md>
                  <FloatingLabel  label="Material Type">
                    <Form.Control type="text" placeholder="Paint Name"
                    id="materialType" 
                    name="materialType"
                    onChange={handleMaterialType}
                    />
                  </FloatingLabel>
                </Col>
                <Col md>
                </Col>
              </Row>
              <div className="mt-4">
                <Button variant="success" size="lg" type="submit"> 
                  &nbsp;&nbsp;Save&nbsp;&nbsp;
                </Button>
               <Link to={"/material-type"}>
                  <Button  className="ms-4" variant="warning" size="lg">
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

export default AddMaterialType;
