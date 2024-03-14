import React from 'react'
import Home from './components/home/Home';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import AddPaint from './components/inventory/AddPaint';
import AddPaintMaterial from './components/inventory/AddPaintMaterial';
import AddMaterialType from './components/inventory/AddMaterialType';
import AddMaterial from './components/inventory/AddMaterial';
import PaintInventory from './components/inventory/PaintInventory';
import MaterialInventory from './components/inventory/MaterialInventory';
import AddBrightProjects from './components/projects/AddBrightProjects';
import BrightProjects from './components/projects/BrightProjects';
import AddPaintProjects from './components/painting-projects/AddPaintProjects';
import PaintProjects from './components/painting-projects/PaintProjects';
import TentativeWork from './components/tentative-works/TentativeWork';
import AddTeantativeWork from './components/tentative-works/AddTeantativeWork';
import MaterialUsage from './components/project-material-usage/MaterialUsage';
import AssignMaterial from './components/project-material-usage/AssignMaterial';
import AssignWork from './components/assign-work/AssignWork';
import AddWork from './components/assign-work/AddWork';
import PaintMaterial from './components/inventory/PaintMaterial';
import EditPaint from './components/inventory/EditPaint';
import MaterialType from './components/inventory/MaterialType';
import EditProject from './components/projects/EditProject';
import EditWork from './components/tentative-works/EditWork';
import AddSubProject from './components/projects/AddSubProject';
import Topology from './components/projects/Topology';
import AddTopology from './components/projects/AddTopology';
import EditTopology from './components/projects/EditTopology';
import EditMaterial from './components/inventory/EditMaterial';
import EditMaterialType from './components/inventory/EditMaterialType';
import EditPaintMaterial from './components/inventory/EditPaintMaterial';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import ViewPaintProject from './components/painting-projects/ViewPaintProject';
import EditPaintProject from './components/painting-projects/EditPaintProject';
import Employee from './components/employees/Employee';
import AddEmployee from './components/employees/AddEmployee';
import EditEmployee from './components/employees/EditEmployee';
import VeiewWork from './components/assign-work/VeiewWork';
import EditMaterialUsage from './components/project-material-usage/EditMaterialUsage';
import PaintUsage from './components/paint-usage/PaintUsage';
import AddPaintUsed from './components/paint-usage/AddPaintUsed';
import WorkSupervision from './components/project-material-usage/WorkSupervision';
import Allocation from './components/allocation/Allocation';
import AddAllocation from './components/allocation/AddAllocation';
import Delivery from './components/delivery-paint/Delivery';
import AddDelivery from './components/delivery-paint/AddDelivery';
import DeliveryBright from './components/delivery-bright/DeliveryBright';
import AddDeliveryBright from './components/delivery-bright/AddDeliveryBright';
import AddWorkSupervision from './components/project-material-usage/AddWorkSupervision';
import ViewMaterialUsage from './components/project-material-usage/ViewMaterialUsage';
import Expense from './components/expense/Expense';
import AddExpense from './components/expense/AddExpense';
import Setting from './components/settings/Setting';
import MaterialAlert from './components/alert/MaterialAlert';





















function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={ <Login/>}/>
        <Route path='signup' element={ <SignUp/>}/>
        <Route path='home' element={ <Home/>}/>
        <Route path='add-paint' element={ <AddPaint/>}/>
        <Route path='edit-paint/:id' element={ <EditPaint/>}/>
        <Route path='add-material-type' element={ <AddMaterialType/>}/>
        <Route path='add-material' element={ <AddMaterial/>}/>
        <Route path='edit-material/:id' element={ <EditMaterial/>}/>
        <Route path='add-paint-material' element={ <AddPaintMaterial/>}/>
        <Route path='paint-material' element={ <PaintMaterial/>}/>
        <Route path='edit-paint-material/:id' element={ <EditPaintMaterial/>}/>
        <Route path='material-type' element={ <MaterialType/>}/>
        <Route path='edit-material-type/:id' element={ <EditMaterialType/>}/>
        <Route path='paint-inventory' element={ <PaintInventory/>}/>
        <Route path='material-inventory' element={ <MaterialInventory/>}/>
        <Route path='add-bright-projects' element={ <AddBrightProjects/>}/>
        <Route path='add-sub-projects/:id' element={ <AddSubProject/>}/>
        <Route path='topology/:id/:name/:sid' element={ <Topology/>}/>
        <Route path='edit-topology/:id/:sid/:name/:tid' element={ <EditTopology/>}/>
        <Route path='add-topology/:id/:name/:sid' element={ <AddTopology/>}/>
        <Route path='edit-bright-projects/:id' element={ <EditProject/>}/>
        <Route path='bright-projects' element={ <BrightProjects/>}/>
        <Route path='add-paint-projects' element={ <AddPaintProjects/>}/>
        <Route path='view-paint-projects/:id/:mid' element={ <ViewPaintProject/>}/>
        <Route path='edit-paint-projects/:id' element={ <EditPaintProject/>}/>
        <Route path='paint-projects' element={ <PaintProjects/>}/>
        <Route path='tentative-works' element={ <TentativeWork/>}/>
        <Route path='add-tentative-works' element={ <AddTeantativeWork/>}/>
        <Route path='edit-works/:id' element={ <EditWork/>}/>
        <Route path='material-usage' element={ <MaterialUsage/>}/>
        <Route path='view-material-usage' element={ <ViewMaterialUsage/>}/>
        <Route path='work-supervision' element={ <WorkSupervision/>}/>
        <Route path='add-work-supervision' element={ <AddWorkSupervision/>}/>
        <Route path='edit-material-usage/:id' element={ <EditMaterialUsage/>}/>
        <Route path='assign-material' element={ <AssignMaterial/>}/>
        <Route path='assign-work' element={ <AssignWork/>}/>
        <Route path='add-assign-work' element={ <AddWork/>}/>
        <Route path='view-assign-work/:id/:name' element={ <VeiewWork/>}/>
        <Route path='employee' element={ <Employee/>}/>
        <Route path='add-employee' element={ <AddEmployee/>}/>
        <Route path='edit-employee/:id' element={ <EditEmployee/>}/>
        <Route path='paint-usage' element={ <PaintUsage/>}/>
        <Route path='add-paint-used' element={ <AddPaintUsed/>}/>
        <Route path='allocation' element={ <Allocation/>}/>
        <Route path='add-allocation' element={ <AddAllocation/>}/>
        <Route path='delivery' element={ <Delivery/>}/>
        <Route path='add-delivery' element={ <AddDelivery/>}/>
        <Route path='delivery-bright' element={ <DeliveryBright/>}/>
        <Route path='add-delivery-bright' element={ <AddDeliveryBright/>}/>
        <Route path='expense' element={ <Expense/>}/>
        <Route path='add-expense' element={ <AddExpense/>}/>
        <Route path='setting' element={ <Setting/>}/>
        <Route path='material-alert' element={ <MaterialAlert/>}/>



      </Routes> 
    </div>
  );
}

export default App;
