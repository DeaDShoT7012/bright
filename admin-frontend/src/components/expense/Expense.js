import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import { Link } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import { Button } from 'react-bootstrap'

function Expense() {  
  return (
    <div>
    <Header />
    <div className="container mt-3">
      <h3>EXPENSE LIST</h3>
      <div className="float-end  me-5">
        <Link to={"/add-expense"}>
          <Button variant="danger" size="sm" className="ms-2">
            Add Expense
          </Button>
        </Link>
      </div>
      <div
        className="p-5 mt-4 bg-dark"
        style={{ height: "350px", borderRadius: "10px" }}
      >
         <div className="float-end d-flex mb-4">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button variant="success" size="md" className="ms-2">
              &nbsp;&nbsp;Search&nbsp;&nbsp;
            </Button>
          </div>

        <div className="paint-list mt-5">
          <table className="paint-inventory-table">
            <tbody >
              <tr>
                <th style={{ width: "10%" }}>Project</th>
                <th style={{ width: "10%" }}>Date</th>
                <th style={{ width: "10%" }}>Amount</th>
                <th style={{ width: "10%" }}>Purpose</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />        
    </div>
  )
}

export default Expense