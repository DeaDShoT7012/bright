import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [project,setProject] = useState([])
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  const getProjects=()=>{
    axios
    .get(`${process.env.REACT_APP_API_URL}project/get-project`)
    .then((res) => {
      console.log(res.data.project);
      setProject(res.data.project)
    })
  }

  const fetchData = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}paintproject/get-paint-project`)
        .then((res) => {
          console.log(res.data.project);
          setData(res.data.project);
        });
    } catch (error) { 
      console.log(error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log(userData);
      setUser(userData)
      if (userData.adminType === 'admin'|| userData.adminType === 'office'|| userData.adminType === 'employee'||userData.adminType === 'assignEmployee') {
        navigate('/home');
      }
       else {
        navigate('/');
      }
    }
    else{
      navigate('/')
      // alert('Please Login')
    }
  }, [])

  

  useEffect(() => {
    getProjects()
    fetchData()
  }, [])
  

  return (
   <div>
      
      {user?.adminType==='admin'?
      (
        <div>
        <Header />
        <div
          className="container mt-5"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div className="home-box">
            <div className="d-flex">
              <h6 className="mt-3 ms-3">INVENTORY</h6>
              <Link to={"/add-paint"} className="circle mt-3 ms-3">
                +
              </Link>
            </div>
            <span className="d-flex mt-3 ms-3">
              <h5>
                <Link to={'/paint-inventory'}>Paints</Link>
              </h5>
              <h5 className="ms-4">
                <Link to={'/material-inventory'}>Project Materials</Link>
              </h5>
            </span>
          </div>
          <div className="home-box">
            <div className="d-flex">
              <h6 className="mt-3 ms-3">PROJECTS</h6>
              <Link to={"/add-bright-projects"} className="circle mt-3 ms-3">
                +
              </Link>
            </div>
            <span className="d-flex mt-3 ms-3">
              <Link to={'/bright-projects'}>
              <h3>{project.length}</h3>
              </Link>
              <div className="adm_statbar colum_right"></div>
            </span>
          </div>
          <div className="home-box">
            <div className="d-flex">
              <h6 className="mt-3 ms-3">PAINTING PROJECTS</h6>
              <Link to={"/add-paint-projects"} className="circle mt-3 ms-3">
                +
              </Link>
            </div>
            <span className="d-flex mt-3 ms-3">
               <Link to={'/paint-projects'}>
              <h3>{data.length}</h3>
              </Link>
              <div className="adm_statbar colum_right"></div>
            </span>
          </div>
        </div>
  
        <div className="container mt-5">
          <h4 className="ms-4">Manage your Accounts</h4>
  
          <div className="home-items mt-4 ms-3">
            <ul className="home-icons">
              <li>
                <Link to={"/tentative-works"}>
                  <span className="ic_settings circle"></span>
                  Tentative Work
                </Link>
              </li>
              <li>
                <Link to={"/material-usage"}>
                  <span className="ic_induction circle"></span>
                  Project Material Usage
                </Link>
              </li>
              <li>
                <Link to={''}>
                  <span className="ic_evemanager circle"></span>
                  Calculations
                </Link>
              </li>
              <li>
                <Link to={"/assign-work"}>
                  <span className="ic_mgmaccount circle "></span>
                  Assign Work
                </Link>
              </li>
              <li>
                <Link to={'/paint-usage'}>
                  <span className="ic_reports circle"></span>
                  Paint Usage
                </Link>
              </li>
              <li>
                <Link to={'/employee'}>
                  <span className="ic_useraccount circle"></span>
                  Employees
                </Link>
              </li>
              <li>
                <Link to={'/expense'}>
                  <span className="ic_reports circle mt-4"></span>
                  Expenses
                </Link>
              </li>
              <li>
                <Link>
                  <span className="ic_reports circle mt-4"></span>
                  Summary
                </Link>
              </li>
              <li>
                <Link to={'/allocation'}>
                  <span className="ic_mgmaccount circle mt-4"></span>
                  Allocation
                </Link>
              </li>
              <li>
                <Link to={'/delivery'}>
                  <span className="ic_mgmaccount circle mt-4"></span>
                  Delivery-Paint
                </Link>
              </li>
              <li>
                <Link to={'/delivery-bright'}>
                  <span className="ic_mgmaccount circle mt-4"></span>
                  Delivery-Bright
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </div> 
      ): user?.adminType === 'employee' ? (
        <div>
          <Header />
          <div className="container mt-3">
            <h2 className="mb-5">Employee</h2>
            <div className="home-box">
            <div className="d-flex">
              <h6 className="mt-3 ms-3">PAINTING PROJECTS</h6>
              <Link to={"/add-paint-projects"} className="circle mt-3 ms-3">
                +
              </Link>
            </div>
            <span className="d-flex mt-3 ms-3">
               <Link to={'/paint-projects'}>
              <h3>{data.length}</h3>
              </Link>
              <div className="adm_statbar colum_right"></div>
            </span>
          </div>
          </div>
          <Footer />
        </div>
      ): user?.adminType === 'assignEmployee' ? (
        <div>
          <Header />
          <div className="container mt-3">
            <h2 className="mb-5">Assign Employee</h2>
            <div className="home-box">
            <div className="d-flex">
              <h6 className="mt-3 ms-3">PROJECTS</h6>
              <Link to={"/add-bright-projects"} className="circle mt-3 ms-3">
                +
              </Link>
            </div>
            <span className="d-flex mt-3 ms-3">
              <Link to={'/bright-projects'}>
              <h3>{project.length}</h3>
              </Link>
              <div className="adm_statbar colum_right"></div>
            </span>
          </div>
          </div>
          <Footer />
        </div>
      ): user?.adminType === 'office'? (
      <div>
      <Header />
      <div className="container mt-5">
        <h4 className="ms-4">Office</h4>
        <div className="home-items mt-4 ms-3" style={{height:"200px"}}>
          <ul className="home-icons">
            <li>
              <Link to={"/bright-projects"}>
                <span className="ic_induction circle"></span>
                Bright Projects
              </Link>
            </li>
            <li>
              <Link to={"/paint-projects"}>
                <span className="ic_induction circle"></span>
                Painting Projects
              </Link>
            </li>
            <li>
              <Link to={'/assign-work'}>
                <span className="ic_evemanager circle"></span>
                Assign Work
              </Link>
            </li>
            <li>
              <Link to={'/paint-usage'}>
                <span className="ic_reports circle"></span>
                Paint Usage
              </Link>
            </li>
            <li>
              <Link to={"/tentative-works"}>
                <span className="ic_settings circle"></span>
                Tentative Work
              </Link>
            </li>
            <li>
              <Link to={'/employee'}>
                <span className="ic_useraccount circle"></span>
                Employees
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-5">
        <h4 className="ms-4">Inventory</h4>
        <div className="home-items mt-4 ms-3" style={{height:"200px"}}>
          <ul className="home-icons">
            <li>
              <Link to={"/add-expense"}>
                <span className="ic_evemanager circle"></span>
                Add Entries
              </Link>
            </li>
            <li>
              <Link to={""}>
                <span className="ic_assessment circle"></span>
                Stocks
              </Link>
            </li>
            <li>
              <Link to={''}>
                <span className="ic_courseeditor circle"></span>
                Inventory Alerts
              </Link>
            </li>
            <li>
              <Link to={'/delivery'}>
                <span className="ic_mgmaccount circle "></span>
                Delivery-Paint
              </Link>
            </li>
            <li>
              <Link to={'/delivery-bright'}>
                <span className="ic_mgmaccount circle "></span>
                Delivery-Bright
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
    ):''}
   </div>
  );
}

export default Home;
