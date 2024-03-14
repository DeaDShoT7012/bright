import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProject() {

    const navigate = useNavigate();
    const params = useParams();
    const [projectName,setProjectName] = useState('');
    const [customer,setCustomer] = useState('');
    const [deadline,setDeadline] = useState('');
    const [expQuantity,setExpQuantity] = useState('');
    const [alertDate,setAlertDate] = useState('');
  
  
    const handleProjectName=({target})=>setProjectName(target.value);
    const handleCustomer=({target})=>setCustomer(target.value);
    const handleDeadline=({target})=>setDeadline(target.value);
    const handleExpQuantity=({target})=>setExpQuantity(target.value);
    const handleAlertDate=({target})=>setAlertDate(target.value);

    
  useEffect(() => {
    console.log("hhh ", params.id);
    axios
      .get(`${process.env.REACT_APP_API_URL}project/edit-project/${params.id}`)
      .then((res) => {
        console.log("res", res.data.project);
        setProjectName(res.data.project.projectName);
        setCustomer(res.data.project.customer);
        setDeadline(res.data.project.deadline);
        setExpQuantity(res.data.project.expQuantity);
        setAlertDate(res.data.project.alertDate);
      });
  }, []);


    const handleSubmit=async(e)=>{
        try{
          e.preventDefault();
          const data ={
            projectName,
            customer,
            deadline,
            expQuantity,
            alertDate,
          }
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}project/update-project/${params.id}`,
            data
          )
          console.log('res',response);
          if (response) {
            navigate("/bright-projects");
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
        <h3>ADD BRIGHT PROJECTS</h3>
        <div
          className="p-5 mt-4 bg-dark"
          style={{ height: "430px", borderRadius: "10px" }}
        >
         <form onSubmit={handleSubmit}>
            <Row>
              <Col md>
                <FloatingLabel  label="Project Name">
                  <Form.Control type="text" placeholder="Paint Name" 
                   id="projectName" 
                   value={projectName}
                   onChange={handleProjectName}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel  label="Customer">
                  <Form.Control type="text" placeholder="Paint Name" 
                   id="customer" 
                   value={customer}
                   onChange={handleCustomer}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md>
                <FloatingLabel  label="Dead Line">
                  <Form.Control type="date" placeholder="Paint Name" 
                   id="deadline" 
                   value={deadline}
                   onChange={handleDeadline}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel  label="Expected Quantity Completed by Deadline Alert Date">
                  <Form.Control type="text" placeholder="Paint Name" 
                   id="expQuantity" 
                   value={expQuantity}
                   onChange={handleExpQuantity}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md>
                <FloatingLabel
                  label="Dead  Line Alert Date"
                >
                  <Form.Control type="date" placeholder="Dead  Line Alert Date"
                   id="alertDate" 
                   value={alertDate}
                   onChange={handleAlertDate}
                  />
                </FloatingLabel>
              </Col>
              <Col md></Col>
            </Row>
            <div className="mt-4">
              <Button variant="success" size="lg" type="submit">
                &nbsp;&nbsp;Save&nbsp;&nbsp;
              </Button>
              <Link to={"/bright-projects"}>
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
      )
}

export default EditProject