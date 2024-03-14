import React, { useEffect, useState } from "react";
import Header from "../Header";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Footer from "../Footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditTopology() {

    const navigate = useNavigate();
    const params = useParams();
    const [topologyName,setTopologyName] = useState('');
    const [specification,setSpecification] = useState('');
    const [cost,setCost] = useState('');
    const [deadline,setDeadline] = useState('');
    const [deadlineAlert,setDeadlineALert] = useState('');
    const [expQty,setExpQty] = useState('');
    const [width,setWidth] = useState('');
    const [height,setHeight] = useState('');
    const [quantity,setQuantity] = useState('');

    const handleTopologyName=({target})=>setTopologyName(target.value);
    const handleSpecification=({target})=>setSpecification(target.value);
    const handleCost=({target})=>setCost(target.value);
    const handleDeadline=({target})=>setDeadline(target.value);
    const handleDeadlineAlert=({target})=>setDeadlineALert(target.value);
    const handleExpQty=({target})=>setExpQty(target.value);
    const handleWidth=({target})=>setWidth(target.value);
    const handleHeight=({target})=>setHeight(target.value);
    const handleQuantity=({target})=>setQuantity(target.value);

    useEffect(() => {
     axios.get(`${process.env.REACT_APP_API_URL}project/edit-topology/${params.id}/${params.sid}/${params.tid}`)
     .then((res)=>{
        console.log("res",res.data.topology);
        setTopologyName(res.data.topology.topologyName)
        setSpecification(res.data.topology.specification)
        setCost(res.data.topology.cost)
        setDeadline(res.data.topology.deadline)
        setDeadlineALert(res.data.topology.deadlineAlert)
        setExpQty(res.data.topology.expQty)
        setWidth(res.data.topology.width)
        setHeight(res.data.topology.height)
        setQuantity(res.data.topology.quantity)
     })
    }, [])
    


    const handleSubmit=async(e)=>{
        try{
          e.preventDefault();
          const data ={
            topologyName,
            specification,
            cost,
            deadline,
            deadlineAlert,
            expQty,
            width,
            height,
            quantity 
          }
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}project/update-topology/${params.id}/${params.sid}/${params.tid}`,
            data
          )
          console.log('res',response);
          if (response) {
            navigate("/topology/"+params.id+"/"+params.name+"/"+params.sid);
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
      <h3>TOPOLOGY EDIT</h3>
      <div
        className="p-5 mt-4 bg-dark"
        style={{ height: "550px", borderRadius: "10px" }}
      >
     <form onSubmit={handleSubmit}>
          <Row>
            <Col md>
            <Form.Group as={Col} >
                  <Form.Label className="text-light">Topology Ref name</Form.Label>
                  <Form.Control type="text"
                  required
                   id="topologyName" 
                   value={topologyName}
                   onChange={handleTopologyName}
                  />
                </Form.Group>
            </Col>
            <Col md>
            <Form.Group as={Col} >
                  <Form.Label className="text-light">Specification</Form.Label>
                  <Form.Control type="text"
                  required
                   id="specification" 
                   value={specification}
                   onChange={handleSpecification}
                  />
                </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md>
            <Form.Group as={Col} >
                  <Form.Label className="text-light">Cost per Topology</Form.Label>
                  <Form.Control type="text"
                  required
                   id="cost" 
                   value={cost}
                   onChange={handleCost}
                  />
                </Form.Group>
            </Col>
            <Col md>
            <Form.Group as={Col} >
                  <Form.Label className="text-light">Deadline</Form.Label>
                  <Form.Control type="date"
                  required
                   id="deadline" 
                   value={deadline}
                   onChange={handleDeadline}
                  />
                </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md>
            <Form.Group as={Col} >
                  <Form.Label className="text-light">Deadline Alert Date</Form.Label>
                  <Form.Control type="date"
                  required
                   id="deadlineAlert" 
                   value={deadlineAlert}
                   onChange={handleDeadlineAlert}
                  />
                </Form.Group>
            </Col>
            <Col md>
            <Form.Group as={Col} >
                  <Form.Label className="text-light">Expected Quantity Completed by Dealline Alert Date</Form.Label>
                  <Form.Control type="text"
                  required
                   id="expQty" 
                   value={expQty}
                   onChange={handleExpQty}
                  />
                </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md>
            <Form.Group as={Col} >
                  <Form.Label className="text-light">Width</Form.Label>
                  <Form.Control type="text"
                  required
                   id="width" 
                   value={width}
                   onChange={handleWidth}
                  />
                </Form.Group>
            </Col>
            <Col md>
            <Form.Group as={Col} >
                  <Form.Label className="text-light">Height</Form.Label>
                  <Form.Control type="text"
                  required
                   id="height" 
                   value={height}
                   onChange={handleHeight}
                  />
                </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
          <Col md>
          <Form.Group as={Col} >
                  <Form.Label className="text-light">Quantity</Form.Label>
                  <Form.Control type="text"
                  required
                   id="quantity" 
                   value={quantity}
                   onChange={handleQuantity}
                  />
                </Form.Group>   
            </Col>
            <Col></Col>
          </Row>
          <div className="mt-4">
            <Button variant="success" size="lg" type="submit" >
              &nbsp;&nbsp;Save&nbsp;&nbsp;
            </Button>
            <Link to={"/topology/"+params.id+"/"+params.name+"/"+params.sid}>
                <Button  className="ms-4" variant="warning" size="lg">
                  Cancel
                </Button>
            </Link>
          </div>
     </form>
      </div>
    </div>
    <Footer />
  </div>  )
}

export default EditTopology