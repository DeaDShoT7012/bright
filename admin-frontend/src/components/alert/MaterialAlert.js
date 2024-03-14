import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Button, Pagination } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function MaterialAlert() {
  return (
    <div>
        <Header />
      <div className="container mt-2">
        <h3>MATERIAL ALERTS</h3>
        <div className="float-end  me-5">
          <Link to={""}>
            <Button variant="danger" size="sm" className="ms-2">
              Topology Alerts
            </Button>
          </Link>
          <Link to={""}>
            <Button variant="danger" size="sm" className="ms-2">
              Bright Project Alerts
            </Button>
          </Link>
        </div>
        <div
          className="p-4 mt-4 bg-dark"
          style={{ height: "600px", borderRadius: "10px" }}
        >
          <div className="paint-list mt-5">
            <table className="paint-inventory-table">
              <tbody >
                <tr>
                  <th style={{ width: "10%" }}>Date</th>
                  <th style={{ width: "15%" }}>Material Name</th>
                  <th style={{ width: "10%" }}>Material Type</th>
                  <th style={{ width: "5%" }}>Quantity left</th>
                  <th style={{ width: "10%" }}>Responded On</th>
                </tr>
                <tr>
                <td>10-11-2023</td>
                <td>BERGER OXFORD BLUE</td>
                <td>paint</td>
                <td>1</td>
                <td>No</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <Pagination className="mt-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination> */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MaterialAlert