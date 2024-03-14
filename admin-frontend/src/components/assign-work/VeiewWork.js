import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function VeiewWork() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

    const params = useParams();
  const [data,setData] = useState([])
  const [item,setItem] = useState([])


  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}paintproject/edit-paint-project/${params.id}`)
    .then((res) => {
      console.log("res", res.data.project);
      setData(res.data.project)
    });
  }, [])

  useEffect(()=>{ 
    const fecthData = async()=>{
      try{
       const response = await axios.get(`${process.env.REACT_APP_API_URL}paintproject/get-paint-material/${params.name}`,);
       console.log( response.data.project);
      setItem(response.data.project)
      }
      catch(error){
        console.log(error);
      }
    }
    fecthData()
  },[data]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log(userData);
      setUser(userData)
      if (userData.adminType === 'admin'|| userData.adminType === 'office'|| userData.adminType === 'employee'||userData.adminType === 'assignEmployee') {
        console.log('user loged');
      }
       else {
        navigate('/');
      }
    }
    else{
      navigate('/')
    }
  }, [])

  return (
    <div>
    <Header />  
  <div className="container mt-5">
   <div style={{display:'flex', justifyContent:"space-evenly"}}>

      <div className="paint-project-dashboard">
       <div>
          <h2 style={{background:'linear-gradient(to bottom, #636363 0%,#7d7d7d 100%'}}>
          <i class="fa-solid fa-user fa-xl me-3"></i>
          {data.projectName}
          {user?.adminType==="admin"?<Link to={'/edit-paint-projects/'+data._id}><button className="paint-project-edit">Edit</button></Link>:""}
          </h2>
          <span className="paint-project-span"
          style={{background:"url(https://brightaluminiumworks.com/mod/twitter_bootstrap/vendors/bootstrap/img/dsh_dnarrow.png) no-repeat"}}
          ></span>
       </div>
       <div>
       <h6 className="text-center mt-5">No: of Pieces: {data.pieces}</h6>
        <h6 className="text-center ">No: of Pieces left: {data.pieces}</h6>
        <h6 className="text-center ">Length per piece: {data.pieceLength}</h6>
       </div>
      </div>

      <div  className="paint-project-dashboard">
        <div>
          <h2 style={{background:'linear-gradient(to bottom, #cf3801 0%,#da4713 100%)'}}>
          <i class="fa-solid fa-bell fa-xl me-3"></i>
          Material Specifics
          </h2>
          <span className="paint-project-span"
          style={{background:'url(https://brightaluminiumworks.com/mod/twitter_bootstrap/vendors/bootstrap/img/alerts_dnarrow.png) no-repeat'}}
          >
          </span>
        </div>
        <div className=" mt-2 view-materialType">
        <h6><b>Material Type : {item.materialType}</b></h6>
        <h6>Perimeter : {item.perimeter}</h6>
        <h6>{item.description}</h6>
        </div>
      </div>

   </div>

   <div className="mt-5 ms-4">

      <div  className="paint-project-dashboard">
        <h2 style={{background:'linear-gradient(to bottom, #46663e 0%,#597d4f 100%)'}}>
        <i class="fa-solid fa-book-open fa-xl me-3"></i>
        Daily Log
        <button className="paint-project-edit">Add</button>
        </h2>
        <span className="paint-project-span"
        style={{background:"url(https://brightaluminiumworks.com/mod/twitter_bootstrap/vendors/bootstrap/img/dsh_dnarrow.png) no-repeat"}}
        ></span>
      </div>

   </div>
  </div>
    <Footer />
  </div>  )
}

export default VeiewWork