import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);



  const logout=()=>{
    localStorage.clear();
    navigate('/')
  }

  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     const userData = JSON.parse(user);
  //     console.log(userData);
  //     let config =userData?.token
  //     ?{headers: { Authorization: `Token ${userData.token}` }}:{};
  //     axios
  //       .get(`${process.env.REACT_APP_API_URL}user/`,config)
  //       .then((res)=>{
  //         console.log('res',res.data);
  //       })
  //       .catch((err) => {
  //         console.log('Error:', err);
  //         if (err.status === 401) {
  //           logout();
  //           navigate("/");
  //         }
  //       });
  //   }
  // }, [])

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log(userData);
      setUser(userData)
    }
  }, [])
  
  

  return (
    <Navbar expand="lg" bg='dark' data-bs-theme="dark" className="bg-body-tertiary">
    <Container fluid>
      <Link to={'/home'}><Navbar.Brand className='ms-5'>Bright Aluminum</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        > 
        </Nav>
        <Form className="d-flex me-5">
          {/* <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          /> */}
           <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link><Link to={'/home'}><i className="fa-solid fa-circle-info me-1"></i>Account</Link></Nav.Link>
          <Nav.Link><Link to={'/material-alert'}><i class="fa-solid fa-bell"></i><span class="badge bg-light text-dark ms-1 rounded-pill me-1">0</span>Alerts</Link></Nav.Link>
          {user?.adminType==="admin"?<Nav.Link><Link to={'/setting'}><i className="fa-solid fa-gear me-1"></i>Settings</Link></Nav.Link>:""}
          <Nav.Link><span onClick={logout}><i className="fa-solid fa-right-from-bracket me-1"></i>Logout</span></Nav.Link>
        </Nav>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>  
  )
}

export default Header