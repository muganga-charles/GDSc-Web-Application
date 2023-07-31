import React, { useEffect } from 'react';

// get voters
import AdminDisplay from './Components/Pages/Admins/Lead/AdminDisplay'
import Datadisplay from './Components/Pages/Admins/Lead/Datadisplay'
//import MarketingLead from './Components/Pages/Admins/EventCordinator/MarketingLead'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './Components/Pages/Entry/Login';
import SignUp from './Components/Pages/Entry/Signup'
import LandingPage from './Components/Pages/Entry/LandingPage';
//import Admins from './Components/Pages/Admins/Admins';
import AnyMember from './Components/Pages/Admins/EventCordinator/AnyMember';
import Profile from './Components/Pages/Members/Profile';
import UpdateMember from './Components/Pages/Members/UpdateMember';
import Welcome from './Components/Pages/Members/Welcome';
import MemberPage from './Components/Pages/Members/MemberPage';
import VarifyLead from './Components/Pages/Admins/VarifyLead';
//import TechinicalLead from './Components/Pages/Admins/EventCordinator/TechnicalLead';
//import OutreachLead from './Components/Pages/Admins/EventCordinator/OutreachLead';
//import DesignLead from './Components/Pages/Admins/EventCordinator/DesignLead';
//import EventCordinator from './Components/Pages/Admins/EventCordinator/EventCordinator';
function App() {
  // useEffect(() => {
  //   const members = async () => {
  //     const response = await axios.get('http://localhost:3301/api/members');
  //     console.log(response.data.data)
  //   }
  //   members();
  //   })
  return (
    <div>
      <Router>
        <Routes>
          
          <Route index path="/" element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} /> 
          <Route path="welcome" element={<Welcome />} />
          <Route path="signup" element={<SignUp />} />
          <Route path='member/profile' element={<Profile />} />
          <Route path='member' element={<MemberPage />} />
          <Route path='profile/update' element={<UpdateMember />} />
          <Route path='varifylead' element={<VarifyLead />} />
          <Route path = 'anyrole' element={<AnyMember />} />
          <Route path = "admindisplay" element={<AdminDisplay/>} />

        </Routes>
      </Router>
    </div>
    // <div>
    //   <Apps/>
    // </div>
  );
}

export default App;
